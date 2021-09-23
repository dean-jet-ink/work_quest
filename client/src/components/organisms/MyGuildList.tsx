import { Box, Text } from "@chakra-ui/react";
import { useSelectGuild } from "../../hooks/useSelectGuild";
import { Guild } from "../../types/guild";
import { PrimaryWrapper } from "../atoms/PrimaryWrapper";
import { MyGuildCard } from "../molcules/MyGuildCard";

export const MyGuildList = (props: { myGuildList: Guild[] }) => {
  const { myGuildList } = props;

  return (
    <PrimaryWrapper>
      <Text color="#cacaca" my={3}>
        ({myGuildList.length}/3)
      </Text>
      {myGuildList.length !== 0 ? (
        <Box>
          {myGuildList.map((guild) => (
            <MyGuildCard key={guild.guildId} guild={guild} />
          ))}
        </Box>
      ) : (
        <Text>所属しているギルドはありません</Text>
      )}
    </PrimaryWrapper>
  );
};
