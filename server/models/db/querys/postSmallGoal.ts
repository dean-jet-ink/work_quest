import { Request, Response } from "express";
import { db } from "../dbconnect";
import { fetchSmallGoals } from "./fetchSmallGoals";

export const postSmallGoal = (req: Request, res: Response) => {
  const placeholder = {
    work_id: req.params.id,
    small_goal_name: req.body.smallGoalName,
    completed: false,
    created: req.body.created,
    total_time: 0,
  };
  db.query("INSERT INTO small_goals SET ?", placeholder, (err) => {
    if (err) throw err;
  });

  fetchSmallGoals(req, res);
};
