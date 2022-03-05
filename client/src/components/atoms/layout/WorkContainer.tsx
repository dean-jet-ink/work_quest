import { Box } from "@chakra-ui/react";
import { memo } from "react";
import { ReactNode } from "react";
import "../../../assets/css/scroll.css";
import { PrimaryContainer } from "./PrimaryContainer";

export const WorkContainer = memo((props: { children: ReactNode }) => {
  const { children } = props;

  return (
    <PrimaryContainer>
      <Box
        w="100%"
        maxW="580px"
        minH="280px"
        maxH="420px"
        h={{ md: "420px", xl: "440px" }}
        overflow="auto"
      >
        {children}
      </Box>
    </PrimaryContainer>
  );
});
