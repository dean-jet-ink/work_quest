import { memo } from "react";
import { List, ListItem, Stack } from "@chakra-ui/react";

import { User } from "../../types/user";
import { UserRow } from "../molcules/UserRow";

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
            <UserRow user={user} index={index} />
          </ListItem>
        ))}
      </Stack>
    </List>
  );
});
