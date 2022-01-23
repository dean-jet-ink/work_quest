import { Request, Response } from "express";
import { db } from "../utils/dbconnect";
import { postGuildMember } from "./postGuildMember";

export const postGuild = (req: Request, res: Response) => {
  const placeholder = {
    guild_name: req.body.guildName,
    guild_picture: req.body.guildPicture,
    comment: req.body.comment,
    admin_id: req.params.id,
  };
  db.query("INSERT INTO guilds SET ?", placeholder, (err, results) => {
    if (err) throw err;

    req.body.guildId = results.insertId;
    postGuildMember(req, res);
  });
  // インサートした後のギルド一覧のfetchは別で行う
};
