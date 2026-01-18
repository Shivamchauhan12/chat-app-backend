
import { Request, Response } from "express";
import {prisma} from "../config/db.config.js"
interface GroupUserType {
  name: string;
  group_id: string;
}
class ChatGroupsUserController {
    static async index(req : Request, res:Response) {
        try {
            const {group_id} = req.query;

            const groupUsers = await prisma.groupUsers.findMany({
                where:{
                    group_id: group_id as string
                }
            });
            res.json({message : "Group users fetched successfully", groupUsers});
        } catch (error) {
            res.status(500).json({message:"something went wrong"})
        }

    }

    static async store(req:Request, res:Response) {
        try {
            const data : GroupUserType = req.body;      
            const groupUser = await prisma.groupUsers.create({
                data
            });
            res.json({message : "Group user created successfully", groupUser});
        } catch (error) {
            res.status(500).json({message:"something went wrong"})
        }
}
}

export default ChatGroupsUserController;