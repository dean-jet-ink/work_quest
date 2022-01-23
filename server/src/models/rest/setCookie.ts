import { Request, Response } from "express";
import { db } from "../utils/dbconnect";
import jwt from "jsonwebtoken";

export const setCookie = (req: Request, res: Response) => {
  db.query(
    "SELECT user_id FROM users WHERE mail= ? AND password= SHA1(?)",
    [req.body.mail, req.body.pass],
    (err, results) => {
      if (err) throw err;
      if (!results[0]) {
        res.json({ err: "mail or password is not correct" });
      } else {
        // cookieにuser_idを設定したjwtをセット
        const token = jwt.sign({ userId: results[0].user_id }, "JwtSecret");
        res.cookie("userId", token, { httpOnly: true });
        res.cookie("auth", true);
        res.json({ userId: results[0].user_id });
      }
    }
  );
};
