import { useCallback } from "react";
import { Chat } from "../types/chat";
import { Guild } from "../types/guild";
import { User } from "../types/user";

export const useFormatCamel = () => {
  // スネークケースのデータをキャメルケースに変換
  const snakeToCamel = useCallback(
    (list: any[], data: "user" | "guild" | "chat") => {
      if (data === "guild") {
        const formatedList: Guild[] = [];
        list.map((item) => {
          const formatedItem = {
            guildId: item.guild_id,
            guildName: item.guild_name,
            guildPicture: item.guild_picture,
            comment: item.comment,
            adminId: item.admin_id,
          };
          formatedList.push(formatedItem);
        });
        return formatedList;
      } else if (data === "chat") {
        const formatedList: Chat[] = [];
        list.map((item) => {
          const formatedItem = {
            chatId: item.chat_id,
            guildId: item.guild_id,
            userId: item.user_id,
            comment: item.comment,
            time: item.created,
          };
          formatedList.push(formatedItem);
        });
        return formatedList;
      } else if (data === "user") {
        const formatedList: User[] = [];
        list.map((item) => {
          const formatedItem = {
            userId: item.user_id,
            userName: item.user_name,
            mail: item.mail,
            picture: item.picture,
            sex: item.sex,
            comment: item.comment,
            totalTime: item.total_time,
            title: item.title,
            whiteNoise: item.white_noise,
            level: item.level,
          };
          formatedList.push(formatedItem);
        });
        return formatedList;
      }
    },
    []
  );

  return { snakeToCamel };
};
