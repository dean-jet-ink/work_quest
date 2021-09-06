import { Box, Text } from "@chakra-ui/react";

import { User } from "../../types/user";
import { UserList } from "../organisms/UserList";
import { PrimaryDrawer } from "../molcules/PrimaryDrawer";

type Props = {
  users: Array<User>;
  onClose: () => void;
  isOpen: boolean;
};

export const CheeredOnDrawer = (props: Props) => {
  const { users, onClose, isOpen } = props;

  return (
    <PrimaryDrawer onClose={onClose} isOpen={isOpen} placement="right">
      <Box bg="#f0e8d8" minH="100vh" py={10} textAlign="center">
        <Text fontWeight="bold" color="#b85032">
          応援してくれたユーザー
        </Text>
        <UserList users={users} />
      </Box>
    </PrimaryDrawer>
  );
};
