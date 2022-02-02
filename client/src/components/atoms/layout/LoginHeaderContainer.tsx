import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

export const LoginHeaderContainer = (props: { children: ReactNode }) => {
  const { children } = props;

  return (
    <Flex
      h={{ base: "600px", md: "700px", lg: "720px" }}
      bg="gray.800"
      py={20}
      position="relative"
      justify="center"
      align="center"
    >
      {children}
    </Flex>
  );
};
