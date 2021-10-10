import { Request, Response } from "express";
import { db } from "../dbconnect";
import { fetchCheer } from "./fetchCheer";

export const deleteCheer = (req: Request, res: Response) => {
  const placeholder = [
    { user_id: req.body.userId },
    { target_id: req.body.targetId },
  ];

  db.query(
    `DELETE FROM cheerings WHERE ? AND ?`,
    placeholder,
    (err, results) => {
      if (err) throw err;
      res.send(results);
    }
  );
};
