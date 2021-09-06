import { memo } from "react";
import { Box, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import { PrimaryWrapper } from "../atoms/PrimaryWrapper";
import { WorkContainer } from "../atoms/WorkContainer";
import { ColumnTitle } from "../molcules/ColumnTitle";
import { AddContents } from "../molcules/AddContents";
import { SmallGoalList } from "../molcules/SmallGoalList";
import { DrawerButton } from "../molcules/DrawerButton";
import { TotalTime } from "../molcules/TotalTime";
import { SecondaryLayout } from "../templates/SecondaryLayout";
import { useSmallGoal } from "../../hooks/useSmallGoal";
import { Dialog } from "../molcules/Dialog";
import { useDisclosureDelete } from "../../hooks/useDisclosureDelete";
import { AddSmallGoalModal } from "../organisms/AddSmallGoalModal";
import { CompleteSmallGoalDrawer } from "../organisms/CompleteSmallGoalDrawer";
import { useDisclosureComplete } from "../../hooks/useDisclosureComplete";

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
  } = useSmallGoal(Number(id));
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpenComplete, onOpenComplete, onCloseComplete } =
    useDisclosureComplete();

  return (
    <SecondaryLayout>
      <PrimaryWrapper>
        <Box pt={8}>
          <ColumnTitle title={workName} />
        </Box>
        <Flex py={{ base: 3, md: 6 }} px={{ base: 2 }}>
          <TotalTime totalTime={workTotalTime} color="orange" fontSize="18px" />
        </Flex>
        <WorkContainer>
          <Box p={{ base: 4 }}>
            <AddContents contents="スモールゴールの追加" onClick={onOpen} />
            <Box mt={3}>
              {incompletedSmallGoals.length != 0 ? (
                <SmallGoalList
                  smallGoals={incompletedSmallGoals}
                  onClickDelete={onClickDelete}
                  onClickComplete={onClickComplete}
                />
              ) : (
                <Flex align="center" justify="center" pt={5}>
                  <Text>スモールゴールを設定しましょう！</Text>
                </Flex>
              )}
            </Box>
          </Box>
        </WorkContainer>
        <DrawerButton
          text={`完了したスモールゴール（${completedSmallGoals.length}）`}
          onClick={onOpenComplete}
        />
      </PrimaryWrapper>
      <AddSmallGoalModal
        initialValues={initialValues}
        onSubmit={onSubmit}
        isOpen={isOpen}
        onClose={onClose}
      />
      <CompleteSmallGoalDrawer
        completeSmallGoals={completedSmallGoals}
        onClick={onClickBack}
        isOpen={isOpenComplete}
        onClose={onCloseComplete}
      />
    </SecondaryLayout>
  );
});
