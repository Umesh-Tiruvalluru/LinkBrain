import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const userMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers["authorization"];

  try {
    const response = jwt.verify(header as string, process.env.JWT_SECRET || "");
    req.userId = (response as JwtPayload).id;
    next();
  } catch (e) {
    res.json({ message: e });
  }
};
