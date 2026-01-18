import {prisma} from "../config/db.config.js"
import {Request,Response} from "express"
import jwt from "jsonwebtoken"

interface LoginPayloadType{
    name : string;
    email : string;
    provider : string;
    image : string;
    oauth_id : string;
}


class AuthController {
    static async login(request:Request,response:Response){
        try {
            const data : LoginPayloadType = request.body;
            let findUser = await prisma.user.findUnique({
                where:{
                email:data.email
                }
            })
            if(!findUser){
                findUser =  await prisma.user.create({
                    data:data,
                });
            }
                const JwtPayload = {
                    id:findUser.id,
                    email :findUser.email
                }
                 const secret = process.env.SECRETKEY;
                if (!secret) {
                    throw new Error("SECRETKEY not defined");
                }
                const token =  jwt.sign(JwtPayload,secret,{expiresIn:"365d"});
                return response.json({
                    message:"Logged in successfully",
                    token:`Bearer ${token}`
                })
            }
         catch (error) {
             console.log(error,"login error")
            response.status(500).json({message:"something went wrong"})
        }
    } 

    static async visitorLog(request:Request,response:Response){
       try {
        console.log("Visitor log endpoint hit");
            const ip =
            (request.headers["x-forwarded-for"] as string)?.split(",")[0] ||
            request.socket.remoteAddress ||
            "unknown";
            console.log("Visitor IP:", ip);

            const userAgent = request.headers["user-agent"] || "unknown";
            console.log("Visitor Info:", { ip, userAgent });
            await prisma.visitor.create({
            data: {
                ipAddress: ip,
                userAgent: userAgent
                },
            });

            response.status(200).json({ success: true });
        } catch (error) {
            console.error("Visitor tracking failed:", error);
            response.status(500).json({ success: false });
        }

    }

}

export default AuthController
