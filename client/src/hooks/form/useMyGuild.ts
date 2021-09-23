import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Guild } from "../../types/guild";

export type MyGuildInitialValuesType = {
  guildId: null | number;
};

export type MyGuildOnSubmitProps = {
  values: MyGuildInitialValuesType;
  setSubmitting: (isSubmitting: boolean) => void;
};

export const useMyGuild = (userId: number) => {
  const [myGuild, setMyGuild] = useState<Guild[]>([]);
  const myGuildInitialValues = {
    guildId: null,
  };

  // スネークケースのデータをキャメルケースに変換
  const snakeToCamel = useCallback((list: any[]) => {
    const formatedList: Guild[] = [];
    list.map((item) => {
      const formatedItem = {
        guildId: item.guild_id,
        guildName: item.guild_name,
        guildPicture: item.guild_picture,
        comment: item.comment,
        adminId: item.admin_id,
      };
      formatedList.push(formatedItem);
    });
    return formatedList;
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:4000/fetch/myguild/${userId}`).then((res) => {
      const myGuild = snakeToCamel(res.data);
      setMyGuild(myGuild);
    });
  }, [userId]);

  const myGuildOnSubmit = useCallback(
    (props: MyGuildOnSubmitProps) => {
      const { values, setSubmitting } = props;

      axios
        .post(`http://localhost:4000/post/guild_member/${userId}`, {
          guildId: values.guildId,
        })
        .then((res) => {
          console.log(res.data);
          const myGuild = snakeToCamel(res.data);
          setMyGuild(myGuild);
          setSubmitting(false);
        })
        .catch((err) => {
          if (err) throw err;
        });
    },
    [userId]
  );

  return { myGuild, setMyGuild, myGuildInitialValues, myGuildOnSubmit };
};
