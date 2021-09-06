import { Request, Response } from "express";
import { db } from "../dbconnect";

export const updateProfile = (req: Request, res: Response) => {
  const setPlaceholder = {
    picture: req.body.picture,
    user_name: req.body.name,
    mail: req.body.mail,
    comment: req.body.comment,
  };
  const wherePlaceholder = {
    user_id: req.body.userId,
  };

  db.query(
    "UPDATE users SET ? WHERE ?",
    [setPlaceholder, wherePlaceholder],
    (err, results) => {
      if (err) throw err;
      res.send(results);
    }
  );
};
