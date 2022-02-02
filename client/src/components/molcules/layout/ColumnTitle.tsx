import { Box, Image, Text } from "@chakra-ui/react";
import { memo } from "react";

import column from "../../../image/column.svg";

type Props = {
  title: string;
  fontSize?: string;
  top: string;
  left: string;
  right: string;
};

export const ColumnTitle = memo((props: Props) => {
  const { title, fontSize = "20px", top, left, right } = props;

  return (
    <Box position="relative" h="100px">
      <Image
        src={column}
        position="absolute"
        w="280px"
        top="-45px"
        right="0"
        left="0"
        m="auto"
        zIndex="1"
      />
      <Text
        as="h1"
        w="fit-content"
        fontSize={fontSize}
        fontWeight="bold"
        zIndex="2"
        position="absolute"
        top={top}
        right={right}
        left={left}
        m="auto"
        color="black"
      >
        {title}
      </Text>
    </Box>
  );
});
