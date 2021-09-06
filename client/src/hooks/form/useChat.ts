import { useCallback, useState } from "react";
import { User } from "../../types/user";

type InitialValuesType = {
  user: User;
  text: string;
  time: Date;
};

export const useChat = (user: User) => {
  const [chatContents, setChatContents] = useState<Array<InitialValuesType>>(
    []
  );
  const initialValues: InitialValuesType = {
    user,
    text: "",
    time: new Date(),
  };

  const onSubmit = useCallback(
    (values: InitialValuesType) => {
      const newChat = [...chatContents, values];
      setChatContents(newChat);
    },
    [chatContents]
  );

  return { chatContents, initialValues, onSubmit };
};
