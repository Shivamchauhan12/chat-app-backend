import { Request,Response } from "express";
import {prisma} from "../config/db.config.js"

class ChatGroupController {
static async index(req: Request, res: Response) {
    try {
      const user = req.user;
      const groups = await prisma.chatGroup.findMany({
        where: {
          user_id: Number(user.id),
        },
        orderBy: {
          created_at: "desc",
        },
      });
      return res.json({ data: groups });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong.please try again!" });
    }
  }
     static async show(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (id) {
        const group = await prisma.chatGroup.findUnique({
          where: {
            id: id,
          },
        });
        return res.json({ data: group });
      }

      return res.status(404).json({ message: "No groups found" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong.please try again!" });
    }
  }
    static async store (req:Request,res:Response){

        try {
            const data = req.body;
            const user = req.user;
            await prisma.chatGroup.create({
                data:{
                    user_id:Number(user?.id),
                    passcode : data.passcode,
                    title:data?.title
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
    
            await prisma.chatGroup.update({
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
    
           const groups = await prisma.chatGroup.delete({
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