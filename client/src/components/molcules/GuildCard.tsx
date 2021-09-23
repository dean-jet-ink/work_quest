import { Box, Image, Stack, Text, WrapItem } from "@chakra-ui/react";

import { Guild } from "../../types/guild";
import { PeopleOfNumber } from "./PeopleOfNumber";
import sticker from "../../image/sticker.png";
import { useDefaultPicture } from "../../hooks/useDefaultPicutre";
import { useLoginUser } from "../../hooks/useLoginUser";

type Props = {
  guild: Guild;
  myGuildList: Guild[];
  onClickSelect: (id: number) => void;
};

export const GuildCard = (props: Props) => {
  const { guild, myGuildList, onClickSelect } = props;
  const { inspectedPicture } = useDefaultPicture(guild.guildPicture, "guild/");

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
      <Box position="relative" w="163px" h="200px">
        <Image src={sticker} w="168px" h="200px" position="absolute" top="0" />
        <Box position="absolute" top="23px" left="33px" w="105px">
          <Text color="white" fontSize="17px">
            lv.10
          </Text>
          <Image
            src={inspectedPicture}
            w="70px"
            h="70px"
            borderRadius="50%"
            mx="auto"
          />
          <Stack textAlign="center" mt={2}>
            <Text fontWeight="bold">{guild.guildName}</Text>
            <PeopleOfNumber num={11} />
          </Stack>
        </Box>
      </Box>
    </WrapItem>
  );
};
