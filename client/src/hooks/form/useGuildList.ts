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
import { useFormatCamel } from "../useFormatCamel";
import { useShowMessage } from "../useShowMessage";

type Props = {
  userId: number;
  setMyGuild: Dispatch<SetStateAction<Guild[]>>;
};

export type GuildInitialValuesType = {
  guildName: string;
  guildPicture: string | null;
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
  const { snakeToCamel } = useFormatCamel();
  const { showMessage } = useShowMessage();

  useEffect(() => {
    axios.get("/fetch/guildlist").then((res) => {
      const formatedList = snakeToCamel(res.data, "guild");
      const guildList = formatedList as Guild[];
      setGuildList(guildList);
    });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmitGuild = useCallback(
    async (props: GuildOnSubmitProps) => {
      const { values, setSubmitting } = props;
      const { guildName, guildPicture, comment } = values;

      await axios
        .post<any[]>(`/post/guild/${userId}`, {
          guildName,
          guildPicture,
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

      await axios
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

      showMessage({
        description: `ギルド「${guildName}」が追加されました`,
        status: "success",
      });
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [userId]
  );

  const guildValidationSchema = Yup.object({
    guildName: Yup.string().max(20, "20文字以内です").required("入力必須です"),
    comment: Yup.string().max(40, "40文字以内です"),
  });

  return {
    guildList,
    initialValues,
    onSubmitGuild,
    guildValidationSchema,
  };
};
