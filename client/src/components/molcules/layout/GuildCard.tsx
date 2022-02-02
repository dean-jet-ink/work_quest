import { Box, Image, Stack, Text, WrapItem, Flex } from "@chakra-ui/react";

import { Guild } from "../../../types/guild";
import { PeopleOfNumber } from "./PeopleOfNumber";
import paper from "../../../image/paper.png";
import { useFile } from "../../../hooks/useFile";

type Props = {
  guild: Guild;
  myGuildList: Guild[];
  onClickSelect: (id: number) => void;
};

export const GuildCard = (props: Props) => {
  const { guild, myGuildList, onClickSelect } = props;
  const { file } = useFile({
    key: "guild",
    picture: guild.guildPicture,
  });

  const existMyGuild = myGuildList.find(
    (myGuild) => myGuild.guildId === guild.guildId
  );
  const display = existMyGuild ? "none" : "block";

  return (
    <WrapItem
      key={guild.guildId}
      cursor="pointer"
      onClick={() => onClickSelect(guild.guildId)}
      d={display}
    >
      <Box
        bg={`center/cover url(${paper})`}
        w={{ base: "157px", sm: "200px", lg: "235px", xl: "265px" }}
        h={{ base: "260px", lg: "290px", xl: "325px" }}
      >
        <Box bgColor="#b98b3a1f" h="100%">
          <Flex h="100%" align="center" justify="center" flexDir="column">
            <Image
              src={file}
              boxSize={{ base: "102px", lg: "140px", xl: "150px" }}
              borderRadius="50%"
              mx="auto"
            />
            <Stack textAlign="center" mt={2}>
              <Text fontWeight="bold">{guild.guildName}</Text>
              <PeopleOfNumber num={11} />
            </Stack>
          </Flex>
        </Box>
      </Box>
    </WrapItem>
  );
};
