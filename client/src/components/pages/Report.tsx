import { memo } from "react";
import { Image, Box, Text, Flex } from "@chakra-ui/react";

import { SecondaryLayout } from "../templates/SecondaryLayout";
import { PrimaryWrapper } from "../atoms/PrimaryWrapper";
import { PrimaryContainer } from "../atoms/PrimaryContainer";
import book from "../../image/report.png";
import { LineChart } from "../molcules/LineChart";
import { PieChart } from "../molcules/PieChart";
import { useReport } from "../../hooks/useReport";
import { useLoginUser } from "../../hooks/useLoginUser";
import { useWorks } from "../../hooks/useWorks";
import { Work } from "../../types/work";
import library from "../../image/library.jpg";

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

  return (
    <Box bg={`center/cover url(${library}) no-repeat`} bgAttachment="fixed">
      <Box bg="#00000052">
        <SecondaryLayout>
          <PrimaryWrapper>
            <Box position="relative">
              <Image src={book} boxSize="120px" mx="auto" />
              <Box
                position="absolute"
                w={0}
                top="60px"
                left={0}
                right={0}
                mx="auto"
                border="32px solid transparent"
                borderBottomColor="#171923"
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
                borderBottomColor="white"
                zIndex={1}
              ></Box>
              <PrimaryContainer>
                <Box px={5} py={8}>
                  <Flex align="start" flexDir={{ base: "column", lg: "row" }}>
                    <Box w={{ base: "439px", lg: "500px" }} mx="auto">
                      <Text mb={2}>一週間の戦績</Text>
                      <LineChart week={week} />
                    </Box>
                    <Box
                      mx="auto"
                      mt={{ base: 7, lg: "unset" }}
                      w={{ base: "439px", xl: "500px" }}
                    >
                      <Text mb={2}>Workの進捗内訳</Text>
                      <Box border="1px solid white" py={3} px={3} minH="300px">
                        <Box d={pieChartDisplay}>
                          <PieChart works={ongoingWorks} />
                        </Box>
                        <Flex
                          align="center"
                          justify="center"
                          h="250px"
                          d={alternativeText}
                        >
                          <Text>現在進行中のWorkはありません</Text>
                        </Flex>
                      </Box>
                    </Box>
                  </Flex>
                </Box>
              </PrimaryContainer>
            </Box>
          </PrimaryWrapper>
        </SecondaryLayout>
      </Box>
    </Box>
  );
});
