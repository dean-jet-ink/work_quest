import { Box, Text } from "@chakra-ui/react";

import { PrimaryContainer } from "../atoms/PrimaryContainer";

export const LineOfChara = (props: { line: string }) => {
  const { line } = props;

  return (
    <Box position="absolute" top="35px" left={{ base: "10px", sm: "30px" }}>
      <PrimaryContainer>
        <Box p={3} position="relative" w={{ base: "155px" }}>
          <Box
            position="absolute"
            w={0}
            top="10px"
            left={{ base: "155px", sm: "192px" }}
            right={0}
            mx="auto"
            border="11px solid transparent"
            borderLeftColor="#171923"
            zIndex={2}
          ></Box>
          <Box
            position="absolute"
            w={0}
            top="6px"
            left={{ base: "155px", sm: "192px" }}
            right={0}
            mx="auto"
            border="15px solid transparent"
            borderLeftColor="white"
            zIndex={1}
          ></Box>
          <Text fontSize={{ base: "10px", sm: "14px" }}>{line}</Text>
        </Box>
      </PrimaryContainer>
    </Box>
  );
};
