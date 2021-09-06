import { memo } from "react";
import { Flex, Text } from "@chakra-ui/react";
import TimerIcon from "@material-ui/icons/Timer";

type Props = {
  totalTime: number;
  color?: string;
  fontSize?: string;
};

export const TotalTime = memo((props: Props) => {
  const { totalTime, color = "white", fontSize = "15px" } = props;

  return (
    <Flex align="center" mr={2} color={color} fontSize={fontSize}>
      <TimerIcon />
      <Text>{totalTime}h</Text>
    </Flex>
  );
});
