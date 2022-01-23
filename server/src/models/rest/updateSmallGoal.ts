import { Request, Response } from "express";
import { db } from "../utils/dbconnect";
import { fetchSmallGoals } from "./fetchSmallGoals";

export const updateSmallGoal = (req: Request, res: Response) => {
  const placeholder = [
    {
      small_goal_name: req.body.smallGoalName,
    },
    { small_goal_id: req.body.smallGoalId },
  ];

  db.query("UPDATE small_goals SET ? WHERE ?", placeholder, (err) => {
    if (err) throw err;
  });
  fetchSmallGoals(req, res);
};
