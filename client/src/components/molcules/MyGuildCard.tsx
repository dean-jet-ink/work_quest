import { Box, Image, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Guild } from "../../types/guild";
import { Comment } from "./Comment";
import { PeopleOfNumber } from "./PeopleOfNumber";
import paper from "../../image/paper.png";
import { useFile } from "../../hooks/useFile";

type Props = {
  guild: Guild;
};

export const MyGuildCard = (props: Props) => {
  const { guild } = props;
  const { file } = useFile({ key: "guild", picture: guild.guildPicture });

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
            <Image src={file} boxSize="160px" mx="auto" borderRadius="50%" />
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
