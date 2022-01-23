import { memo } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import AddIcon from "@material-ui/icons/Add";

type Props = {
  onClick: () => void;
  contents?: string;
  color?: "white" | "#d0d0d099";
  pointerEvents?: "none" | "auto";
};

export const AddContents = memo((props: Props) => {
  const {
    onClick,
    contents = "Workの追加",
    color = "white",
    pointerEvents = "auto",
  } = props;

  return (
    <Flex color={color} pointerEvents={pointerEvents} align="center">
      <Flex
        align="center"
        _hover={{ color: "#d42d2d" }}
        w="fit-content"
        cursor="pointer"
      >
        <Box onClick={onClick} data-testid="addButton">
          <AddIcon fontSize="large" />
        </Box>
      </Flex>
      <Text fontSize={{ base: "16px", lg: "18px" }} ml={3}>
        {contents}
      </Text>
    </Flex>
  );
});
