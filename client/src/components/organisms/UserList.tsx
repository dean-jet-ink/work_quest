import { memo } from "react";
import { List, Stack } from "@chakra-ui/react";

import { User } from "../../types/user";
import { UserRow } from "../molcules/UserRow";

type Props = {
  users: User[];
  isRanking?: boolean;
};

export const UserList = memo((props: Props) => {
  const { users, isRanking } = props;

  return (
    <List w="100%" px={{ base: 2, lg: 5 }} py={7} minH="50vh">
      <Stack spacing={2}>
        {users.map((user, index) => (
          <UserRow
            key={user.userId}
            user={user}
            index={index}
            isRanking={isRanking}
          />
        ))}
      </Stack>
    </List>
  );
});
