import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import * as Yup from "yup";
import { axios } from "../../apis/axios";

import { Guild } from "../../types/guild";
import { useFileStringify } from "../useFileStringify";
import { useFormatCamel } from "../useFormatCamel";

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
  const { snakeToCamel } = useFormatCamel();

  useEffect(() => {
    axios.get("/fetch/guildlist").then((res) => {
      const formatedList = snakeToCamel(res.data, "guild");
      const guildList = formatedList as Guild[];
      setGuildList(guildList);
    });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmitGuild = useCallback(
    (props: GuildOnSubmitProps) => {
      const { values, setSubmitting } = props;
      const { guildName, guildPicture, comment } = values;

      axios
        .post<any[]>(`/post/guild/${userId}`, {
          guildName,
          guildPicture: guildPicture ? fileToString(guildPicture) : null,
          comment,
        })
        .then((res) => {
          const formatedList = snakeToCamel(res.data, "guild");
          const myGuildList = formatedList as Guild[];
          setMyGuild(myGuildList);
        })
        .catch((err) => {
          setSubmitting(false);
          throw err;
        });
      axios
        .get<any[]>("/fetch/guildlist")
        .then((res) => {
          const formatedList = snakeToCamel(res.data, "guild");
          const guildList = formatedList as Guild[];
          setGuildList(guildList);
          setSubmitting(false);
        })
        .catch((err) => {
          setSubmitting(false);
          throw err;
        });
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
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
