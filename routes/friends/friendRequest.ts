import express from "express";
import authenticateJwt from "../authentication/authMiddleware";
import { prisma } from "../../lib/db/prismaClient";
import jwt from "jsonwebtoken";
import secretKey from "../../secret"; import { z } from "zod";
import {
  loginSchema,
  singupSchema,
} from "../../zod/schema/authenticationSchema";
import { FriendRequestStatus } from "@prisma/client";
import { friendRequestCheckerH } from "./friendHelper";

const router = express.Router();

router.use(authenticateJwt);

router.post("/send", async (req: any, res: any) => {
  const senderId: string = req.user.userId;
  const { receiverId }: { receiverId: string } = req.body;
  //   console.log(senderId, receiverId);

  const requestCheck = await friendRequestCheckerH(senderId, receiverId);
  if (requestCheck) {
    res.send(requestCheck);
    return;
  }
  const request = await prisma.friendRequest.create({
    data: {
      senderId: senderId,
      receiverId: receiverId,
    },
  });
  console.log(request);
  res.send({ message: "request sent succesfully" });
});

router.put("/accept", async (req: any, res: any) => {
  try{const receiverId: string = req.user.userId;
  const { senderId, requestId }: { senderId: string; requestId: string } =
    req.body;
  //   console.log(senderId, receiverId);

  const request = await prisma.friendRequest.update({
    where: {
      id: requestId,
      status:FriendRequestStatus.PENDING
    },
    data: {
      status: FriendRequestStatus.ACCEPTED,
    },
  });

  if(!request){
    res.send({message:"no request found"});
    return;
  }

  const sender = await prisma.user.update({
    where: { id: senderId },
    data: {
      friends: {
        connect: {
          id: receiverId
        }
      },
      friendsOf: {
        connect: {
          id: receiverId
        }
      }

    }
  })


  console.log(request);
  res.send({ message: "request accepted succesfully" });}
  catch(e){
    res.send({error:e});
  }
});


router.delete("/ignore", async (req: any, res: any) => {
  try{const receiverId: string = req.user.userId;
  const { senderId, requestId }: { senderId: string; requestId: string } =
    req.body;
  //   console.log(senderId, receiverId);

  const request = await prisma.friendRequest.delete({
    where: {
      id: requestId,
      status:FriendRequestStatus.PENDING
    }
  });

  if(!request){
    res.send({message:"no request found"});
    return;
  }



  console.log(request);
  res.send({ message: "request rejected succesfully" });}
  catch(e){
    res.send({error:e});
  }
});


export default router;
