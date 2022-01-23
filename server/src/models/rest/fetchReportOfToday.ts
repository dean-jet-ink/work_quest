import { Request, Response } from "express";
import { db } from "../utils/dbconnect";

export const fetchReportOfToday = (req: Request, res: Response) => {
  const placeholder = [req.params.day, req.params.id];

  db.query(
    "SELECT ?? FROM reports WHERE user_id = ?",
    placeholder,
    (err, results) => {
      if (err) throw err;
      res.send(results[0]);
    }
  );
};
