import { memo } from "react";
import { Box, Text } from "@chakra-ui/react";

import { PrimaryContainer } from "../atoms/PrimaryContainer";

export const Comment = memo((props: { children: string }) => {
  const { children } = props;

  return (
    <PrimaryContainer>
      <Box p={5}>
        <Text color="white" fontSize="14px">
          {children}
        </Text>
      </Box>
    </PrimaryContainer>
  );
});
