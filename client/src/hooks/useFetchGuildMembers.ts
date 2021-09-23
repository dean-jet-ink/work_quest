import axios from "axios";
import { useEffect, useState } from "react";
import { User } from "../types/user";

export const useFetchGuildMembers = (guildId: number) => {
  const [guildMembers, setGuildMembers] = useState<User[]>([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/fetch/guild/members/${guildId}`)
      .then((res) => {
        setGuildMembers(res.data);
      });
  }, [guildId]);

  return { guildMembers };
};
