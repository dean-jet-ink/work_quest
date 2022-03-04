import { Box } from "@chakra-ui/react";
import { memo } from "react";
import { ReactNode } from "react";

export const SecondaryContainer = memo((props: { children: ReactNode }) => {
  const { children } = props;

  return (
    <Box bg="gray.800" border="4px solid #dadada" shadow="md" borderRadius="md">
      {children}
    </Box>
  );
});
