import { Request, Response } from "express";
import { db } from "../dbconnect";

export const updateTitle = (req: Request, res: Response) => {
  const setPlaceholder = {
    title: req.body.title,
  };
  const wherePlaceholder = {
    user_id: req.params.id,
  };

  db.query(
    "UPDATE users SET ? WHERE ?",
    [setPlaceholder, wherePlaceholder],
    (err, results) => {
      if (err) throw err;
      res.send(results);
    }
  );
};
