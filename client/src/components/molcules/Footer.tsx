import { Box, Flex, Text } from "@chakra-ui/react";
import { memo } from "react";

export const Footer = memo(() => {
  return (
    <>
      <Box h="60px" bgColor="gray.800">
        <Flex h="100%" align="center" justify="center">
          <Text color="gray.300">Copyright Kenta All right reserved.</Text>
        </Flex>
      </Box>
    </>
  );
});
