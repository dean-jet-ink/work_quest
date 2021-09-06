import { Guild } from "../../types/guild";
import { users } from "./users";
import emblem from "../../image/guild.png";
import study from "../../image/study.jpg";
import anzai from "../../image/anzai.jpg";

export const guilds: Array<Guild> = [
  {
    id: 1,
    guildName: "Don't Stop!",
    members: users,
    guildImage: emblem,
    comment: "一緒に頑張りましょう。",
    adminId: 0,
    level: 23,
  },
  {
    id: 2,
    guildName: "moreStrict",
    members: users,
    guildImage: anzai,
    comment: "やる気のある人のみ歓迎",
    adminId: 0,
    level: 58,
  },
  {
    id: 3,
    guildName: "東大合格",
    members: users,
    guildImage: study,
    comment: "バカとブスこそ東大に行け！",
    adminId: 0,
    level: 78,
  },
];
