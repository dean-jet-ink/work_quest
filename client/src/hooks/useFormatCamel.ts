import { useCallback } from "react";
import { Chat } from "../types/chat";
import { Guild } from "../types/guild";

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
            commnet: item.comment,
            time: item.created,
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
