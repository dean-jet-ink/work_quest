import { Box } from "@chakra-ui/react";
import { memo } from "react";
import { ReactNode } from "react";

export const PrimaryContainer = memo((props: { children: ReactNode }) => {
  const { children } = props;

  return (
    <Box
      bg="#191e2bd6"
      border="4px solid #dadada"
      shadow="md"
      borderRadius="md"
    >
      {children}
    </Box>
  );
});
