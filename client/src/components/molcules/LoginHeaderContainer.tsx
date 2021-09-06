import { Flex } from "@chakra-ui/react";
import { ReactNode, VFC } from "react";

export const LoginHeaderContainer: VFC<{ children: ReactNode }> = (props) => {
  const { children } = props;

  return (
    <Flex
      h="600px"
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
