import { memo } from "react";
import { Box, Text } from "@chakra-ui/react";

import { PrimaryContainer } from "../../atoms/layout/PrimaryContainer";

type Props = {
  children: string;
  fontSize?: any;
  padding?: any;
  height?: any;
  overflow?: string;
};

export const Comment = memo((props: Props) => {
  const {
    children,
    fontSize = "inherit",
    padding = 2,
    height = "auto",
    overflow = "auto",
  } = props;

  return (
    <Box
      bg="#191e2bd6"
      border="2px solid #dadada"
      shadow="md"
      borderRadius="md"
      h={height}
      overflow={overflow}
    >
      <Box p={padding}>
        <Text fontSize={fontSize}>{children}</Text>
      </Box>
    </Box>
  );
});
