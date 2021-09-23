import { Request, Response } from "express";
import { db } from "../dbconnect";
import { fetchMyGuild } from "./fetchMyGuild";

export const postGuildMember = (req: Request, res: Response) => {
  const placeholder = {
    user_id: req.params.id,
    guild_id: req.body.guildId,
  };

  db.query("INSERT INTO guild_members SET ?", placeholder, (err) => {
    if (err) throw err;
  });

  fetchMyGuild(req, res);
};
