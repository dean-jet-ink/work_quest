import { Box } from "@chakra-ui/react";
import { memo, ReactNode } from "react";

export const PrimaryWrapper = memo((props: { children: ReactNode }) => {
  const { children } = props;

  return (
    <Box
      px={{ base: 2, lg: 14, xl: "140px" }}
      pt={{ base: "25px", md: "40px" }}
      pb={{ base: "25px", md: "56px" }}
    >
      {children}
    </Box>
  );
});
