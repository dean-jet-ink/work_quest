import { memo } from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";

import { User } from "../../../types/user";
import moment from "moment";
import { useFile } from "../../../hooks/useFile";

type Props = {
  loginUserId: number;
  members: User[];
  chat: {
    userId: number;
    guildId: number;
    chatId: number;
    comment: string;
    time: string;
  };
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

export const Chats = memo((props: Props) => {
  const { loginUserId, members, chat } = props;
  chat.time = moment(chat.time).format("YYYY/MM/DD HH:mm");
  const user = members.find((member) => member.userId === chat.userId);
  const { file } = useFile({ key: "member", picture: user!.picture });
  const imageSize = {
    base: "45px",
    md: "50px",
    lg: "60px",
  };
  const rightOrLeft: RightOrLeftProps =
    loginUserId === user?.userId
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
        <Box
          boxSize={imageSize}
          bg="white"
          borderRadius="50%"
          textAlign="center"
        >
          <Image src={file} boxSize={imageSize} borderRadius="50%" />
        </Box>
      </Box>
      <Box position="relative" pr={rightOrLeft.pr} pl={rightOrLeft.pl}>
        <Text fontSize={{ base: "10px", md: "12px" }} mb={1} fontWeight="bold">
          {user?.userName}
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
          <Text
            color="#3e3e3e"
            fontWeight="bold"
            fontSize={{ base: "12px", md: "14px", lg: "16px" }}
            whiteSpace="pre-wrap"
          >
            {chat.comment}
          </Text>
        </Box>
        <Text color="#d5d5d5" fontSize={{ base: "12px" }}>
          {chat.time}
        </Text>
      </Box>
    </Flex>
  );
});
