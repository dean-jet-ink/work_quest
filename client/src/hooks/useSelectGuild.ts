import { useCallback, useState } from "react";
import { Guild } from "../types/guild";

type Props = {
  id: number;
  guildList: Array<Guild>;
};

export const useSelectGuild = () => {
  const [selectedGuild, setSelectedGuild] = useState<Guild>({} as Guild);

  const onSelectGuild = useCallback((props: Props) => {
    const { id, guildList } = props;

    const guild = guildList.find((guild) => guild.guildId === id);
    setSelectedGuild(guild as Guild);
  }, []);

  return { selectedGuild, onSelectGuild };
};
