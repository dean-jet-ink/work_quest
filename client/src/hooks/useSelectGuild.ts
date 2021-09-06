import { useCallback, useState } from "react";
import { Guild } from "../types/guild";

type Props = {
  id: number;
  guildList: Array<Guild>;
  onOpen: () => void;
};

export const useSelectGuild = () => {
  const [selectedGuild, setSelectedGuild] = useState<Guild | undefined>();

  const onSelectGuild = useCallback((props: Props) => {
    const { id, guildList, onOpen } = props;

    const guild = guildList.find((guild) => guild.id === id);
    setSelectedGuild(guild);
    onOpen();
  }, []);

  return { selectedGuild, onSelectGuild };
};
