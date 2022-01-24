import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { axios } from "../apis/axios";
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
    axios.get(`/fetch/guild/${guildId}`).then((res) => {
      const guildData = formatedItem(res.data);
      setGuild(guildData);
    });
  }, [guildId]);

  const onClickExit = useCallback(
    (userId: number) => {
      axios
        .delete("/delete/guild/member", {
          data: { userId, guildId },
        })
        .then(() => {
          history.push("/top/guild");
        })
        .catch((err) => {
          if (err) throw err;
        });
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [guildId]
  );

  const onClickDelete = useCallback(() => {
    axios
      .delete("/delete/guild", { data: { guildId } })
      .then(() => {
        history.push("/top/guild");
      })
      .catch((err) => {
        if (err) throw err;
      });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guildId]);

  return { guild, onClickExit, onClickDelete };
};
