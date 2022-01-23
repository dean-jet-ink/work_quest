import { Box, Text, Flex } from "@chakra-ui/react";
import { Guild } from "../../types/guild";
import { MyGuildCard } from "../molcules/MyGuildCard";

export const MyGuildList = (props: { myGuildList: Guild[] }) => {
  const { myGuildList } = props;
  return (
    <Box>
      <Box mb={{ base: 2, md: 8, lg: 10 }}>
        <Text color="white" fontSize={{ lg: "18px" }}>
          ({myGuildList.length}/3)
        </Text>
      </Box>
      {myGuildList.length !== 0 ? (
        <Flex
          flexDir={{ base: "column", md: "row" }}
          flexWrap="wrap"
          justify="center"
          align="center"
        >
          {myGuildList.map((guild) => (
            <Box
              key={guild.guildId}
              mb={{ base: 5, lg: 10 }}
              ml={{ base: 5, lg: 10 }}
            >
              <MyGuildCard guild={guild} />
            </Box>
          ))}
        </Flex>
      ) : (
        <Text color="white" fontSize={{ lg: "18px" }}>
          所属しているギルドはありません
        </Text>
      )}
    </Box>
  );
};
