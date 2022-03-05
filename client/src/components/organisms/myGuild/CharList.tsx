import { memo, useEffect, useRef } from "react";
import { Box, useDisclosure } from "@chakra-ui/react";
import CommentIcon from "@material-ui/icons/Comment";

import { Chats } from "./Chats";
import { Chat } from "../../../types/chat";
import { User } from "../../../types/user";
import { useScroll } from "../../../hooks/useScroll";
import { ChatForm } from "./ChatForm";

type Props = {
  chat: Chat[];
  loginUserId: number;
  guildMembers: User[];
  isMember: boolean;
};

export const ChatList = memo((props: Props) => {
  const { chat, loginUserId, guildMembers } = props;
  const ref = useRef<HTMLDivElement>(null);
  const { displayBottom } = useScroll(ref);

  // レンダリングの度にbottomへスクロールさせるために、第二引数省略
  useEffect(() => {
    displayBottom();
  });

  return (
    <Box overflow="auto" h="370px" ref={ref}>
      {chat
        .filter((item) => item.comment !== "")
        .map((item) => {
          return (
            <Chats
              key={item.chatId}
              loginUserId={loginUserId}
              members={guildMembers}
              chat={item}
            />
          );
        })}
    </Box>
  );
});
