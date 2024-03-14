import { prisma } from "./lib/db/prismaClient";

const addCollege=async (college:string)=>{
    const colleget=await prisma.college.create({
        data:{
            collegeName:college
        }
    })
}

addCollege("IIT Delhi");
addCollege("NSUT Delhi");
addCollege("IIT Bombay");