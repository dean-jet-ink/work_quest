import { Request, Response } from "express";
import { db } from "../utils/dbconnect";

export const fetchSmallGoalOnBattle = (req: Request, res: Response) => {
  const placeHolder = {
    small_goal_id: req.params.id,
  };

  db.query(
    "SELECT small_goal_name, total_time FROM small_goals WHERE ?",
    placeHolder,
    (err, results) => {
      if (err) throw err;
      res.json(results[0]);
    }
  );
};
