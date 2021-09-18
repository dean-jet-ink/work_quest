import { Request, Response } from "express";
import { db } from "../dbconnect";
import { fetchUser } from "./fetchUser";

export const updateProfile = (req: Request, res: Response) => {
  const setPlaceholder = {
    picture: req.body.picture,
    user_name: req.body.name,
    mail: req.body.mail,
    sex: req.body.sex,
    comment: req.body.comment,
  };
  const wherePlaceholder = {
    user_id: req.params.id,
  };

  db.query(
    "UPDATE users SET ? WHERE ?",
    [setPlaceholder, wherePlaceholder],
    (err) => {
      if (err) throw err;
    }
  );

  fetchUser(req, res);
};
