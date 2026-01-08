import Prisma from "../config/db.config";
import {Request,Response} from "express"
import jwt from "jsonwebtoken"

interface LoginPayloadType{
    name : string;
    email : string;
    provide : string;
    image ?: string;
    oauth_id : string;
}


class AuthController {
    static async login(request:Request,response:Response){

        try {
            const data : LoginPayloadType = request.body;
            const findUser = await Prisma.user.findUniuq({
                email:data.email
            })
    
            if(!findUser){
                const createUser =  await Prisma.user.create({
                    data:data
                })
                const JwtPayload = {
                    cid:createUser.id,
                    email :createUser.email
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
        } catch (error) {
            response.status(500).json({message:"something went wrong"})
        }
    }



}

export default AuthController