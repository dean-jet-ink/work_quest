import { useCallback } from "react";
import { Flex, Image, Text, ListItem, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { TotalTime } from "./TotalTime";
import { User } from "../../../types/user";
import { useLoginUser } from "../../../hooks/useLoginUser";
import { useFile } from "../../../hooks/useFile";

import rank1 from "../../../assets/image/rank1.png";
import rank2 from "../../../assets/image/rank2.png";
import rank3 from "../../../assets/image/rank3.png";

type Props = {
  user: User;
  index: number;
  isRanking?: boolean;
  bg: string;
};

export const UserRow = (props: Props) => {
  const { loginUserId } = useLoginUser();
  const { user, index, isRanking = false, bg } = props;
  const { file } = useFile({ key: "member", picture: user.picture });
  const noLink = loginUserId === user.userId ? "none" : "auto"; //リストの自分の行はリンク無効
  const border = loginUserId === user.userId ? "3px solid #dadada" : "none"; //リストの自分の行はborder表示
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
  }, []); //ランキングページにおいて、順位が3位以内ならばその順位の王冠表示
  const rank = place(index);
  const numberDisplay = isRanking && rank === "unset" ? "block" : "none";

  return (
    <ListItem
      h={{ base: "70px" }}
      bg={bg}
      border={border}
      px={{ base: 4 }}
      borderRadius="4px"
    >
      <Link to={`/top/member/${user.userId}`} style={{ pointerEvents: noLink }}>
        <Flex align="center" justify="space-between" h="100%" fontWeight="bold">
          <Flex align="center" justify="start" w="50%">
            <Box w="22px" position="relative" mr={{ base: 3 }} d={ranking}>
              <Image
                src={rank}
                position="absolute"
                maxW="unset"
                w="38px"
                top="-18px"
                left="-10px"
              />
              <Text d={numberDisplay} color="#9e9383" fontSize="14px">
                {index + 1}
              </Text>
            </Box>
            <Image src={file} boxSize="50px" borderRadius="50%" mr={2} />
            <Flex
              fontSize={{ base: "12px", lg: "15px" }}
              align="start"
              flexDir="column"
              ml={{ base: 2, lg: 6 }}
            >
              <Text>{user.userName}</Text>
              <Text>Lv.{user.level}</Text>
            </Flex>
          </Flex>
          <Flex
            align="center"
            justify="space-around"
            w={{ base: "147px", md: "200px" }}
            fontSize={{ base: "12px", lg: "15px" }}
          >
            <Text>{user.title}</Text>
            <Box>
              <TotalTime totalTime={user.totalTime} />
            </Box>
          </Flex>
        </Flex>
      </Link>
    </ListItem>
  );
};
