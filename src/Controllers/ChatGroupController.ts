import { Request,Response } from "express";
import Prisma from "../config/db.config";

class ChatGroupController {
    static async store (req:Request,res:Response){

        try {
            const data = req.body;
            const user = req.user;
    
            await Prisma.ChatGroup.create({
                data:{
                    user_id:user?.id,
                    passcode : data.passcode,
                    title:data.title
                }
            })
    
            res.status(201).json({message:"group has been created"})
        } catch (error) {
            res.status(500).json({message:"something went wrong"})
        }
    }
    static async update (req:Request,res:Response){

        try {
            const data = req.body;
            const {id} = req.params;
    
            await Prisma.ChatGroup.update({
                data:{
                    passcode : data.passcode,
                    title:data.title
                },
                where:{
                    id:id
                }
            })
    
            res.status(201).json({message:"group has been updated"})
        } catch (error) {
            res.status(500).json({message:"something went wrong"})
        }
    }
    static async delete (req:Request,res:Response){

        try {
            const {id} = req.params;
    
           const groups = await Prisma.ChatGroup.delete({
                where:{
                    id:id
                }
            })
    
           return res.json({message:"group has been deleted",data:groups})
        } catch (error) {
            res.status(500).json({message:"something went wrong"})
        }
    }
}
export default ChatGroupController