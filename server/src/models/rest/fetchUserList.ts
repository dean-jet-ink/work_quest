import { Request, Response } from "express";
import { db } from "../utils/dbconnect";

export const fetchUserList = (req: Request, res: Response) => {
  const placeholder = Number(req.params.limit);

  db.query(
    "SELECT * FROM users ORDER BY total_time DESC LIMIT ?",
    placeholder,
    (err, results) => {
      if (err) throw err;
      res.send(results);
    }
  );
};
