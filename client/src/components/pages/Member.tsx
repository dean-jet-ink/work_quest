import { memo } from "react";
import { useParams } from "react-router-dom";
import { Flex } from "@chakra-ui/react";

import { PrimaryWrapper } from "../atoms/PrimaryWrapper";
import { CheerUp } from "../molcules/CheerUp";
import { SecondaryLayout } from "../templates/SecondaryLayout";
import { Status } from "../organisms/Status";
import knight from "../../image/title/knight.png";
import { useFetchUser } from "../../hooks/useFetchUser";
import { useLoginUser } from "../../hooks/useLoginUser";
import { useCheer } from "../../hooks/useCheer";

export const Member = memo(() => {
  const { loginUserId } = useLoginUser();
  const { id } = useParams<{ id: string }>();
  const targetId = Number(id);
  const { user } = useFetchUser(targetId);
  const { cheered, prosessing, onClickSubmit, onClickDelete } = useCheer(
    loginUserId!,
    targetId,
    user.userName
  );

  return (
    <SecondaryLayout>
      <PrimaryWrapper>
        <Flex w="100%" p={5} align="center" justify="flex-end">
          <CheerUp
            cheered={cheered}
            onClickSubmit={onClickSubmit}
            onClickDelete={onClickDelete}
            prosessing={prosessing}
          />
        </Flex>
        <Status user={user} titleImage={knight} />
      </PrimaryWrapper>
    </SecondaryLayout>
  );
});
