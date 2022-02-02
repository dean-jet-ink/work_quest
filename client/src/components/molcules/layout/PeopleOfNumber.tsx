import { memo } from "react";
import PeopleIcon from "@material-ui/icons/People";
import { Flex, Text } from "@chakra-ui/layout";

type Props = {
  num: number | undefined;
  color?: string;
  fontSize?: string;
};

export const PeopleOfNumber = memo((props: Props) => {
  const { num, color = "inherit", fontSize = "inherit" } = props;

  return (
    <Flex color={color} fontSize={fontSize} align="center" justify="center">
      <PeopleIcon />
      <Text ml={2}>{num}</Text>
    </Flex>
  );
});
