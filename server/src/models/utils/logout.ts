import { Response } from "express";

export const logout = (res: Response) => {
  res.clearCookie("userId");
  res.clearCookie("auth");
  res.send("Cookie was cleared");
};
