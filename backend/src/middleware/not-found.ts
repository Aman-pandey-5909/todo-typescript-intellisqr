import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
  status?: number;
}

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error: CustomError = new Error("Not Found");
  error.status = 404;
  next(error);
};
