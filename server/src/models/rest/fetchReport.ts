import { Request, Response } from "express";
import { db } from "../utils/dbconnect";

export const fetchReport = (req: Request, res: Response) => {
  db.query(
    "SELECT monday, tuesday, wednesday, thursday, friday, saturday, sunday FROM reports WHERE user_id = ?",
    req.params.id,
    (err, results) => {
      if (err) throw err;
      res.send(results[0]);
    }
  );
};
