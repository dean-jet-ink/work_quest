import { memo } from "react";
import {
  Flex,
  List,
  ListItem,
  Image,
  Text,
  Stack,
  Box,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";
import { TotalTime } from "../molcules/TotalTime";
import { User } from "../../types/user";

type Props = {
  users: Array<User>;
};

export const UserList = memo((props: Props) => {
  const { users } = props;

  return (
    <List w="100%" px={5} py={7}>
      <Stack spacing={2}>
        {users.map((user, index) => (
          <ListItem key={user.user_id} h={{ base: "70px" }}>
            <Link to={`/top/member/${user.user_id}`}>
              <Flex align="center">
                <Text w="5%">{index + 1}</Text>
                <Flex align="center" justify="start" w="50%">
                  <Image
                    src={user.picture}
                    w="50px"
                    borderRadius="full"
                    mr={2}
                  />
                  <Flex align="center">
                    <Text fontWeight="bold" mr={2} w="35px" fontSize="12px">
                      <Box as="span" fontWeight="normal">
                        Lv.
                      </Box>
                      21
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
          </ListItem>
        ))}
      </Stack>
    </List>
  );
});
