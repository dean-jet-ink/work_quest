import { Request, Response } from "express";
import { db } from "../utils/dbconnect";

export const fetchMyGuild = (req: Request, res: Response) => {
  const placeHolder = {
    user_id: req.params.id,
  };

  db.query(
    "WITH members AS (SELECT * FROM guild_members WHERE ?) SELECT guilds.guild_id, guild_name, guild_picture, comment, admin_id FROM members JOIN guilds ON members.guild_id = guilds.guild_id",
    placeHolder,
    (err, results) => {
      if (err) throw err;
      res.send(results);
    }
  );
};
