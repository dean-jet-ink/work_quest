import { memo } from "react";
import { Image, Box, Text, Flex } from "@chakra-ui/react";

import { PrimaryWrapper } from "../atoms/layout/PrimaryWrapper";
import { PrimaryContainer } from "../atoms/layout/PrimaryContainer";
import { LineChart } from "../molcules/chart/LineChart";
import { PieChart } from "../molcules/chart/PieChart";
import { SecondaryLayout } from "../templates/layout/SecondaryLayout";
import { useReport } from "../../hooks/useReport";
import { useLoginUser } from "../../hooks/useLoginUser";
import { useWorks } from "../../hooks/useWorks";
import { Work } from "../../types/work";

import book from "../../assets/image/report.png";
import library from "../../assets/image/library.jpg";

export const Report = memo(() => {
  const { loginUserId } = useLoginUser();
  const { week } = useReport(loginUserId as number);
  const { incompleteWorks } = useWorks(loginUserId as number);
  const ongoingWorks: Work[] = [];
  incompleteWorks.forEach((work) => {
    if (work.totalTime > 0) {
      ongoingWorks.push(work);
    }
  });
  const pieChartDisplay = ongoingWorks.length > 0 ? "block" : "none";
  const alternativeText = ongoingWorks.length > 0 ? "none" : "block";
  const chartWidth = { base: "315px", sm: "425px", lg: "500px" };
  const fontSize = { lg: "18px" };

  return (
    <Box bg={`center/cover url(${library}) no-repeat`} bgAttachment="fixed">
      <Box bg="#00000052">
        <SecondaryLayout>
          <PrimaryWrapper>
            <Box
              position="relative"
              maxW={{ sm: "480px", md: "580px", lg: "630px" }}
              mx="auto"
            >
              <Image src={book} boxSize="120px" mx="auto" />
              <Box
                position="absolute"
                w={0}
                top="61px"
                left={0}
                right={0}
                mx="auto"
                border="32px solid transparent"
                borderBottomColor="#191e2b"
                zIndex={2}
              ></Box>
              <Box
                position="absolute"
                w={0}
                top="48px"
                left={0}
                right={0}
                mx="auto"
                border="38px solid transparent"
                borderBottomColor="inherit"
                zIndex={1}
              ></Box>
              <PrimaryContainer>
                <Box px={5} py={8}>
                  <Box w={chartWidth} mx="auto">
                    <Text mb={2} fontSize={fontSize}>
                      一週間の戦績
                    </Text>
                    <LineChart week={week} />
                  </Box>
                  <Box mx="auto" mt={{ base: 7 }} w={chartWidth}>
                    <Text mb={2} fontSize={fontSize}>
                      Workの進捗内訳
                    </Text>
                    <Box border="1px solid #e9e4e4" py={3} px={3} minH="300px">
                      <Box d={pieChartDisplay}>
                        <PieChart works={ongoingWorks} />
                      </Box>
                      <Flex
                        align="center"
                        justify="center"
                        h="250px"
                        d={alternativeText}
                      >
                        <Text fontSize={fontSize}>
                          現在進行中のWorkはありません
                        </Text>
                      </Flex>
                    </Box>
                  </Box>
                </Box>
              </PrimaryContainer>
            </Box>
          </PrimaryWrapper>
        </SecondaryLayout>
      </Box>
    </Box>
  );
});
