import { Request, Response } from "express";
import { db } from "../dbconnect";

export const fetchGuildMembers = (req: Request, res: Response) => {
  const placeholder = [
    req.params.id,
    [
      "users.user_id",
      "user_name",
      "mail",
      "picture",
      "sex",
      "comment",
      "total_time",
      "title",
      "white_noise",
      "level",
    ],
  ];

  db.query(
    "WITH members AS (SELECT * FROM guild_members WHERE guild_id = ?) SELECT ?? FROM members JOIN users ON members.user_id = users.user_id",
    placeholder,
    (err, results) => {
      if (err) throw err;
      res.send(results);
    }
  );
};
