import { Request, Response } from "express";
import { db } from "../utils/dbconnect";
import { fetchWorks } from "./fetchWorks";

export const updateWork = (req: Request, res: Response) => {
  const placeholder = [
    {
      work_name: req.body.workName,
      deadline: req.body.deadline,
    },
    { work_id: req.body.workId },
  ];

  db.query("UPDATE works SET ? WHERE ?", placeholder, (err) => {
    if (err) throw err;
  });
  fetchWorks(req, res);
};
