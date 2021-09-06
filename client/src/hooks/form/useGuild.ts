import { useCallback, useEffect, useState } from "react";
import { guilds } from "../../assets/data/guilds";
import { users } from "../../assets/data/users";
import { Guild } from "../../types/guild";
import { User } from "../../types/user";

export const useGuild = (user: User) => {
  const [guildList, setGuildList] = useState<Array<Guild>>([]);
  const [isOpenGuild, setIsOpenGuild] = useState(false);

  const initialValues: Guild = {
    id: Math.random() * 11,
    guildImage: "",
    guildName: "",
    comment: "",
    members: users,
    adminId: user.user_id,
    level: 1,
  };

  const onSubmitGuild = useCallback(
    (values: Guild) => {
      const newGuilds = [...guildList, values];
      setGuildList(newGuilds);
    },
    [guildList]
  );

  const onOpenGuild = useCallback(() => {
    setIsOpenGuild(true);
  }, []);

  const onCloseGuild = useCallback(() => {
    setIsOpenGuild(false);
  }, []);

  useEffect(() => {
    setGuildList(guilds);
  }, []);

  return {
    guildList,
    initialValues,
    onSubmitGuild,
    onOpenGuild,
    onCloseGuild,
    isOpenGuild,
  };
};
