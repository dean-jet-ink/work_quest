import { Box, Flex, Text } from "@chakra-ui/react";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import moment from "moment";

import { useDeadline } from "../../../hooks/useDaedline";

type Props = {
  name: string;
  deadline: string | null;
};

export const WorkItem = (props: Props) => {
  const { name, deadline } = props;
  const { colorInfo } = useDeadline(deadline);
  const deadlineFormat = deadline ? moment(deadline).format("YYYY/MM/DD") : "";

  return (
    <Flex
      h="45px"
      w="100%"
      align="center"
      justify="space-between"
      cursor="pointer"
      hover={{ bg: "#e1e1e124" }}
    >
      <Flex align="center">
        <Box mr={1} pb="3px" fontSize="30px">
          <ArrowRightIcon color="inherit" fontSize="inherit" />
        </Box>
        <Text
          fontSize={{ base: "15px", md: "16px", lg: "18px" }}
          textAlign="start"
        >
          {name}
        </Text>
      </Flex>
      <Flex align="center">
        <Text color={colorInfo} ml={2} fontSize="14px">
          {deadlineFormat}
        </Text>
      </Flex>
    </Flex>
  );
};
