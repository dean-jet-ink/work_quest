import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { TotalTime } from "./TotalTime";
import { User } from "../../types/user";
import { useDefaultPicture } from "../../hooks/useDefaultPicutre";

type Props = {
  user: User;
  index: number;
};

export const UserRow = (props: Props) => {
  const { user, index } = props;
  const { inspectedPicture } = useDefaultPicture(user.picture, "member/");
  console.log(inspectedPicture);

  return (
    <Link to={`/top/member/${user.user_id}`}>
      <Flex align="center">
        <Text w="5%">{index + 1}</Text>
        <Flex align="center" justify="start" w="50%">
          <Image
            src={inspectedPicture}
            boxSize="50px"
            borderRadius="50%"
            mr={2}
          />
          <Flex align="center">
            <Text fontWeight="bold" mr={2} w="35px" fontSize="12px">
              Lv.
              {user.level}
            </Text>
            <Text fontSize="12px" fontWeight="bold">
              {user.user_name}
            </Text>
          </Flex>
        </Flex>
        <Flex justify="center" w="30%">
          <Flex
            textAlign="center"
            justify="center"
            alignItems="center"
            w="70px"
            h="22px"
            bg="red.500"
            borderRadius="md"
          >
            <Text fontWeight="bold" fontSize="12px" color="white">
              {user.title}
            </Text>
          </Flex>
        </Flex>
        <Flex justify="start" w="5%">
          <TotalTime totalTime={user.total_time} color="orange" />
        </Flex>
      </Flex>
    </Link>
  );
};
