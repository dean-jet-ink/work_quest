import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Guild } from "../types/guild";

export const useGuild = (guildId: number) => {
  const [guild, setGuild] = useState<Guild>({} as Guild);
  const history = useHistory();
  const formatedItem = (item: any) => {
    return {
      guildId: item.guild_id,
      guildName: item.guild_name,
      guildPicture: item.guild_picture,
      comment: item.comment,
      adminId: item.admin_id,
    };
  };

  useEffect(() => {
    axios.get(`http://localhost:4000/fetch/guild/${guildId}`).then((res) => {
      const guildData = formatedItem(res.data[0]);
      setGuild(guildData);
    });
  }, [guildId]);

  const onClickExit = useCallback(
    (userId: number) => {
      axios
        .delete("http://localhost:4000/delete/guild/member", {
          data: { userId, guildId },
        })
        .then(() => {
          history.push("/top/guild");
        })
        .catch((err) => {
          if (err) throw err;
        });
    },
    [guildId]
  );

  const onClickDelete = useCallback(() => {
    axios
      .delete("http://localhost:4000/delete/guild", { data: { guildId } })
      .then(() => {
        history.push("/top/guild");
      })
      .catch((err) => {
        if (err) throw err;
      });
  }, []);

  return { guild, onClickExit, onClickDelete };
};
