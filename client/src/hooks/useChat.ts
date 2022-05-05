import { useCallback, useEffect, useState } from "react";
import moment from "moment";

import { Chat } from "../types/chat";
import { useFormatCamel } from "./useFormatCamel";
import { axios } from "../apis/axios";

type Props = {
  guildId: number;
  userId: number;
};

type ChatInitialValues = {
  guildId: number;
  comment: string;
  time: string;
};

export const useChat = (props: Props) => {
  const { guildId, userId } = props;
  const [chat, setChat] = useState<Chat[]>([]);
  const now = moment();
  const initialValues: ChatInitialValues = {
    guildId,
    comment: "",
    time: now.format("YYYY-MM-DD HH:mm:ss"),
  };
  const { snakeToCamel } = useFormatCamel();

  useEffect(() => {
    axios.get(`/fetch/chat/${guildId}`).then((res) => {
      const chatList = snakeToCamel(res.data, "chat");
      setChat(chatList as Chat[]);
    });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guildId]);

  const onSubmit = useCallback(
    (values: ChatInitialValues) => {
      const { guildId, comment, time } = values;
      axios
        .post(`/post/chat/${guildId}`, {
          userId,
          comment,
          time,
        })
        .then((res) => {
          const chatList = snakeToCamel(res.data, "chat");
          setChat(chatList as Chat[]);
        })
        .catch((err) => {
          if (err) throw err;
        });
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [guildId, userId]
  );

  return { chat, initialValues, onSubmit };
};
