import { Request, Response } from "express";
import { db } from "../dbconnect";

export const updateTitle = (req: Request, res: Response) => {
  const placeholder = [{ title: req.body.title }, { user_id: req.params.id }];

  db.query("UPDATE users SET ? WHERE ?", placeholder, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};
