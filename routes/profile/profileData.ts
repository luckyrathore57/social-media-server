import { Request, Response } from "express";
import { prisma } from "../../lib/db/prismaClient";

const profileDatahelper=async (userId:string)=>{
    
    const data=await prisma.user.findUnique({
        where:{
            id:userId
        },
        include:{
            ownPosts:true,
            collegeName:true,
            clubs:true,
            friends:true,
            hostel:true
        }

    })

    return data;
}



export const profileData=async (req:Request,res:Response)=>{
    try{
        const userId=req.user?.userId;
    let data;
    if(userId){
        data=await profileDatahelper(userId);
        res.send({message:"data reached successfully",data:data})
    }
        res.send({message:"something went wrong"})
    }
    catch(e){
        res.send({error:e})
    }
}