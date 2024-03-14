import { PublishedStatus} from "@prisma/client";
import { prisma } from "../../lib/db/prismaClient";
import { z } from "zod";
import { PostSchema } from "../../zod/schema/postSchema";
import { Request,Response } from "express";

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

export const uploadPost=async (req:Request,res:Response)=>{
    try{
        const authorId=req.user?.userId;
        const {title,description,images,published}:z.infer<typeof PostSchema>=req.body;
        const post =await prisma.post.create({
            data:{
                title,
                description:description?description:null,
                images:{set:images},
                published:published?published:PublishedStatus.PUBLIC,
                author:{
                    connect:{
                        id:authorId
                    }
                }
            }
        });
        res.send({message:"post uploaded successfully"});
        

    }
    catch(e){
        res.send({error:e})
    }
}