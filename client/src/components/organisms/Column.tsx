import { Box, Text } from "@chakra-ui/layout";
import { memo, ReactNode } from "react";

import { ColumnTitle } from "../molcules/ColumnTitle";

type Props = {
  title: string;
  fontSize?: string;
  top?: string;
  children?: ReactNode;
};

export const Column = memo((props: Props) => {
  const { title, fontSize, top, children } = props;

  return (
    <Box pt={20} textAlign="center">
      <ColumnTitle title={title} fontSize={fontSize} top={top} />
      <Box
        px={{ md: "110px" }}
        mt={{ base: "15px", md: "20px" }}
        textAlign="start"
      >
        <Text>{children}</Text>
      </Box>
    </Box>
  );
});
