import { Request, Response } from "express";
import { db } from "../dbconnect";

export const fetchSmallGoals = (req: Request, res: Response) => {
  const placeHolder = {
    work_id: req.params.id,
  };

  db.query(
    "WITH work AS (SELECT * FROM works WHERE ?) SELECT work_name, small_goal_id, small_goal_name, small_goals.completed, small_goals.total_time FROM work LEFT JOIN small_goals ON work.work_id = small_goals.work_id",
    placeHolder,
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
};
