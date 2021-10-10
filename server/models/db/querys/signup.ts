import { Request, Response } from "express";
import { db } from "../dbconnect";
import { setCookie } from "./setCookie";

export const signup = (req: Request, res: Response) => {
  const newUser = {
    user_name: req.body.userName,
    mail: req.body.mail,
    picture: null,
    sex: req.body.sex,
    comment: "",
    total_time: 0,
    level: 1,
    title: 1,
    guild_id: null,
    white_noise: "clock",
  };

  db.query(
    "INSERT INTO users SET ?, password= SHA1(?)",
    [newUser, req.body.pass],
    (err, results) => {
      if (err) throw err;
      db.query(
        "INSERT INTO reports SET user_id = ?, monday = 0, tuesday = 0, wednesday = 0, thursday = 0, friday = 0, saturday = 0, sunday = 0",
        results.insertId,
        (err) => {
          if (err) throw err;
        }
      );
    }
  );

  setCookie(req, res);
};
