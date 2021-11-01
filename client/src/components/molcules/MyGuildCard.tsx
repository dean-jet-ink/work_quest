import { Box, Flex, Image, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useDefaultPicture } from "../../hooks/useDefaultPicutre";
import { Guild } from "../../types/guild";
import { Comment } from "./Comment";
import { PeopleOfNumber } from "./PeopleOfNumber";
import paper from "../../image/paper.png";

type Props = {
  guild: Guild;
};

export const MyGuildCard = (props: Props) => {
  const { guild } = props;
  const { inspectedPicture } = useDefaultPicture(guild.guildPicture, "guild/");

  return (
    <Link to={`/top/myguild/${guild.guildId}`}>
      <Box
        bg={`center/cover url(${paper}) no-repeat`}
        w={{ base: "300px" }}
        h={{ base: "380px" }}
        shadow="md"
      >
        <Box bgColor="#b98b3a1f" h="100%" p="27px">
          <Stack spacing={4}>
            <Image
              src={inspectedPicture}
              boxSize="160px"
              mx="auto"
              borderRadius="50%"
            />
            <Text fontSize="14px" fontWeight="bold" textAlign="center">
              {guild.guildName}
            </Text>
            <PeopleOfNumber num={5} />
            <Box>
              <Comment>{`*「 ${guild.comment} 」`}</Comment>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Link>
  );
};
