import { Request, Response } from "express";
import { db } from "../utils/dbconnect";

export const completedWork = (req: Request, res: Response) => {
  const placeholder = [
    { completed: req.body.completed },
    { work_id: req.body.id },
  ];
  db.query("UPDATE works SET ? WHERE ?", placeholder, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};
