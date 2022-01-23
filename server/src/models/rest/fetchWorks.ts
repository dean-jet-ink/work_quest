import { Request, Response } from "express";
import { db } from "../utils/dbconnect";

export const fetchWorks = (req: Request, res: Response) => {
  const placeHolder = {
    user_id: req.params.id,
  };

  db.query("SELECT * FROM works WHERE ?", placeHolder, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};
