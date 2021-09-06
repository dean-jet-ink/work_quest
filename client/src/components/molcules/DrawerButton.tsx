import { Flex, Text } from "@chakra-ui/react";

import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";

type Props = {
  text: string;
  onClick: () => void;
};

export const DrawerButton = (props: Props) => {
  const { text, onClick } = props;

  return (
    <Flex
      onClick={onClick}
      my={8}
      mx="auto"
      align="center"
      justify="center"
      color="black"
      _hover={{ cursor: "pointer", color: "orange" }}
      w="fit-content"
    >
      <Text fontWeight="bold">{text}</Text>
      <ArrowDropUpIcon />
    </Flex>
  );
};
