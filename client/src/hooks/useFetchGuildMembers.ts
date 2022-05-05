import { useEffect, useState } from "react";

import { axios } from "../apis/axios";
import { User } from "../types/user";
import { useFormatCamel } from "./useFormatCamel";

export const useFetchGuildMembers = (guildId: number) => {
  const [guildMembers, setGuildMembers] = useState<User[]>([]);
  const { snakeToCamel } = useFormatCamel();

  useEffect(() => {
    axios.get(`/fetch/guild/members/${guildId}`).then((res) => {
      const formatedList = snakeToCamel(res.data, "user");
      const users = formatedList as User[];
      setGuildMembers(users);
    });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guildId]);

  return { guildMembers };
};
