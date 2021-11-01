import { memo } from "react";
import { Box, Text, Flex } from "@chakra-ui/react";

import { SecondaryLayout } from "../templates/SecondaryLayout";
import guildBg from "../../image/guild_bg.jpg";
import { Chat } from "../molcules/Chat";
import { useChat } from "../../hooks/form/useChat";
import { UserList } from "../organisms/UserList";
import { useParams } from "react-router-dom";
import { useGuild } from "../../hooks/useGuild";
import { useFetchGuildMembers } from "../../hooks/useFetchGuildMembers";
import { useLoginUser } from "../../hooks/useLoginUser";
import { PrimaryTab } from "../molcules/PrimaryTab";
import { useDisclosureChat } from "../../hooks/useDisclosureChat";
import { ChatModal } from "../organisms/ChatModal";
import CommentIcon from "@material-ui/icons/Comment";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useDisclosureExit } from "../../hooks/useDisclosureExit";
import { Dialog } from "../molcules/Dialog";
import { useDisclosureBreakup } from "../../hooks/useDisclosureBreakup";

export const MyGuild = memo(() => {
  const { id } = useParams<{ id: string }>();
  const { loginUserId } = useLoginUser();
  const { guildMembers } = useFetchGuildMembers(Number(id));
  const { guild, onClickExit, onClickDelete } = useGuild(Number(id));
  const { chat, initialValues, onSubmit } = useChat({
    guildId: Number(id),
    userId: loginUserId as number,
  });
  const { onOpenChat, onCloseChat, isOpenChat } = useDisclosureChat();
  const { onOpenExit, onCloseExit, isOpenExit } = useDisclosureExit();
  const { onOpenBreakup, onCloseBreakup, isOpenBreakup } =
    useDisclosureBreakup();
  const selectOpen = guild.adminId === loginUserId ? onOpenBreakup : onOpenExit; //adminの場合、ギルド解散のモーダル表示

  return (
    <SecondaryLayout>
      <Box
        bg={`center/cover url(${guildBg}) no-repeat`}
        position="relative"
        zIndex={1}
      >
        <Flex
          align="start"
          h={{ base: "235px", md: "335px", lg: "400px", xl: "500px" }}
        >
          <Flex
            p={{ base: "40px" }}
            position="relative"
            align="center"
            justify="start"
          >
            <Box
              py={{ base: 2, md: 3, lg: 5, xl: 7 }}
              px={{ base: 3, md: 5, lg: 7, xl: 9 }}
              mr={{ base: 4 }}
              bg="#ae8f8366"
              boxSize="fit-content"
              borderRadius="2px"
            >
              <Text
                color="#e6be8d"
                fontSize={{ base: "22px", md: "40px", lg: "45px" }}
                letterSpacing={{ base: "3px", md: "5px" }}
              >
                {guild.guildName}
              </Text>
            </Box>
            <Box
              fontSize={{ base: "30px", md: "40px", lg: "50px" }}
              color="white"
              _hover={{ cursor: "pointer" }}
              onClick={selectOpen}
              h="fit-content"
            >
              <ExitToAppIcon fontSize="inherit" color="inherit" />
            </Box>
          </Flex>
        </Flex>
      </Box>
      <Box
        mt={{ base: "-40px", md: "-63px", lg: "" }}
        position="relative"
        zIndex={2}
      >
        <PrimaryTab defaultIndex={0} tab1="メンバー" tab2="メッセージ">
          <UserList users={guildMembers} />
          <Box>
            {chat.map((item) => {
              if (item.comment) {
                return (
                  <Chat
                    key={item.chatId}
                    loginUserId={loginUserId as number}
                    members={guildMembers}
                    chat={item}
                  />
                );
              }
            })}
            <Box
              position="fixed"
              bottom="25px"
              right="25px"
              fontSize={{ base: "35px", md: "50px" }}
              color="white"
              bg="twitter.500"
              w={{ base: "50px", md: "70px" }}
              borderRadius="50%"
              shadow="2px 4px 10px 0 rgb(0 0 0 / 60%)"
            >
              <Box
                mx="auto"
                w="fit-content"
                _hover={{ cursor: "pointer" }}
                onClick={onOpenChat}
              >
                <CommentIcon fontSize="inherit" color="inherit" />
              </Box>
            </Box>
          </Box>
        </PrimaryTab>
      </Box>
      <ChatModal
        initialValues={initialValues}
        onSubmit={onSubmit}
        onClose={onCloseChat}
        isOpen={isOpenChat}
      />

      {/* メンバー用で、退会を行う */}
      <Dialog
        header={`「${guild.guildName}」から退会しますか？`}
        color="red"
        onClick={() => {
          onClickExit(loginUserId as number);
        }}
        onClose={onCloseExit}
        isOpen={isOpenExit}
      />

      {/* admin用で、ギルド解散を行う */}
      <Dialog
        header={`「${guild.guildName}」を解散させますか？`}
        color="red"
        onClick={() => {
          onClickDelete();
        }}
        onClose={onCloseBreakup}
        isOpen={isOpenBreakup}
      />
    </SecondaryLayout>
  );
});
