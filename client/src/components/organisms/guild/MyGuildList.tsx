import { Box, Text, List, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { Guild } from "../../../types/guild";
import { GuildRow } from "../../molcules/layout/GuildRow";

export const MyGuildList = (props: { myGuildList: Guild[] }) => {
  const { myGuildList } = props;
  return (
    <Box>
      <Box mb={{ base: 2, sm: 4, lg: 6 }}>
        <Text fontSize={{ lg: "18px" }}>({myGuildList.length}/3)</Text>
      </Box>
      {myGuildList.length !== 0 ? (
        <List>
          <Stack spacing={{ base: 2, md: 3 }}>
            {myGuildList.map((guild) => (
              <Link to={`/top/MyGuild/${guild.guildId}`}>
                <GuildRow
                  key={guild.guildId}
                  guild={guild}
                  myGuilds={myGuildList}
                  myGuildTab={true}
                />
              </Link>
            ))}
          </Stack>
        </List>
      ) : (
        <Text color="white" fontSize={{ lg: "18px" }}>
          所属しているギルドはありません
        </Text>
      )}
    </Box>
  );
};
