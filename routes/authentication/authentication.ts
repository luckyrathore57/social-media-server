import express from "express";
import authenticateJwt from "./authMiddleware";
import { prisma } from "../../lib/db/prismaClient";
import jwt from "jsonwebtoken";
import secretKey from "../../secret";
import { z } from "zod";
import {
  loginSchema,
  singupSchema,
} from "../../zod/schema/authenticationSchema";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password }: z.infer<typeof loginSchema> = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
        password: password,
      },
    });
    if (user) {
      const token = jwt.sign({ userId: user.id }, secretKey, {
        expiresIn: "1h",
      });
      res.send({ message: "you are succesfully login", token });
      return;
    } else {
      res.send({ message: "user not found" });
    }
  } catch (e) {
    console.log(e);
  }
});
router.post("/signup", async (req, res) => {
  const {
    username,
    password,
    email,
    collegeName,
  }: z.infer<typeof singupSchema> = req.body;
  try {
    const userCheck = await prisma.user.findUnique({
      where: {
        username: username,
        password: password,
      },
    });
    if (userCheck) {
      res.send({ message: "user already exist" });
      return;
    } else {
      const college = await prisma.college.findUnique({
        where: { collegeName: collegeName },
      });
      if (college) {
        const collegeId = college.id;
        const user = await prisma.user.create({
          data: {
            username: username,
            password: password,
            collegeId: collegeId,
            email: email,
          },
        });

        const token = jwt.sign({ userId: user.id }, secretKey, {
          expiresIn: "1h",
        });
        res.send({ message: "Account created succesfully", token });
      } else {
        res.send({ message: "college name wrong" });
      }
    }
  } catch (e) {
    console.log(e);
  }
});

export default router;
