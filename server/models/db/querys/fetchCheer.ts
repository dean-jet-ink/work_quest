import { Request, Response } from "express";
import { db } from "../dbconnect";

export const fetchCheer = (req: Request, res: Response) => {
  db.query(
    "WITH cheerings as (SELECT * FROM cheerings WHERE user_id = ?) SELECT users.user_id, user_name, mail, picture, sex, comment, total_time, title, white_noise, level FROM cheerings JOIN users ON target_id = users.user_id",
    req.params.id,
    (err, results) => {
      if (err) throw err;
      res.send(results);
    }
  );
};
