import { memo } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import AddIcon from "@material-ui/icons/Add";

type Props = {
  onClick: () => void;
  contents?: string;
  color?: "#ca0000" | "#d0d0d099";
  pointerEvents?: "none" | "auto";
};

export const AddContents = memo((props: Props) => {
  const {
    onClick,
    contents = "Workの追加",
    color = "#ca0000",
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
        <Box onClick={onClick}>
          <AddIcon fontSize="large" />
        </Box>
      </Flex>
      <Text fontSize="16px" ml={3}>
        {contents}
      </Text>
    </Flex>
  );
});
