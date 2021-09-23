import { memo } from "react";
import {
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
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

type AddGuildDisplayProps = {
  color: "#ca0000" | "#d0d0d099";
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
  const tabsBgColor = "#b1967b";
  const tabColumnTextColor = "#500707";
  const tabNonSelectedColor = "#cebfb5";
  const line1 = "あんたの所属してるギルドだ";
  const line2 = "参加したいギルドを選びな";
  const { line, changeLine } = useLine(line1);
  const addGuildDisplay: AddGuildDisplayProps = //三つのギルドに所属している場合、ギルド作成フォーム使用不能
    myGuild.length >= 3
      ? {
          color: "#d0d0d099",
          pointerEvents: "none",
        }
      : {
          color: "#ca0000",
          pointerEvents: "auto",
        };

  return (
    <SecondaryLayout>
      <Center>
        <Box position="relative" zIndex={-1} w="500px" h="220px">
          <LineOfChara line={line} />
          <Image
            src={mister}
            mt={3}
            w="285px"
            h="220px"
            objectFit="cover"
            ml="auto"
            position="absolute"
            right={{ base: "-10px", sm: "30px" }}
          />
        </Box>
      </Center>
      <Tabs variant="enclosed" mt="-40px" defaultIndex={1}>
        <TabList borderBottom="none">
          <Tab
            _focus={{}}
            color={tabNonSelectedColor}
            _selected={{ bg: tabsBgColor, color: tabColumnTextColor }}
            fontWeight="bold"
            onClick={() => changeLine(line2)}
          >
            ギルド一覧
          </Tab>
          <Tab
            _focus={{}}
            color={tabNonSelectedColor}
            _selected={{ bg: tabsBgColor, color: tabColumnTextColor }}
            fontWeight="bold"
            onClick={() => changeLine(line1)}
          >
            所属ギルド
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel bg={tabsBgColor} p={{ base: 5, sm: 8 }} minH="50vh">
            {/* ギルド一覧 */}
            <Flex py={2} align="center" justify="space-between">
              <AddContents
                contents="ギルドを作成する"
                onClick={onOpen}
                color={addGuildDisplay.color}
                pointerEvents={addGuildDisplay.pointerEvents}
              />
              <Text color="#cacaca">({myGuild.length}/3)</Text>
            </Flex>
            <GuildList
              guildList={guildList}
              myGuildList={myGuild}
              initialValues={myGuildInitialValues}
              onSubmit={myGuildOnSubmit}
            />
          </TabPanel>
          <TabPanel bg={tabsBgColor} p={8} minH="50vh">
            {/* 所属ギルド一覧 */}
            <MyGuildList myGuildList={myGuild} />
          </TabPanel>
        </TabPanels>
      </Tabs>

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
