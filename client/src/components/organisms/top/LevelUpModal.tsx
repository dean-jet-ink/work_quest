import { memo } from "react";
import { Flex, Text, Image, Box, Stack } from "@chakra-ui/react";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

import { PrimaryModal } from "../../molcules/popUp/PrimaryModal";
import { User } from "../../../types/user";

type Props = {
  onClose: () => void;
  isOpen: boolean;
  user: User;
  level: number;
  title: string;
  titleImage: string;
};

export const LevelUpModal = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { onClose, isOpen, user, level, title, titleImage } = props;

  return (
    <PrimaryModal onClose={onClose} isOpen={isOpen}>
      <Box p={5}>
        <Flex justify="center" textAlign="center">
          <Stack spacing={3}>
            <Text fontSize="25px" color="orange">
              LEVEL UP !!
            </Text>
            <Flex justify="space-around" color="#43da3e">
              <Flex justify="center">
                <ArrowUpwardIcon color="inherit" />
                <Text ml={2} fontSize="18px" fontWeight="bold">
                  level {level}
                </Text>
              </Flex>
              <Text ml={2} fontSize="18px" fontWeight="bold">
                {title}
              </Text>
            </Flex>
            <Image src={titleImage} w="150px" />
          </Stack>
        </Flex>
      </Box>
    </PrimaryModal>
  );
});
