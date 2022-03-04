import { Image, Text, Flex, ListItem, Box } from "@chakra-ui/react";

import { Guild } from "../../../types/guild";
import { PeopleOfNumber } from "./PeopleOfNumber";
import { useFile } from "../../../hooks/useFile";
import { Comment } from "../layout/Comment";

type Props = {
  guild: Guild;
  myGuilds: Guild[];
  myGuildTab?: boolean;
  onClickSelect?: (id: number) => void;
};

export const GuildRow = (props: Props) => {
  const { myGuildTab = false, guild, myGuilds, onClickSelect } = props;
  const { file } = useFile({
    key: "guild",
    picture: guild.guildPicture,
  });
  const isMyGuild = myGuilds.find(
    (myGuild) => myGuild.guildId === guild.guildId
  );
  const border = isMyGuild && !myGuildTab ? "3px solid #dadada" : "none"; //リストの自分の行はborder表示

  return (
    <ListItem
      bg="#302e3494"
      border={border}
      px={{ base: 4, md: 10 }}
      py={{ base: 2 }}
      borderRadius="4px"
      onClick={() => {
        if (onClickSelect) {
          onClickSelect(guild.guildId);
        }
      }}
    >
      <Flex align="center" justify="space-between">
        <Box mr={{ base: "10px", sm: "20px", md: "35px" }}>
          <Image
            src={file}
            boxSize={{ base: "50px", sm: "65px", lg: "70px" }}
            borderRadius="50%"
            mx="auto"
            maxW="none"
          />
        </Box>
        <Flex flexDir="column" align="start" w="100%">
          <Text fontSize={{ base: "14px" }} overflow="hidden">
            {guild.guildName}
          </Text>
          <PeopleOfNumber num={11} fontSize="13px" />
          <Box w="100%">
            <Comment
              fontSize={{ base: "13px", sm: "14px", md: "16px" }}
              padding={1}
              height={{ base: "43px", sm: "47px", md: "55px" }}
              overflow="hidden"
            >{`*「 ${guild.comment} 」`}</Comment>
          </Box>
        </Flex>
      </Flex>
    </ListItem>
  );
};
