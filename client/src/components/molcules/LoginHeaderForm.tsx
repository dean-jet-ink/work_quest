import { ReactNode } from "react";
import { Flex, Heading, Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

type Props = {
  children: ReactNode;
  signup: boolean;
};

export const LoginHeaderForm = (props: Props) => {
  const { children, signup } = props;

  return (
    <Flex
      w="100vh"
      bg="gray.100"
      align="center"
      justify="center"
      textAlign="center"
      py={7}
    >
      <Box>
        <Heading as="h1">Work Quest</Heading>
        <Box py={7} px={20} spacing={20}>
          {children}
        </Box>
        {signup ? (
          <Box w="fit-content" mx="auto">
            <Link to="/">
              <Text
                fontSize="sm"
                textDecor="underline"
                _hover={{ color: "blue.400" }}
              >
                登録済みの方
              </Text>
            </Link>
          </Box>
        ) : (
          <Box w="fit-content" mx="auto">
            <Link to="/signup">
              <Text
                fontSize="sm"
                textDecor="underline"
                _hover={{ color: "blue.400" }}
              >
                新規ご登録の方
              </Text>
            </Link>
          </Box>
        )}
      </Box>
    </Flex>
  );
};
