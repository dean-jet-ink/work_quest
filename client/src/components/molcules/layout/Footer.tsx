import { Box, Flex, Text } from "@chakra-ui/react";
import { memo } from "react";

export const Footer = memo(() => {
  return (
    <>
      <Box h="35px" bg="gray.800">
        <Flex h="100%" align="center" justify="center">
          <Text color="#a4a4a4" fontSize={{ base: "12px", sm: "14px" }}>
            Copyright Kenta All right reserved.
          </Text>
        </Flex>
      </Box>
    </>
  );
});
