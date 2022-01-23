import { Request, Response } from "express";
import { db } from "../utils/dbconnect";
import { fetchReport } from "./fetchReport";

export const updateReport = (req: Request, res: Response) => {
  const today = req.params.day;
  const placeholder = [today, today, req.body.time, { user_id: req.params.id }];

  db.query("UPDATE reports SET ?? = ?? + ? WHERE ?", placeholder, (err) => {
    if (err) throw err;
    res.end();
  });
};
