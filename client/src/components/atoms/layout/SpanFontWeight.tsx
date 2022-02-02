import { Box } from "@chakra-ui/react";
import { memo } from "react";

export const SpanFontWeight = memo((props: { children: string }) => {
  const { children } = props;

  return (
    <Box as="span" fontWeight="bold">
      {children}
    </Box>
  );
});
