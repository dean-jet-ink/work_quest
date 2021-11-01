import { Flex } from "@chakra-ui/react";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";

export const CheerButton = (props: { onOpenCheer: () => void }) => {
  const { onOpenCheer } = props;

  return (
    <Flex
      align="center"
      fontSize={{ base: "26px", md: "31px", lg: "37px" }}
      color="#debd0b"
      w="fit-content"
      cursor="pointer"
      onClick={onOpenCheer}
    >
      <InsertEmoticonIcon color="inherit" fontSize="inherit" />
    </Flex>
  );
};
