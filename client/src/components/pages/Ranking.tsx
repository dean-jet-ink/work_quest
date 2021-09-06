import { memo } from "react";
import { Flex, Image } from "@chakra-ui/react";

import { SecondaryLayout } from "../templates/SecondaryLayout";
import { users } from "../../assets/data/users";
import { UserList } from "../organisms/UserList";
import coronation from "../../image/coronation.jpg";

export const Ranking = memo(() => {
  return (
    <SecondaryLayout>
      <Image src={coronation} mt={4} w="100%" h="215px" />
      <Flex h="100vh">
        <UserList users={users} />
      </Flex>
    </SecondaryLayout>
  );
});
