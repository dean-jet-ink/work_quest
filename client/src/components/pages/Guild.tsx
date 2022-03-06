import { memo } from "react";
import { Image, Box, useDisclosure, Flex, Text } from "@chakra-ui/react";

import { SecondaryLayout } from "../templates/layout/SecondaryLayout";
import mister from "../../image/mister.png";
import { AddContents } from "../molcules/button/AddContents";
import { AddGuildModal } from "../organisms/guild/AddGuildModal";
import { useGuildList } from "../../hooks/form/useGuildList";
import { LineOfChara } from "../molcules/layout/LineOfChara";
import { useLine } from "../../hooks/useLine";
import { GuildList } from "../organisms/guild/GuildList";
import { useLoginUser } from "../../hooks/useLoginUser";
import { MyGuildList } from "../organisms/guild/MyGuildList";
import { useMyGuild } from "../../hooks/form/useMyGuild";
import { PrimaryTab } from "../molcules/menu/PrimaryTab";
import guildBg from "../../image/guild_bg.jpg";

type AddGuildDisplayProps = {
  color: "inherit" | "#d0d0d099";
  pointerEvents: "none" | "auto";
};

export const Guild = memo(() => {
  const { loginUserId } = useLoginUser();
  const { myGuild, setMyGuild, myGuildInitialValues, myGuildOnSubmit } =
    useMyGuild(loginUserId as number);
  const { guildList, initialValues, onSubmitGuild, guildValidationSchema } =
    useGuildList({
      userId: loginUserId as number,
      setMyGuild,
    });
  const { onClose, onOpen, isOpen } = useDisclosure();
  const line1 = "参加したいギルドを選びな";
  const line2 = "あんたの所属してるギルドだ";
  const { line, changeLine } = useLine(line2);
  const addGuildDisplay: AddGuildDisplayProps = //三つのギルドに所属している場合、ギルド作成フォーム使用不可
    myGuild.length >= 3
      ? {
          color: "#d0d0d099",
          pointerEvents: "none",
        }
      : {
          color: "inherit",
          pointerEvents: "auto",
        };

  return (
    <SecondaryLayout>
      <Flex
        position="relative"
        align="center"
        justify="center"
        zIndex="-1"
        pt={{ lg: 3 }}
        bg={`center/cover url(${guildBg}) no-repeat`}
      >
        <Box h="fit-content" pb={14}>
          <LineOfChara
            line={line}
            position="right"
            width={{
              base: "154px",
              sm: "180px",
              md: "220px",
              lg: "285px",
            }}
          />
        </Box>
        <Image
          src={mister}
          boxSize={{ base: "195px", md: "210px", lg: "250px" }}
          height={{ md: "195px", lg: "189px" }}
          objectFit="cover"
        />
      </Flex>

      <Box mt={{ base: "-66px", lg: "-53px" }}>
        <PrimaryTab
          defaultIndex={1}
          tab1="ギルド一覧"
          tab2="所属ギルド"
          onClickTab1={() => changeLine(line1)}
          onClickTab2={() => changeLine(line2)}
        >
          {/* ギルド一覧 */}

          <Box mx="auto" w={{ sm: "436px", md: "540px", lg: "760px" }}>
            <Flex mb={{ base: 2, sm: 4, lg: 6 }} align="center" justify="start">
              <AddContents
                contents="ギルドを作成する"
                onClick={onOpen}
                color={addGuildDisplay.color}
                pointerEvents={addGuildDisplay.pointerEvents}
              />
              <Box ml={4} fontSize={{ base: "16px", lg: "18px" }}>
                <Text>({myGuild.length}/3)</Text>
              </Box>
            </Flex>
            <GuildList
              guildList={guildList}
              myGuildList={myGuild}
              initialValues={myGuildInitialValues}
              onSubmit={myGuildOnSubmit}
            />
          </Box>

          {/* 所属ギルド一覧 */}

          <Box mx="auto" w={{ sm: "436px", md: "540px", lg: "760px" }}>
            <MyGuildList myGuildList={myGuild} />
          </Box>
        </PrimaryTab>
      </Box>

      <AddGuildModal
        initialValues={initialValues}
        onSubmit={onSubmitGuild}
        onClose={onClose}
        isOpen={isOpen}
        validationSchema={guildValidationSchema}
      />
    </SecondaryLayout>
  );
});
