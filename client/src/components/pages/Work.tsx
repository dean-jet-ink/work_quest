import { memo } from "react";
import { Box, Flex, Text, Image, Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import { PrimaryWrapper } from "../atoms/layout/PrimaryWrapper";
import { WorkContainer } from "../atoms/layout/WorkContainer";
import { AddContents } from "../molcules/button/AddContents";
import { DrawerButton } from "../molcules/display/DrawerButton";
import { TotalTime } from "../molcules/layout/TotalTime";
import { LineOfChara } from "../molcules/layout/LineOfChara";
import { Background } from "../molcules/layout/Background";
import { SmallGoalList } from "../organisms/work/SmallGoalList";
import { AddSmallGoalModal } from "../organisms/work/AddSmallGoalModal";
import { CompleteSmallGoalDrawer } from "../organisms/work/CompleteSmallGoalDrawer";
import { SecondaryLayout } from "../templates/layout/SecondaryLayout";
import { useSmallGoal } from "../../hooks/useSmallGoal";
import { useGreatmansLine } from "../../hooks/useGreatmansLine";
import { useDisclosures } from "../../hooks/useDisclosures";

import kanban from "../../assets/image/wood_kanban.png";

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
  const { isOpen1, onOpen1, onClose1, isOpen2, onOpen2, onClose2 } =
    useDisclosures();
  const { line } = useGreatmansLine();

  return (
    <Background>
      <SecondaryLayout>
        <PrimaryWrapper>
          <Box px={{ sm: "40px" }} position="relative">
            <Flex align="center" justify="center" mb={4}>
              <Image src={kanban} boxSize={{ base: "75px", lg: "90px" }} />
              <Box ml={2} maxW="400px">
                <LineOfChara
                  line={
                    <>
                      <Text
                        color="#d7d7d7"
                        fontSize={{ base: "12px", md: "13px" }}
                      >
                        "{line.saying}"
                      </Text>
                      <Text fontSize="12px" color="#989898" mt={1}>
                        - {line.who} -
                      </Text>
                    </>
                  }
                  position="left"
                  width="fit-content"
                />
              </Box>
            </Flex>

            <Box w="100%" maxW="580px" mx="auto">
              <WorkContainer>
                <Box py={{ base: "20px", md: "30px" }} px="20px" minH="360px">
                  <Flex
                    justify="space-between"
                    align="center"
                    borderBottom="1px solid #dbdbdb6b"
                    pb="15px"
                    mb="18px"
                  >
                    <Heading fontSize="23px" fontWeight="normal">
                      {workName}
                    </Heading>
                    <TotalTime totalTime={workTotalTime} />
                  </Flex>
                  <AddContents
                    contents="スモールゴールの追加"
                    onClick={onOpen1}
                    color="#c5d198fc"
                  />
                  <Box mt={3}>
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
                        <Text fontSize={{ base: "12px", sm: "14px" }}>
                          スモールゴールを設定しましょう
                        </Text>
                      </Flex>
                    )}
                  </Box>
                </Box>
              </WorkContainer>
            </Box>

            <Flex w="100%" justify="center">
              <Box w="100%" maxW="580px" pt={{ base: "20px", md: "30px" }}>
                <DrawerButton
                  text={`完了したスモールゴール（${completedSmallGoals.length}）`}
                  onClick={onOpen2}
                />
              </Box>
            </Flex>
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
      </SecondaryLayout>
    </Background>
  );
});
