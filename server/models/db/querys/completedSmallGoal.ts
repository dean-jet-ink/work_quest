import { Request, Response } from "express";
import { db } from "../dbconnect";

export const completedSmallGoal = (req: Request, res: Response) => {
  const placeholder = [
    { completed: req.body.completed },
    { small_goal_id: req.body.id },
  ];
  db.query("UPDATE small_goals SET ? WHERE ?", placeholder, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};
