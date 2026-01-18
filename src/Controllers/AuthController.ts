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
            response.status(500).json({message:"something went wrong"})
        }
    } 

    }



export default AuthController