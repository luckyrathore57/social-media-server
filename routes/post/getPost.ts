import { Request,Response } from "express"
import { PostSchema } from "../../zod/schema/postSchema";
import { prisma } from "../../lib/db/prismaClient";
import { z } from "zod";


interface User {
    // Define the properties of the User object here
    // For example:
    userId: string;
}
declare global {
    namespace Express {
      interface Request {
        user?: User; 
      }
    }
}

export const getPost=async (req:Request,res:Response)=>{
    try{
        const userId=req.user?.userId;
        const posts:z.infer<typeof PostSchema>[]=await prisma.post.findMany({
            where:{
                authorId:{
                    not:userId
                }
            },

            orderBy:{
                createdAt:"desc"
            },
            take:20
        })
        res.send({message:"posts reached",posts:posts});
    }
    catch(e){
        res.send({error:e});
    }

}

export const getMorePost=async (req:Request,res:Response)=>{
    try{
        const userId=req.user?.userId;
        const posts:z.infer<typeof PostSchema>[]=await prisma.post.findMany({
            where:{
                authorId:{
                    not:userId
                }
            },
            orderBy:{
                createdAt:"desc"
            },
            skip:20,
            take:20
        })
        res.send({message:"posts reached",posts:posts});
    }
    catch(e){
        res.send({error:e});
    }
}