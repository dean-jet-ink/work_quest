import { Request, Response } from "express";
import { db } from "../dbconnect";

export const postCheer = (req: Request, res: Response) => {
  const placeholder = {
    user_id: req.body.userId,
    target_id: req.body.targetId,
  };

  db.query("INSERT INTO cheerings SET ?", placeholder, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};
