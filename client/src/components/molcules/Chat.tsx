import { memo } from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";

import { User } from "../../types/user";
import userDefault from "../../image/user_default.png";

type Props = {
  user: User;
  children: string;
};

export const Chat = memo((props: Props) => {
  const { user, children } = props;

  return (
    <>
      {user.user_id != 2 ? (
        <Flex mb={4}>
          <Box pt="8px" px={5}>
            <Box
              boxSize="45px"
              bg="white"
              borderRadius="50%"
              textAlign="center"
            >
              <Image
                src={user.picture ? user.picture : userDefault}
                w="45px"
                h="45px"
                borderRadius="50%"
              />
            </Box>
          </Box>
          <Box position="relative" pr="22px">
            <Text fontSize="10px" mb={1} fontWeight="bold">
              {user.user_name}
            </Text>
            <Box
              border="9px solid transparent"
              borderRightColor="white"
              position="absolute"
              top="25px"
              left="-18px"
            ></Box>
            <Box
              bg="white"
              borderRadius="md"
              px={3}
              py={2}
              shadow="2px 2px 5px 0px rgba(0 0 0 / 0.3)"
            >
              <Text fontWeight="bold" fontSize="12px">
                {children}
              </Text>
            </Box>
          </Box>
        </Flex>
      ) : (
        <Flex mb={4} flexDirection="row-reverse">
          <Box pt="8px" px={5}>
            <Box
              boxSize="45px"
              bg="white"
              borderRadius="50%"
              textAlign="center"
            >
              <Image
                src={user.picture ? user.picture : userDefault}
                w="45px"
                h="45px"
                borderRadius="50%"
              />
            </Box>
          </Box>
          <Box position="relative" pl="22px">
            <Text fontSize="10px" mb={1} fontWeight="bold" textAlign="end">
              {user.user_name}
            </Text>
            <Box
              border="9px solid transparent"
              borderLeftColor="white"
              position="absolute"
              top="25px"
              right="-18px"
            ></Box>
            <Box
              bg="white"
              borderRadius="md"
              px={3}
              py={2}
              shadow="2px 2px 5px 0px rgba(0 0 0 / 0.3)"
            >
              <Text fontWeight="bold" fontSize="12px">
                {children}
              </Text>
            </Box>
          </Box>
        </Flex>
      )}
    </>
  );
});
