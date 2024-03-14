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
import { uploadPost } from "./uploadPost";
import { getMorePost, getPost } from "./getPost";


const router=express.Router();
router.use(authenticateJwt);


router.post("/upload",uploadPost);
router.get("/post",getPost);
router.get("/morepost",getMorePost);


export default router;




