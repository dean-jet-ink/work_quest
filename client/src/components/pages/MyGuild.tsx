import { memo } from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import { SecondaryLayout } from "../templates/layout/SecondaryLayout";
import guildBg from "../../image/guild_bg.jpg";
import { Chat } from "../organisms/guild/Chat";
import { useChat } from "../../hooks/form/useChat";
import { UserList } from "../organisms/_common/UserList";
import { useGuild } from "../../hooks/useGuild";
import { useFetchGuildMembers } from "../../hooks/useFetchGuildMembers";
import { useLoginUser } from "../../hooks/useLoginUser";
import { PrimaryTab } from "../molcules/menu/PrimaryTab";
import { ChatModal } from "../organisms/guild/ChatModal";
import CommentIcon from "@material-ui/icons/Comment";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { ExitGuildDialog } from "../molcules/popUp/ExitGuildDialog";
import { useDisclosures } from "../../hooks/useDisclosures";
import { useFile } from "../../hooks/useFile";

export const MyGuild = memo(() => {
  const { id } = useParams<{ id: string }>();
  const { loginUserId } = useLoginUser();
  const { guildMembers } = useFetchGuildMembers(Number(id));
  const { guild, onClickExit, onClickDelete } = useGuild(Number(id));
  const { file, deleteFile } = useFile({
    picture: guild.guildPicture,
    key: "guild",
  });
  const { chat, initialValues, onSubmit } = useChat({
    guildId: Number(id),
    userId: loginUserId as number,
  });
  const { isOpen1, isOpen2, onOpen1, onOpen2, onClose1, onClose2 } =
    useDisclosures();

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
              data-testid="exitButton"
              fontSize={{ base: "30px", md: "40px", lg: "50px" }}
              color="white"
              _hover={{ cursor: "pointer" }}
              onClick={onOpen1}
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
            {chat
              .filter((item) => item.comment !== "")
              .map((item) => {
                return (
                  <Chat
                    key={item.chatId}
                    loginUserId={loginUserId as number}
                    members={guildMembers}
                    chat={item}
                  />
                );
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
                onClick={onOpen2}
              >
                <CommentIcon
                  data-testid="commentButton"
                  fontSize="inherit"
                  color="inherit"
                />
              </Box>
            </Box>
          </Box>
        </PrimaryTab>
      </Box>
      <ChatModal
        initialValues={initialValues}
        onSubmit={onSubmit}
        onClose={onClose2}
        isOpen={isOpen2}
      />
      <ExitGuildDialog
        id={loginUserId!}
        guild={guild}
        isOpen={isOpen1}
        onClose={onClose1}
        onClickDelete={onClickDelete}
        onClickExit={() => onClickExit(loginUserId!)}
        deleteFile={() => deleteFile(guild.guildPicture)}
      />
    </SecondaryLayout>
  );
});
