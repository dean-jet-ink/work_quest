import { AccordionIcon, Flex, Text } from "@chakra-ui/react";
import { useDeadline } from "../../hooks/form/useDaedline";
import moment from "moment";

type Props = {
  name: string;
  deadline: string;
};

export const WorkItem = (props: Props) => {
  const { name, deadline } = props;
  const { colorInfo } = useDeadline(deadline);
  const deadlineFormat = deadline
    ? moment.utc(deadline).format("YYYY/MM/DD")
    : "";

  return (
    <Flex
      bg="#eacfad"
      h="60px"
      w="100%"
      align="center"
      justify="space-between"
      borderRadius="md"
      borderWidth="2px"
      borderColor="#906e43"
      p={{ base: 3 }}
      cursor="pointer"
    >
      <Text fontSize="15px" fontWeight="bold" color="blackAlpha.800">
        {name}
      </Text>
      <Flex align="center">
        <Text color={colorInfo} mr={2} fontWeight="bold">
          {deadlineFormat}
        </Text>
        <AccordionIcon />
      </Flex>
    </Flex>
  );
};
