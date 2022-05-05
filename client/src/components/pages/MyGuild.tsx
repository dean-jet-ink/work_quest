import { memo, useState } from "react";
import { Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import { SecondaryLayout } from "../templates/layout/SecondaryLayout";
import { useChat } from "../../hooks/useChat";
import { UserList } from "../organisms/_common/UserList";
import { useGuild } from "../../hooks/useGuild";
import { useFetchGuildMembers } from "../../hooks/useFetchGuildMembers";
import { useLoginUser } from "../../hooks/useLoginUser";
import { PrimaryTab } from "../molcules/menu/PrimaryTab";
import { useFile } from "../../hooks/useFile";
import { MyGuildProfile } from "../organisms/myGuild/MyGuildProfile";
import { ChatList } from "../organisms/myGuild/CharList";
import { ChatForm } from "../organisms/myGuild/ChatForm";

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
  const [isMember, setMember] = useState(true);
  const onClickChange = () => {
    if (isMember) {
      setMember(false);
    }
  };

  return (
    <SecondaryLayout>
      <MyGuildProfile
        loginUserId={loginUserId!}
        guild={guild}
        file={file}
        onClickDelete={onClickDelete}
        onClickExit={() => onClickExit(loginUserId!)}
        deleteFile={() => deleteFile(guild.guildPicture)}
      />
      <Box
        mt={{ base: "-40px", md: "-63px", lg: "" }}
        position="relative"
        zIndex={2}
      >
        <PrimaryTab
          defaultIndex={0}
          tab1="メンバー"
          tab2="メッセージ"
          onClickTab2={onClickChange}
        >
          <Box px={{ md: "40px", lg: "120px", xl: "220px" }}>
            <UserList users={guildMembers} />
          </Box>
          <Box px={{ md: "40px", lg: "120px", xl: "220px" }}>
            <ChatList
              chat={chat}
              loginUserId={loginUserId!}
              guildMembers={guildMembers}
              isMember={isMember}
            />
            <Box mt={3}>
              <ChatForm initialValues={initialValues} onSubmit={onSubmit} />
            </Box>
          </Box>
        </PrimaryTab>
      </Box>
    </SecondaryLayout>
  );
});
