import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = asyncHandler(async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const userexists = await User.exists({ email });

    if (userexists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password: await bcrypt.hash(password, 10)
    });
    await user.save();

    res.status(200).json({ message: 'User Registered Successfully' });
});
export const login = asyncHandler(async (req: Request, res: Response) => {
    const {email, password} = req.body
    const userexists = await User.findOne({ email });
    if (!userexists) {
        res.status(400);
        throw new Error('User does not exists');
    }
    const isMatch = await bcrypt.compare(password, userexists.password);
    if (!isMatch) {
        res.status(400);
        throw new Error('Incorrect Password');
    }
    const token = jwt.sign({ id: userexists._id }, process.env.JWT_SECRET as string, {
        expiresIn: '1d'
    })
    const userData = {
        id: userexists._id,
        name: userexists.name,
        email: userexists.email,
        createdAt: userexists.createdAt
    }
    res.cookie('userlogin', token, {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        httpOnly: true
    })
    res.status(200).json({ message: 'User Successfully Logged In', userData });
});
export const logout = asyncHandler(async (req: Request, res: Response) => {
    res.clearCookie('userlogin');
    res.status(200).json({ message: 'Logout Successful' });
});
export const forgot = asyncHandler(async (req: Request, res: Response) => {
    res.status(200).json({ message: 'Forgot' });
});
export const reset = asyncHandler(async (req: Request, res: Response) => {
    res.status(200).json({ message: 'Reset' });
});