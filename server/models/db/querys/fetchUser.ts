import { Request, Response } from "express";
import { db } from "../dbconnect";

export const fetchUser = (req: Request, res: Response) => {
  const placeHolder = {
    user_id: req.params.id,
  };

  db.query("SELECT * FROM users WHERE ?", placeHolder, (err, results) => {
    if (err) throw err;
    res.send(results[0]);
  });
};
