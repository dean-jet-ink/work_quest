import axios from "axios";
import { useEffect, useState } from "react";
import { User } from "../types/user";
import { useFormatCamel } from "./useFormatCamel";

export const useFetchGuildMembers = (guildId: number) => {
  const [guildMembers, setGuildMembers] = useState<User[]>([]);
  const { snakeToCamel } = useFormatCamel();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/fetch/guild/members/${guildId}`)
      .then((res) => {
        const formatedList = snakeToCamel(res.data, "user");
        const users = formatedList as User[];
        setGuildMembers(users);
      });
  }, [guildId]);

  return { guildMembers };
};
