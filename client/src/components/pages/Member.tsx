import { memo } from "react";
import { useParams } from "react-router-dom";
import { Flex, Box, Text } from "@chakra-ui/react";

import { PrimaryWrapper } from "../atoms/PrimaryWrapper";
import { CheerUp } from "../molcules/CheerUp";
import { SecondaryLayout } from "../templates/SecondaryLayout";
import { Status } from "../organisms/Status";
import { useUser } from "../../hooks/useUser";
import { useLoginUser } from "../../hooks/useLoginUser";
import { useCheer } from "../../hooks/useCheer";
import { BackgroundCity } from "../molcules/BackgroundCity";
import { LineChart } from "../molcules/LineChart";
import { useReport } from "../../hooks/useReport";
import { PrimaryContainer } from "../atoms/PrimaryContainer";
import { useLevelUp } from "../../hooks/useLevelup";

export const Member = memo(() => {
  const { loginUserId } = useLoginUser();
  const { id } = useParams<{ id: string }>();
  const targetId = Number(id);
  const { user } = useUser(targetId);
  const { cheered, prosessing, onClickSubmit, onClickDelete } = useCheer(
    loginUserId!,
    targetId,
    user.userName
  );
  const { week } = useReport(loginUserId as number);
  const { titleImage } = useLevelUp(user);

  return (
    <BackgroundCity>
      <SecondaryLayout>
        <PrimaryWrapper>
          <Box w={{ base: "450px", md: "600px", lg: "auto" }} mx="auto">
            <Flex w="100%" p={5} align="center" justify="flex-end">
              <CheerUp
                cheered={cheered}
                onClickSubmit={onClickSubmit}
                onClickDelete={onClickDelete}
                prosessing={prosessing}
              />
            </Flex>
            <Flex
              flexDir={{ base: "column", lg: "row" }}
              justify="space-between"
            >
              <Box
                mb={{ base: 5, lg: "unset" }}
                w={{ lg: "50%" }}
                mr={{ lg: 5 }}
              >
                <Status user={user} titleImage={titleImage} />
              </Box>
              <Box w={{ lg: "50%" }}>
                <PrimaryContainer>
                  <Box
                    px={5}
                    pb={8}
                    pt={{ base: 8, lg: "100px" }}
                    h={{ lg: "474px", xl: "521px" }}
                  >
                    <Text mb={2}>一週間の戦績</Text>
                    <LineChart week={week} />
                  </Box>
                </PrimaryContainer>
              </Box>
            </Flex>
          </Box>
        </PrimaryWrapper>
      </SecondaryLayout>
    </BackgroundCity>
  );
});
