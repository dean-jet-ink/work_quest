import { useCallback } from "react";
import { Chat } from "../types/chat";
import { Guild } from "../types/guild";
import { SmallGoal } from "../types/smallGoal";
import { User } from "../types/user";
import { Work } from "../types/work";

export const useFormatCamel = () => {
  // スネークケースのデータをキャメルケースに変換
  const snakeToCamel = useCallback(
    (list: any[], data: "user" | "guild" | "chat" | "work" | "smallGoal") => {
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
      } else if (data === "work") {
        const formatedList: Work[] = [];
        list.map((item) => {
          const formatedItem = {
            id: item.work_id,
            workName: item.work_name,
            completed: item.completed,
            deadline: item.deadline,
            totalTime: item.total_time,
          };
          formatedList.push(formatedItem);
        });
        return formatedList;
      } else if (data === "smallGoal") {
        const formatedList: SmallGoal[] = [];
        list.map((item) => {
          const formatedItem = {
            id: item.small_goal_id,
            smallGoalName: item.small_goal_name,
            completed: item.completed,
            totalTime: item.total_time,
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
