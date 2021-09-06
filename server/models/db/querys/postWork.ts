import { Request, Response } from "express";
import { db } from "../dbconnect";
import { fetchWorks } from "./fetchWorks";

export const postWork = (req: Request, res: Response) => {
  const placeholder = {
    user_id: req.params.id,
    work_name: req.body.workName,
    completed: false,
    created: req.body.created,
    deadline: req.body.deadline,
    total_time: 0,
  };
  db.query("INSERT INTO works SET ?", placeholder, (err) => {
    if (err) throw err;
  });

  fetchWorks(req, res);
};
