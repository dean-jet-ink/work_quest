import { Request, Response } from "express";
import { db } from "../dbconnect";

export const validateDuplicatedMail = (req: Request, res: Response) => {
  db.query(
    "SELECT mail FROM users WHERE mail = ?",
    [req.params.mail],
    (err, results) => {
      if (err) throw err;
      res.json({ duplicate: results[0] });
    }
  );
};
