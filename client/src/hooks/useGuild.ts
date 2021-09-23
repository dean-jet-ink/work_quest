import axios from "axios";
import { useEffect, useState } from "react";
import { Guild } from "../types/guild";

export const useGuild = (guildId: number) => {
  const [guild, setGuild] = useState<Guild>({} as Guild);

  useEffect(() => {
    axios.get(`http://localhost:4000/fetch/guild/${guildId}`).then((res) => {
      setGuild(res.data);
    });
  }, [guildId]);

  return {
    guild,
  };
};
