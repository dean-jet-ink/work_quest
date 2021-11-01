import { Flex, Text } from "@chakra-ui/react";

import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import { PrimaryContainer } from "../atoms/PrimaryContainer";

type Props = {
  text: string;
  onClick: () => void;
};

export const DrawerButton = (props: Props) => {
  const { text, onClick } = props;

  return (
    <PrimaryContainer>
      <Flex
        onClick={onClick}
        my={8}
        mx="auto"
        align="center"
        justify="center"
        _hover={{ cursor: "pointer", color: "orange" }}
        w="fit-content"
      >
        <Text fontWeight="bold">{text}</Text>
        <ArrowDropUpIcon />
      </Flex>
    </PrimaryContainer>
  );
};
