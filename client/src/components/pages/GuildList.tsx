import { memo, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Wrap,
  WrapItem,
  Image,
  Box,
  Stack,
  Text,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";

import { SecondaryLayout } from "../templates/SecondaryLayout";
import { GuildDetailModal } from "../organisms/GuildDetailModal";
import guildBg from "../../image/guild_bg.jpg";
import { guilds } from "../../assets/data/guilds";
import sticker from "../../image/sticker.png";
import { useSelectGuild } from "../../hooks/useSelectGuild";
import { PeopleOfNumber } from "../molcules/PeopleOfNumber";
import { Comment } from "../molcules/Comment";
import { AddContents } from "../molcules/AddContents";
import { AddGuildModal } from "../organisms/AddGuildModal";
import { useGuild } from "../../hooks/form/useGuild";

export const GuildList = memo(() => {
  const { onClose, onOpen, isOpen } = useDisclosure();
  const { selectedGuild, onSelectGuild } = useSelectGuild();

  const user = guilds[0].members[0];
  const {
    guildList,
    initialValues,
    onSubmitGuild,
    onCloseGuild,
    onOpenGuild,
    isOpenGuild,
  } = useGuild(user);
  const tabsBgColor = "#b1967b";
  const tabColumnTextColor = "#500707";
  const tabNonSelectedColor = "#cebfb5";

  const onClickSelect = useCallback(
    (id: number) => {
      onSelectGuild({ id, guildList, onOpen });
    },
    [guildList]
  );

  return (
    <SecondaryLayout>
      <Image src={guildBg} mt={3} w="100%" h="220px" objectFit="cover" />
      <Tabs variant="enclosed" mt="-40px" defaultIndex={1}>
        <TabList borderBottom="none">
          <Tab
            _focus={{}}
            color={tabNonSelectedColor}
            _selected={{ bg: tabsBgColor, color: tabColumnTextColor }}
            fontWeight="bold"
          >
            ギルド一覧
          </Tab>
          <Tab
            _focus={{}}
            color={tabNonSelectedColor}
            _selected={{ bg: tabsBgColor, color: tabColumnTextColor }}
            fontWeight="bold"
          >
            所属ギルド
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel bg={tabsBgColor} p={{ base: 5, sm: 8 }}>
            <Box py={2}>
              <AddContents contents="ギルドを作成する" onClick={onOpenGuild} />
            </Box>
            <Wrap justify="space-between">
              {guildList.map((guild, index) => (
                <WrapItem
                  key={guild.id}
                  cursor="pointer"
                  onClick={() => onClickSelect(guild.id)}
                >
                  <Box position="relative" w="163px" h="200px">
                    <Image
                      src={sticker}
                      w="168px"
                      h="200px"
                      position="absolute"
                      top="0"
                    />
                    <Box position="absolute" top="23px" left="33px" w="105px">
                      <Text color="white" fontSize="17px">
                        lv{guild.level}
                      </Text>
                      <Image
                        src={guild.guildImage}
                        w="70px"
                        h="70px"
                        borderRadius="50%"
                        mx="auto"
                      />
                      <Stack textAlign="center" mt={2}>
                        <Text fontWeight="bold">{guild.guildName}</Text>
                        <PeopleOfNumber num={guild.members.length} />
                      </Stack>
                    </Box>
                  </Box>
                </WrapItem>
              ))}
            </Wrap>
          </TabPanel>
          <TabPanel bg={tabsBgColor} p={8}>
            <Link to={`/top/guild/${guilds[0].id}`}>
              <Box bg="#f0e8d8" p={7}>
                <Box pb={3}>
                  <Text fontSize="25px" fontWeight="bold">
                    lv{guilds[0].level}
                  </Text>
                </Box>
                <Flex align="center">
                  <Box w="60%">
                    <Image
                      src={guilds[1].guildImage}
                      w="120px"
                      h="120px"
                      mx="auto"
                      borderRadius="50%"
                    />
                  </Box>
                  <Stack>
                    <Text fontSize="18px" fontWeight="bold">
                      {guilds[0].guildName}
                    </Text>
                    <PeopleOfNumber num={guilds[0].members.length} />
                  </Stack>
                </Flex>
                <Box py={4}>
                  <Comment>{`*「 ${guilds[0].comment} 」`}</Comment>
                </Box>
              </Box>
            </Link>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <GuildDetailModal
        onClose={onClose}
        isOpen={isOpen}
        guild={selectedGuild}
      />
      <AddGuildModal
        initialValues={initialValues}
        onSubmit={onSubmitGuild}
        onClose={onCloseGuild}
        isOpen={isOpenGuild}
      />
    </SecondaryLayout>
  );
});
