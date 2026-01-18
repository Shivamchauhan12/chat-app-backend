import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken';


const AuthMiddleware = async (req:Request,res:Response,next:NextFunction)=>{

    const token= req.headers.authorization;
    if(token === null || token === undefined )
    {
        return res.status(401).json({status:401,message:"token not found"})
    }

    const actualToken  = token?.split(" ")[1]
    const secret = process.env.SECRETKEY;
    if (!secret) {
        throw new Error("SECRETKEY not defined");
    }
     jwt.verify(actualToken, secret ,(err,user)=>{
        if(err)
            return res.status(401).json({status:401,message:"invalid token or expired"})

        req.user=user as AuthUser
        next()
    });   
}

export default AuthMiddleware