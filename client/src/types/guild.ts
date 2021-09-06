import { User } from "./user";

export type Guild = {
  id: number;
  guildName: string;
  members: Array<User>;
  guildImage: string;
  comment: string;
  adminId: number;
  level: number;
};
