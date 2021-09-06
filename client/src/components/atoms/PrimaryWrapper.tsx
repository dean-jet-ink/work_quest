import { Box } from "@chakra-ui/react";
import { memo, ReactNode } from "react";

export const PrimaryWrapper = memo((props: { children: ReactNode }) => {
  const { children } = props;

  return (
    <Box px={2} py={4}>
      {children}
    </Box>
  );
});
