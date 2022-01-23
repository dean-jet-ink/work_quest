import { useCallback } from "react";
import { Flex, Image, Text, ListItem, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { TotalTime } from "./TotalTime";
import { User } from "../../types/user";
import { useDefaultPicture } from "../../hooks/useDefaultPicutre";
import { useLoginUser } from "../../hooks/useLoginUser";
import rank1 from "../../image/rank1.png";
import rank2 from "../../image/rank2.png";
import rank3 from "../../image/rank3.png";

type Props = {
  user: User;
  index: number;
  isRanking?: boolean;
};

export const UserRow = (props: Props) => {
  const { loginUserId } = useLoginUser();
  const { user, index, isRanking = false } = props;
  const { inspectedPicture } = useDefaultPicture(user.picture, "member/");
  const noLink = loginUserId === user.userId ? "none" : "auto"; //リストの自分の行はリンク無効
  const bgColor = loginUserId === user.userId ? "#f38484b5" : "#ede5adb5"; //リストの自分の行は背景色変更
  const ranking = isRanking ? "block" : "none";
  const place = useCallback((index: number): string => {
    switch (true) {
      case index + 1 === 1:
        return rank1;
      case index + 1 === 2:
        return rank2;
      case index + 1 === 3:
        return rank3;
      default:
        return "unset";
    }
  }, []); //ランキングページにおいて、順位が3位以内ならば王冠表示
  const rank = place(index);

  return (
    <ListItem
      h={{ base: "70px" }}
      bg={bgColor}
      px={{ base: 4 }}
      borderRadius="4px"
    >
      <Link to={`/top/member/${user.userId}`} style={{ pointerEvents: noLink }}>
        <Flex align="center" justify="space-between" h="100%">
          <Flex align="center" justify="start" w="50%">
            <Box
              position="relative"
              mr={{ base: 3 }}
              fontWeight="bold"
              color="#785117"
              d={ranking}
            >
              <Image
                src={rank}
                position="absolute"
                maxW="unset"
                w="60px"
                top="-15px"
                left="-26px"
              />
              <Text w="5%" d={ranking}>
                {index + 1}
              </Text>
            </Box>
            <Image
              src={inspectedPicture}
              boxSize="50px"
              borderRadius="50%"
              mr={2}
            />
            <Flex
              fontSize={{ base: "12px", lg: "15px" }}
              align="start"
              flexDir="column"
              ml={{ base: 2, lg: 6 }}
            >
              <Text fontWeight="bold">{user.userName}</Text>
              <Text fontWeight="bold">Lv.{user.level}</Text>
            </Flex>
          </Flex>
          <Flex align="center" w={{ base: "147px", md: "200px" }}>
            <Flex
              textAlign="center"
              justify="center"
              align="center"
              w={{ base: "70px", md: "100px" }}
              bg="red.500"
              borderRadius="md"
              mr={{ md: 2 }}
              py={{ base: 1, md: "8px" }}
            >
              <Text fontWeight="bold" fontSize="15px" color="white">
                {user.title}
              </Text>
            </Flex>
            <Box fontSize={{ lg: "18px" }}>
              <TotalTime totalTime={user.totalTime} fontSize="inherit" />
            </Box>
          </Flex>
        </Flex>
      </Link>
    </ListItem>
  );
};
