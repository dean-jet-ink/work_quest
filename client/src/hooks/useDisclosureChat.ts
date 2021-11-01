import { useState } from "react";

export const useDisclosureChat = () => {
  const [isOpenChat, setIsOpenChat] = useState(false);

  const onOpenChat = () => {
    setIsOpenChat(true);
  };
  const onCloseChat = () => {
    setIsOpenChat(false);
  };

  return { isOpenChat, onCloseChat, onOpenChat };
};
