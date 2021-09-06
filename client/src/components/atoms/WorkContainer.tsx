import { Box } from "@chakra-ui/react";
import { memo } from "react";
import { ReactNode } from "react";

export const WorkContainer = memo((props: { children: ReactNode }) => {
  const { children } = props;

  return (
    <Box
      bg="#c2b593"
      minHeight="280px"
      borderColor="#594a34"
      borderWidth="3px"
      borderRadius="md"
      boxShadow="inset 0px 2px 11px 0px rgb(0 0 0 / 30%)"
    >
      {children}
    </Box>
  );
});
