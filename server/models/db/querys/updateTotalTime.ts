import { Request, Response } from "express";
import { db } from "../dbconnect";
import { fetchSmallGoalOnBattle } from "./fetchSmallGoalOnBattle";

export const updateTotalTime = (req: Request, res: Response) => {
  const setPlaceholder = req.body.totalTime;

  const smallGoalWherePlaceholder = {
    small_goal_id: req.params.id,
  };
  const workAndUserWherePlaceholder = {
    user_id: req.body.userId,
  };

  db.query(
    "UPDATE small_goals SET total_time = total_time + ? WHERE ?",
    [setPlaceholder, smallGoalWherePlaceholder],
    (err, results) => {
      if (err) throw err;
    }
  );
  db.query(
    "UPDATE works SET total_time = total_time + ? WHERE ?",
    [setPlaceholder, workAndUserWherePlaceholder],
    (err, results) => {
      if (err) throw err;
    }
  );
  db.query(
    "UPDATE users SET total_time = total_time + ? WHERE ?",
    [setPlaceholder, workAndUserWherePlaceholder],
    (err, results) => {
      if (err) throw err;
    }
  );

  fetchSmallGoalOnBattle(req, res);
};
