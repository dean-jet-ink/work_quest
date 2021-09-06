import { Request, Response } from "express";
import { db } from "../dbconnect";

export const deleteSmallGoal = (req: Request, res: Response) => {
  db.query(
    "DELETE FROM small_goals WHERE small_goal_id = ?",
    req.body.id,
    (err, results) => {
      if (err) throw err;
      res.send(results);
    }
  );
};
