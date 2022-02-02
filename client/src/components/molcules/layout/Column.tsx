import { Box, Text } from "@chakra-ui/layout";
import { memo, ReactNode } from "react";

import { ColumnTitle } from "./ColumnTitle";

type Props = {
  title: string;
  fontSize?: string;
  top?: string;
  left?: string;
  right?: string;
  children?: ReactNode;
};

export const Column = memo((props: Props) => {
  const {
    title,
    fontSize,
    top = "12px",
    left = "0",
    right = "0",
    children,
  } = props;

  return (
    <Box textAlign="center">
      <ColumnTitle
        title={title}
        fontSize={fontSize}
        top={top}
        left={left}
        right={right}
      />
      <Box
        px={{ md: "110px" }}
        mt={{ base: "15px", md: "20px" }}
        textAlign="center"
      >
        <Text>{children}</Text>
      </Box>
    </Box>
  );
});
