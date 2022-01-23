import { Request, Response } from "express";
import { db } from "../utils/dbconnect";
import { fetchSmallGoalOnBattle } from "./fetchSmallGoalOnBattle";

export const updateTotalTime = (req: Request, res: Response) => {
  const setPlaceholder = req.body.addTime;

  const wherePlaceholder = [
    {
      small_goal_id: req.params.id,
    },
    { work_id: req.body.workId },

    { user_id: req.body.userId },
  ];
  db.query(
    "UPDATE small_goals SET total_time = total_time + ? WHERE ?",
    [setPlaceholder, wherePlaceholder[0]],
    (err, results) => {
      if (err) throw err;
    }
  );
  db.query(
    "UPDATE works SET total_time = total_time + ? WHERE ?",
    [setPlaceholder, wherePlaceholder[1]],
    (err, results) => {
      if (err) throw err;
    }
  );
  db.query(
    "UPDATE users SET total_time = total_time + ? WHERE ?",
    [setPlaceholder, wherePlaceholder[2]],
    (err, results) => {
      if (err) throw err;
    }
  );
  res.end();
};
