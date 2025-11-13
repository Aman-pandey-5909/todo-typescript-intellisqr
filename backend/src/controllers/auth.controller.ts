import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const userexists = await User.exists({ email });

  if (userexists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password: await bcrypt.hash(password, 10),
  });
  await user.save();

  return res.status(200).json({ message: "User Registered Successfully" });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const userexists = await User.findOne({ email });
  if (!userexists) {
    res.status(400);
    throw new Error("User does not exists");
  }
  const isMatch = await bcrypt.compare(password, userexists.password);
  if (!isMatch) {
    res.status(400);
    throw new Error("Incorrect Password");
  }
  const token = jwt.sign(
    { id: userexists._id },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1d",
    }
  );
  const userData = {
    id: userexists._id,
    name: userexists.name,
    email: userexists.email,
    createdAt: userexists.createdAt,
  };
  res.cookie("userlogin", token, {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    httpOnly: true,
  });
  return res
    .status(200)
    .json({ message: "User Successfully Logged In", userData });
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  res.clearCookie("userlogin");
  return res.status(200).json({ message: "Logout Successful" });
});

export const forgot = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  const resetToken = crypto.randomBytes(32).toString("hex");

  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 mins
  await user.save();

  const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;

  return res.status(200).json({
    success: true,
    message: "Password reset link generated",
    resetUrl,
  });
});

export const reset = asyncHandler(async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;

  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid or expired token" });
  }

  user.password = await bcrypt.hash(newPassword, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();

  return res
    .status(200)
    .json({ success: true, message: "Password updated successfully" });
});

export const validatereset = asyncHandler(
  async (req: Request, res: Response) => {
    const { token } = req.query;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired token" });
    }

    return res.status(200).json({ success: true, message: "Token valid" });
  }
);
