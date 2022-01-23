import { Request, Response } from "express";
import { db } from "../utils/dbconnect";

export const updateLevel = (req: Request, res: Response) => {
  const placeholder = [
    {
      level: req.body.level,
    },
    {
      user_id: req.params.id,
    },
  ];

  db.query("UPDATE users SET ? WHERE ?", placeholder, (err, results) => {
    if (err) throw err;
  });

  db.query(
    "SELECT level FROM users WHERE ?",
    placeholder[1],
    (err, results) => {
      if (err) throw err;
      res.json(results[0]);
    }
  );
};
