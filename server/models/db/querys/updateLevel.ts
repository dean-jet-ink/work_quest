import { Request, Response } from "express";
import { db } from "../dbconnect";

export const updateLevel = (req: Request, res: Response) => {
  const setPlaceholder = {
    level: req.body.level,
  };
  const wherePlaceholder = {
    user_id: req.params.id,
  };

  db.query(
    "UPDATE users SET ? WHERE ?",
    [setPlaceholder, wherePlaceholder],
    (err, results) => {
      if (err) throw err;
    }
  );

  db.query(
    "SELECT level FROM users WHERE ?",
    wherePlaceholder,
    (err, results) => {
      if (err) throw err;
      res.json(results[0]);
    }
  );
};
