import { memo } from "react";
import { Box, Text, Image, Flex, Stack } from "@chakra-ui/react";

import { PrimaryModal } from "../molcules/PrimaryModal";
import { Guild } from "../../types/guild";
import { PeopleOfNumber } from "../molcules/PeopleOfNumber";
import { Comment } from "../molcules/Comment";
import { PrimaryButton } from "../atoms/forms/PrimarButton";

type Props = {
  onClose: () => void;
  isOpen: boolean;
  guild: Guild | undefined;
};

export const GuildDetailModal = memo((props: Props) => {
  const { onClose, isOpen, guild } = props;

  return (
    <PrimaryModal onClose={onClose} isOpen={isOpen}>
      <Box p={4}>
        <Box py={3}>
          <Text fontSize="30px">lv{guild?.level}</Text>
        </Box>
        <Flex align="center" pb={6}>
          <Box w="60%">
            <Image
              src={guild?.guildImage}
              boxSize="150px"
              borderRadius="50%"
              m="auto"
            />
          </Box>
          <Stack flexGrow={1} align="center" spacing={4} textAlign="center">
            <Text fontSize="18px">{guild?.guildName}</Text>
            <PeopleOfNumber num={guild?.members.length} />
          </Stack>
        </Flex>
        <Comment>{`*「 ${guild?.comment} 」`}</Comment>
        <Flex justify="flex-end" py={5}>
          <PrimaryButton onClick={() => console.log("Hello")}>
            参加する
          </PrimaryButton>
        </Flex>
      </Box>
    </PrimaryModal>
  );
});
