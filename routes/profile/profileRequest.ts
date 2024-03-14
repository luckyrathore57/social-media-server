import express from "express";
import authenticateJwt from "../authentication/authMiddleware";
import { prisma } from "../../lib/db/prismaClient";
import { FriendRequestStatus } from "@prisma/client";
import { profileData } from "./profileData";

const router =express.Router();
router.use(authenticateJwt);

router.get("/data",profileData);
router.put("/update",)



export default router;