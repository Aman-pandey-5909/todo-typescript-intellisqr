import { Request, Response, NextFunction } from "express";
import Log from "../models/Log";

interface CustomError extends Error {
  status?: number;
}

export const errorHandler = async (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await Log.create({
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  const statusCode = err.status || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};
