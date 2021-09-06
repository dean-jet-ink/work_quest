import { memo } from "react";
import { useParams } from "react-router-dom";
import { Flex } from "@chakra-ui/react";

import { PrimaryWrapper } from "../atoms/PrimaryWrapper";
import { CheerUp } from "../molcules/CheerUp";
import { SecondaryLayout } from "../templates/SecondaryLayout";
import { users } from "../../assets/data/users";
import { Status } from "../organisms/Status";
import knight from "../../image/title/knight.png";

export const Member = memo(() => {
  const { id } = useParams<{ id: string }>();
  const user = users.find((user) => user.user_id === Number(id));

  return (
    <SecondaryLayout>
      <PrimaryWrapper>
        <Flex w="100%" p={5} align="center" justify="flex-end">
          <CheerUp userName={user!.user_name} />
        </Flex>
        <Status user={user!} titleImage={knight} />
      </PrimaryWrapper>
    </SecondaryLayout>
  );
});
