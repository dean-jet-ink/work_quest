import { Request, Response } from "express";
import jwt from "jsonwebtoken";
export const auth = (req: Request, res: Response) => {
  const userId = jwt.verify(req.cookies.userId, "JwtSecret");
  res.send(userId);
};
