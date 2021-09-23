import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import * as Yup from "yup";

import { Guild } from "../../types/guild";
import { useFileStringify } from "../useFileStringify";

type Props = {
  userId: number;
  setMyGuild: Dispatch<SetStateAction<Guild[]>>;
};

export type GuildInitialValuesType = {
  guildName: string;
  guildPicture: File | null;
  comment: string;
};

export type GuildOnSubmitProps = {
  values: GuildInitialValuesType;
  setSubmitting: (isSubmitting: boolean) => void;
};

export const useGuildList = (props: Props) => {
  const { userId, setMyGuild } = props;
  const [guildList, setGuildList] = useState<Array<Guild>>([]);
  const initialValues = {
    guildName: "",
    guildPicture: null,
    comment: "",
  };
  const { fileToString } = useFileStringify();

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
    axios.get("http://localhost:4000/fetch/guildlist").then((res) => {
      const guildList = snakeToCamel(res.data);

      setGuildList(guildList);
    });
  }, []);

  const onSubmitGuild = useCallback(
    (props: GuildOnSubmitProps) => {
      const { values, setSubmitting } = props;
      const { guildName, guildPicture, comment } = values;

      axios
        .post<any[]>(`http://localhost:4000/post/guild/${userId}`, {
          guildName,
          guildPicture: guildPicture ? fileToString(guildPicture) : null,
          comment,
        })
        .then((res) => {
          const myGuildList = snakeToCamel(res.data);
          setMyGuild(myGuildList);

          axios
            .get<any[]>("http://localhost:4000/fetch/guildlist")
            .then((res) => {
              const guildList = snakeToCamel(res.data);

              setGuildList(guildList);
            })
            .catch((err) => {
              if (err) throw err;
              setSubmitting(false);
            });
          setSubmitting(false);
        })
        .catch((err) => {
          if (err) throw err;
          setSubmitting(false);
        });
    },
    [userId]
  );

  const guildValidationSchema = Yup.object({
    guildName: Yup.string().required("入力必須です"),
  });

  return {
    guildList,
    initialValues,
    onSubmitGuild,
    guildValidationSchema,
  };
};
