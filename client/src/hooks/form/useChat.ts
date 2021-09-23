import { useCallback, useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import { Chat } from "../../types/chat";
import { useFormatCamel } from "../useFormatCamel";

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
    axios.get(`http://localhost:4000/fetch/chat/${guildId}`).then((res) => {
      const chatList = snakeToCamel(res.data, "chat");
      console.log(chatList);
      setChat(chatList as Chat[]);
    });
  }, [guildId]);

  const onSubmit = useCallback(
    (values: ChatInitialValues) => {
      const { guildId, comment, time } = values;
      axios
        .post(`http://localhost:4000/post/chat/${guildId}`, {
          userId,
          comment,
          time,
        })
        .then((res) => {
          const chatList = snakeToCamel(res.data, "chat");
          console.log(chatList);
          setChat(chatList as Chat[]);
        })
        .catch((err) => {
          if (err) throw err;
        });
    },
    [guildId, userId]
  );

  return { chat, initialValues, onSubmit };
};
