import { Request, Response } from "express";
import { db } from "../utils/dbconnect";
import { fetchUser } from "./fetchUser";

export const updateProfile = (req: Request, res: Response) => {
  const placeholder = [
    {
      picture: req.body.picture,
      user_name: req.body.name,
      mail: req.body.mail,
      sex: req.body.sex,
      comment: req.body.comment,
    },
    {
      user_id: req.params.id,
    },
  ];

  db.query("UPDATE users SET ? WHERE ?", placeholder, (err) => {
    if (err) throw err;
  });

  fetchUser(req, res);
};
