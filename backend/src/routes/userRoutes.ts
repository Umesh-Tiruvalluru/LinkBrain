import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { UserModel } from "../models/db";

const userRouter = express.Router();

const userSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(6, "Password must be at least 8 characters long")
    .refine((val) => /[A-Z]/.test(val)),
});

userRouter.post("/register", async (req, res) => {
  const validation = userSchema.safeParse(req.body);

  if (!validation.success) {
    res.status(400).json({ errors: validation.error.errors });
    return;
  }
  try {
    const { email, password } = validation.data;
    const hashedPassword = await bcrypt.hash(password, 5);

    await UserModel.create({
      email,
      password: hashedPassword,
    });
    res.status(201).json({ message: "user registered" });
  } catch (e) {
    res.status(409).json({ message: e });
  }
});

userRouter.post("/login", async (req, res) => {
  const validation = userSchema.safeParse(req.body);

  if (!validation.success) {
    res.status(400).json({ errors: validation.error.errors });
    return;
  }

  try {
    const email: string = validation.data?.email;
    const password: string = validation.data?.password;

    const existingEmail = await UserModel.findOne({ email });

    if (!existingEmail) {
      res.status(401).json({ message: "Invalid Credentials" });
      return;
    }
    const passwordMatch = await bcrypt.compare(
      password,
      existingEmail?.password!,
    );

    if (!passwordMatch) {
      res.status(401).json({ message: "Invalid Credentials" });
      return;
    }

    const token = jwt.sign(
      { id: existingEmail?._id },
      process.env.JWT_SECRET || "",
    );

    res.status(200).json({ token });
  } catch (e) {
    res.status(411).json({ message: "User already exists" });
  }
});

export default userRouter;
