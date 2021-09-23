import { Box, Flex, Image, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useDefaultPicture } from "../../hooks/useDefaultPicutre";
import { Guild } from "../../types/guild";
import { Comment } from "./Comment";
import { PeopleOfNumber } from "./PeopleOfNumber";

type Props = {
  guild: Guild;
};

export const MyGuildCard = (props: Props) => {
  const { guild } = props;
  const { inspectedPicture } = useDefaultPicture(guild.guildPicture, "guild/");

  return (
    <Link to={`/top/myguild/${guild.guildId}`}>
      <Box bg="#f0e8d8" p={7}>
        <Box pb={3}>
          <Text fontSize="25px" fontWeight="bold">
            lv10
          </Text>
        </Box>
        <Flex align="center">
          <Box w="60%">
            <Image
              src={inspectedPicture}
              w="120px"
              h="120px"
              mx="auto"
              borderRadius="50%"
            />
          </Box>
          <Stack>
            <Text fontSize="18px" fontWeight="bold">
              {guild.guildName}
            </Text>
            <PeopleOfNumber num={5} />
          </Stack>
        </Flex>
        <Box py={4}>
          <Comment>{`*「 ${guild.comment} 」`}</Comment>
        </Box>
      </Box>
    </Link>
  );
};
