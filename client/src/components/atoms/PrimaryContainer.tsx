import { Box } from "@chakra-ui/react";
import { memo } from "react";
import { ReactNode } from "react";

export const PrimaryContainer = memo((props: { children: ReactNode }) => {
  const { children } = props;

  return (
    <Box
      color="white"
      bg="gray.900"
      borderWidth="4px"
      borderColor="white"
      borderRadius="md"
      shadow="md"
    >
      {children}
    </Box>
  );
});
