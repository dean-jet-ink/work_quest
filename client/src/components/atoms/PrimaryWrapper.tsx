import { Box } from "@chakra-ui/react";
import { memo, ReactNode } from "react";

export const PrimaryWrapper = memo((props: { children: ReactNode }) => {
  const { children } = props;

  return (
    <Box
      px={{ base: 2, md: 8, lg: 14, xl: "140px" }}
      py={{ base: "30px", md: "50px" }}
    >
      {children}
    </Box>
  );
});
