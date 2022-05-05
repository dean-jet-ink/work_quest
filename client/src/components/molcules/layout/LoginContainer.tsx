import { ReactNode } from "react";
import { Flex, Box, Text, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import logo from "../../../assets/image/workquest_logo.svg";

type Props = {
  children: ReactNode;
  signup: boolean;
  color: string;
};

export const LoginContainer = (props: Props) => {
  const { children, signup, color } = props;

  return (
    <Flex
      w="100%"
      flexDir="column"
      align="center"
      justify="center"
      textAlign="center"
      py={7}
      px={3}
      border={`2px solid ${color}`}
      borderRadius={5}
    >
      <Box w="100%">
        <Image
          src={logo}
          w={{ base: "225px", sm: "260px", lg: "350px", xl: "375px" }}
          mx="auto"
          mb={{ base: "15px", lg: "30px" }}
        />
        <Box py={7} spacing={20} w="100%" mx="auto">
          {children}
        </Box>
        {signup ? (
          <Box w="fit-content" mx="auto">
            <Link to="/">
              <Text
                fontSize="sm"
                textDecor="underline"
                _hover={{ color: "orange" }}
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
                _hover={{ color: "orange" }}
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
