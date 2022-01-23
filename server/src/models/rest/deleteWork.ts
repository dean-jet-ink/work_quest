import { Request, Response } from "express";
import { db } from "../utils/dbconnect";

export const deleteWork = (req: Request, res: Response) => {
  db.query(
    "DELETE FROM works WHERE work_id = ?",
    req.body.id,
    (err, results) => {
      if (err) throw err;
      res.send(results);
    }
  );
};
