import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  color: string;
};

export const LoginWrapper = (props: Props) => {
  const { children, color } = props;

  return (
    <Flex
      minH={{ base: "600px", sm: "700px", lg: "720px" }}
      bg="gray.800"
      p={5}
      color={color}
    >
      {children}
    </Flex>
  );
};
