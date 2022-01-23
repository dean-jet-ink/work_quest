import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Guild } from "../../types/guild";
import { useFormatCamel } from "../useFormatCamel";

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
  const { snakeToCamel } = useFormatCamel();

  useEffect(() => {
    axios.get(`http://localhost:4000/fetch/myguild/${userId}`).then((res) => {
      const formatedList = snakeToCamel(res.data, "guild");
      const myGuild = formatedList as Guild[];
      setMyGuild(myGuild);
    });
    //eslint-disable-next-line react-hooks/exhaustive-deps
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
          const formatedList = snakeToCamel(res.data, "guild");
          const myGuild = formatedList as Guild[];
          setMyGuild(myGuild);
          setSubmitting(false);
        })
        .catch((err) => {
          if (err) throw err;
        });
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [userId]
  );

  return { myGuild, setMyGuild, myGuildInitialValues, myGuildOnSubmit };
};
