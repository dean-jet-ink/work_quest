import { memo } from "react";
import { useParams } from "react-router-dom";
import { Flex, Box, Text } from "@chakra-ui/react";

import { CheerUp } from "../molcules/button/CheerUp";
import { SecondaryLayout } from "../templates/layout/SecondaryLayout";
import { Status } from "../organisms/top/Status";
import { useUser } from "../../hooks/useUser";
import { useLoginUser } from "../../hooks/useLoginUser";
import { useCheer } from "../../hooks/useCheer";
import { Background } from "../molcules/layout/Background";
import { LineChart } from "../molcules/chart/LineChart";
import { useReport } from "../../hooks/useReport";
import { PrimaryContainer } from "../atoms/layout/PrimaryContainer";
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
  const { week, memberWeek } = useReport(loginUserId!, targetId);
  const { titleImage } = useLevelUp(user);
  const width = { base: "100%", sm: "440px", md: "440px", lg: "520px" };

  return (
    <Background>
      <SecondaryLayout>
        <Flex
          flexDir="column"
          justify="center"
          pt={{ base: "60px", sm: "75px", md: "85px" }}
          pb={{ base: "15px", sm: "30px", md: "105px" }}
          px={{ base: 2, md: 4 }}
        >
          <Flex
            flexDir={{ base: "column", lg: "row" }}
            justify="center"
            align="center"
          >
            <Box
              mb={{ base: 5, lg: "unset" }}
              w={width}
              mr={{ lg: 6 }}
              position="relative"
            >
              <Box position="absolute" top={{ base: "-52px", sm: "-59px" }}>
                <CheerUp
                  cheered={cheered}
                  onClickSubmit={onClickSubmit}
                  onClickDelete={onClickDelete}
                  prosessing={prosessing}
                />
              </Box>
              <Status user={user} titleImage={titleImage} />
            </Box>
            <Box
              maxW={{ md: "600px" }}
              w={{ base: "100%", sm: "440px", lg: "600px" }}
            >
              <PrimaryContainer>
                <Flex
                  flexDir="column"
                  justify="center"
                  px={5}
                  pb={8}
                  pt={{ base: 4 }}
                  h={{ md: "430px" }}
                >
                  <Text mb={2} mt={{ md: "10px" }}>
                    一週間の戦績
                  </Text>
                  <LineChart week={memberWeek} myWeek={week} />
                </Flex>
              </PrimaryContainer>
            </Box>
          </Flex>
        </Flex>
      </SecondaryLayout>
    </Background>
  );
});
