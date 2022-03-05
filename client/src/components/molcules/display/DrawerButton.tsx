import { Flex, Text } from "@chakra-ui/react";

import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import { PrimaryContainer } from "../../atoms/layout/PrimaryContainer";

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
        my={4}
        mx="auto"
        align="center"
        justify="center"
        _hover={{ cursor: "pointer", color: "orange" }}
        w="100%"
        maxW="500px"
      >
        <ArrowDropUpIcon />
        <Text>{text}</Text>
      </Flex>
    </PrimaryContainer>
  );
};
