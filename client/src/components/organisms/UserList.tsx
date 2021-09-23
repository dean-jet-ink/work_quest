import { memo } from "react";
import { List, ListItem, Stack } from "@chakra-ui/react";

import { User } from "../../types/user";
import { UserRow } from "../molcules/UserRow";

type Props = {
  users: User[];
};

export const UserList = memo((props: Props) => {
  const { users } = props;

  return (
    <List w="100%" px={5} py={7} minH="50vh">
      <Stack spacing={2}>
        {users.map((user, index) => (
          <UserRow key={user.user_id} user={user} index={index} />
        ))}
      </Stack>
    </List>
  );
});
