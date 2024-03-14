import { prisma } from "../lib/db/prismaClient"

const userFetch=async (username:string)=>{
    const data=await prisma.user.findUnique({
        where:{
            username:username
        }
    })
    return data||null
}


const postFetch=async (postId:string)=>{
    const data=await prisma.post.findUnique({
        where:{
            id:postId
        }
    })
    return data||null
}


const collegeFetch=async (collegeName:string)=>{
    const data=await prisma.college.findUnique({
        where:{
            collegeName:collegeName
        }
    })
    return data||null
}


const collegeProfileFetch=async (collegeName:string)=>{
    const data=await prisma.college.findUnique({
        where:{
            collegeName:collegeName
        },
        include:{
            clubs:true,
            hostel:true
        }
    })
    return data||null
}

const hostelFetch=async (hostelName:string,collegeId:string)=>{
    const data=await prisma.hostel.findFirst({
        where:{
            hostelName:hostelName,
            collegeId:collegeId
        }
    })
    return data||null
}

const clubsFetch=async (clubName:string,collegeId:string)=>{
    const data=await prisma.club.findFirst({
        where:{
            clubName:clubName,
            collegeId:collegeId
        }
    })
    return data||null
}

export {userFetch,postFetch,collegeFetch,hostelFetch,clubsFetch,collegeProfileFetch}