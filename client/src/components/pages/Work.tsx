import { memo } from "react";
import { Box, Flex, Text, Image } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import { PrimaryWrapper } from "../atoms/layout/PrimaryWrapper";
import { WorkContainer } from "../atoms/layout/WorkContainer";
import { AddContents } from "../molcules/button/AddContents";
import { SmallGoalList } from "../organisms/work/SmallGoalList";
import { DrawerButton } from "../molcules/display/DrawerButton";
import { TotalTime } from "../molcules/layout/TotalTime";
import { SecondaryLayout } from "../templates/layout/SecondaryLayout";
import { useSmallGoal } from "../../hooks/useSmallGoal";
import { AddSmallGoalModal } from "../organisms/work/AddSmallGoalModal";
import { CompleteSmallGoalDrawer } from "../organisms/work/CompleteSmallGoalDrawer";
import { Column } from "../molcules/layout/Column";
import { Background } from "../molcules/layout/Background";
import { PrimaryContainer } from "../atoms/layout/PrimaryContainer";
import king from "../../image/king.png";
import { useKingsLine } from "../../hooks/useKingsLine";
import { KingModal } from "../organisms/work/KingModal";
import { useDisclosures } from "../../hooks/useDisclosures";

export const Work = memo(() => {
  const { id } = useParams<{ id: string }>();
  const {
    initialValues,
    workName,
    workTotalTime,
    incompletedSmallGoals,
    completedSmallGoals,
    onSubmit,
    onClickDelete,
    onClickComplete,
    onClickBack,
    onClickUpdate,
    smallGoalValidationSchema,
  } = useSmallGoal(Number(id));
  const {
    isOpen1,
    onOpen1,
    onClose1,
    isOpen2,
    onOpen2,
    onClose2,
    isOpen3,
    onOpen3,
    onClose3,
  } = useDisclosures();
  const { line } = useKingsLine();

  return (
    <Background>
      <SecondaryLayout>
        <PrimaryWrapper>
          <Box px={{ sm: "40px" }} position="relative">
            <Box
              d={{ base: "block", md: "none" }}
              position="absolute"
              top="-13px"
              right="0"
              borderRadius="50%"
              bg="#000"
              border="3px solid white"
              _hover={{
                cursor: "pointer",
                bg: "#bfbfa4",
                borderColor: "#fffaba",
              }}
              onClick={onOpen3}
            >
              <Image src={king} boxSize="50px" borderRadius="50%" />
            </Box>
            <Box pt={{ base: "70px", md: "20px" }}>
              <Column title={workName} />
            </Box>
            <Flex
              flexDir={{ base: "column", md: "row" }}
              justify="space-between"
            >
              <Flex
                d={{ base: "none", md: "flex" }}
                align="center"
                justify="center"
                flexDir="column"
                flex="50%"
                mr={{ md: "60px" }}
              >
                <Box>
                  <Box position="relative" zIndex={1}>
                    <PrimaryContainer>
                      <Box py={3} px={6}>
                        <Text color="#d7d7d7">"{line.saying}"</Text>
                        <Text fontSize="12px" color="#989898" mt="15px">
                          - {line.who} -
                        </Text>
                        <Text mt="15px">じゃぞ。</Text>
                      </Box>
                    </PrimaryContainer>
                  </Box>
                  <Box
                    position="relative"
                    w={0}
                    top="-4px"
                    right={0}
                    left={0}
                    mx="auto"
                    border={{
                      base: "11px solid transparent",
                      lg: "16px solid transparent",
                    }}
                    borderTopColor={{ base: "#171923", lg: "#171923" }}
                    zIndex={3}
                  ></Box>
                  <Box
                    position="relative"
                    w={0}
                    top={{ base: "-24px", lg: "-34px" }}
                    right={0}
                    left={0}
                    mx="auto"
                    border={{
                      base: "15px solid transparent",
                      lg: "21px solid transparent",
                    }}
                    borderTopColor={{ base: "white", lg: "white" }}
                    zIndex={2}
                  ></Box>
                </Box>
                <Flex
                  boxSize={{ base: "210px", lg: "250px" }}
                  borderRadius="50%"
                  bg="#fefcda"
                  align="center"
                  justify="center"
                >
                  <Image src={king} boxSize={{ base: "150px", lg: "220px" }} />
                </Flex>
              </Flex>

              <Box flex={{ md: "50%" }}>
                <Flex
                  w={{ base: "110px", md: "150px" }}
                  justify="center"
                  mb="-10px"
                  position="relative"
                  zIndex={3}
                >
                  <PrimaryContainer>
                    <Box p={{ base: "5px 10px" }}>
                      <TotalTime
                        totalTime={workTotalTime}
                        color="orange"
                        fontSize="18px"
                      />
                    </Box>
                  </PrimaryContainer>
                </Flex>

                <WorkContainer>
                  <Box py={{ base: "20px", md: "30px" }} px="20px">
                    <Box mb={{ base: 5 }}>
                      <AddContents
                        contents="スモールゴールの追加"
                        onClick={onOpen1}
                      />
                    </Box>
                    {incompletedSmallGoals.length !== 0 ? (
                      <SmallGoalList
                        workId={Number(id)}
                        smallGoals={incompletedSmallGoals}
                        onClickDelete={onClickDelete}
                        onClickComplete={onClickComplete}
                        onClickUpdate={onClickUpdate}
                        validationSchema={smallGoalValidationSchema}
                      />
                    ) : (
                      <Flex align="center" justify="center" pt={5}>
                        <Text>スモールゴールを設定しましょう！</Text>
                      </Flex>
                    )}
                  </Box>
                </WorkContainer>
              </Box>
            </Flex>
            <Box pt={{ base: "20px", md: "30px" }}>
              <DrawerButton
                text={`完了したスモールゴール（${completedSmallGoals.length}）`}
                onClick={onOpen2}
              />
            </Box>
          </Box>
        </PrimaryWrapper>
        <AddSmallGoalModal
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={smallGoalValidationSchema}
          isOpen={isOpen1}
          onClose={onClose1}
        />
        <CompleteSmallGoalDrawer
          completeSmallGoals={completedSmallGoals}
          onClick={onClickBack}
          isOpen={isOpen2}
          onClose={onClose2}
        />
        <KingModal
          onClose={onClose3}
          isOpen={isOpen3}
          line={line}
          king={king}
        />
      </SecondaryLayout>
    </Background>
  );
});
