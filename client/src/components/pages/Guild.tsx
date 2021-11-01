import { memo } from "react";
import {
  Image,
  Box,
  useDisclosure,
  Center,
  Flex,
  Text,
} from "@chakra-ui/react";

import { SecondaryLayout } from "../templates/SecondaryLayout";
import mister from "../../image/mister.png";
import { AddContents } from "../molcules/AddContents";
import { AddGuildModal } from "../organisms/AddGuildModal";
import { useGuildList } from "../../hooks/form/useGuildList";
import { LineOfChara } from "../molcules/LineOfChara";
import { useLine } from "../../hooks/useLine";
import { GuildList } from "../organisms/GuildList";
import { useLoginUser } from "../../hooks/useLoginUser";
import { MyGuildList } from "../organisms/MyGuildList";
import { useMyGuild } from "../../hooks/form/useMyGuild";
import { PrimaryTab } from "../molcules/PrimaryTab";

type AddGuildDisplayProps = {
  color: "white" | "#d0d0d099";
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
  const addGuildDisplay: AddGuildDisplayProps = //三つのギルドに所属している場合、ギルド作成フォーム使用不能
    myGuild.length >= 3
      ? {
          color: "#d0d0d099",
          pointerEvents: "none",
        }
      : {
          color: "white",
          pointerEvents: "auto",
        };

  return (
    <SecondaryLayout>
      <Center>
        <Box position="relative" zIndex={-1} w="500px" h="220px">
          <Box
            position="absolute"
            top={{ base: "35px", lg: "110px" }}
            left={{
              base: "10px",
              sm: "30px",
              md: "-15px",
              lg: "15px",
              xl: "75px",
            }}
          >
            <LineOfChara
              line={line}
              position="right"
              width={{ base: "154px", sm: "180px", md: "220px", lg: "285px" }}
            />
          </Box>
          <Image
            src={mister}
            mt={3}
            w={{ base: "285px", md: "301px", lg: "435px", xl: "560px" }}
            h={{ base: "220px", md: "231px", lg: "343px", xl: "365px" }}
            objectFit="cover"
            ml="auto"
            position="absolute"
            right={{ base: "-10px", sm: "30px", lg: "-205px", xl: "-300px" }}
          />
        </Box>
      </Center>

      <Box mt={{ base: "-40px", lg: "65px", xl: "90px" }}>
        <PrimaryTab
          defaultIndex={1}
          tab1="ギルド一覧"
          tab2="所属ギルド"
          onClickTab1={() => changeLine(line1)}
          onClickTab2={() => changeLine(line2)}
        >
          {/* ギルド一覧 */}

          <Box>
            <Flex
              mb={{ base: 2, md: 8, lg: 10 }}
              align="center"
              justify="start"
            >
              <AddContents
                contents="ギルドを作成する"
                onClick={onOpen}
                color={addGuildDisplay.color}
                pointerEvents={addGuildDisplay.pointerEvents}
              />
              <Box ml={4} fontSize={{ base: "16px", lg: "18px" }}>
                <Text color="white">({myGuild.length}/3)</Text>
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

          <MyGuildList myGuildList={myGuild} />
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
