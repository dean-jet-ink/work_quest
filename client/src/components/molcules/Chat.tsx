import { memo } from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";

import { User } from "../../types/user";
import { useDefaultPicture } from "../../hooks/useDefaultPicutre";

type Props = {
  loginUserId: number;
  userId: number;
  members: User[];
  children: string;
};

type RightOrLeftProps = {
  flexDir: "row" | "row-reverse";
  pr: "0" | "22px";
  pl: "0" | "22px";
  borderRightColor: "white" | "transparent";
  borderLeftColor: "#d4f3c0" | "transparent";
  right: "-18px" | "auto";
  left: "-18px" | "auto";
  bg: "#d4f3c0" | "white";
};

export const Chat = memo((props: Props) => {
  const { loginUserId, userId, members, children } = props;
  const user = members.find((member) => member.user_id === userId);
  const { inspectedPicture } = useDefaultPicture(user!.picture, "member/");
  const rightOrLeft: RightOrLeftProps =
    loginUserId == user?.user_id
      ? {
          flexDir: "row-reverse",
          pr: "0",
          pl: "22px",
          borderRightColor: "transparent",
          borderLeftColor: "#d4f3c0",
          right: "-18px",
          left: "auto",
          bg: "#d4f3c0",
        }
      : {
          flexDir: "row",
          pr: "22px",
          pl: "0",
          borderRightColor: "white",
          borderLeftColor: "transparent",
          right: "auto",
          left: "-18px",
          bg: "white",
        };

  return (
    <Flex mb={4} flexDir={rightOrLeft.flexDir}>
      <Box pt="8px" px={5}>
        <Box boxSize="45px" bg="white" borderRadius="50%" textAlign="center">
          <Image src={inspectedPicture} w="45px" h="45px" borderRadius="50%" />
        </Box>
      </Box>
      <Box position="relative" pr={rightOrLeft.pr} pl={rightOrLeft.pl}>
        <Text fontSize="10px" mb={1} fontWeight="bold">
          {user?.user_name}
        </Text>
        <Box
          border="9px solid transparent"
          borderRightColor={rightOrLeft.borderRightColor}
          borderLeftColor={rightOrLeft.borderLeftColor}
          position="absolute"
          top="25px"
          right={rightOrLeft.right}
          left={rightOrLeft.left}
        ></Box>
        <Box
          bg={rightOrLeft.bg}
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
  );
});
