import { Flex, Text, Button, Box } from "@chakra-ui/react";

import { DrawerContainer } from "../../molcules/display/DrawerContainer";
import { TotalTime } from "../../molcules/layout/TotalTime";
import { SmallGoal } from "../../../types/smallGoal";
import { useSoundEffect } from "../../../hooks/useSoundEffect";

import goalFlag from "../../../assets/image/goalFlag.png";
import cancel from "../../../assets/audio/cancel.mp3";

type Props = {
  completeSmallGoals: Array<SmallGoal>;
  onClose: () => void;
  onClick: (id: number, index: number) => void;
  isOpen: boolean;
};

export const CompleteSmallGoalDrawer = (props: Props) => {
  const { completeSmallGoals, onClose, onClick, isOpen } = props;
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [soundEffect, onClickPlaySoundEffect] = useSoundEffect(cancel);

  return (
    <DrawerContainer
      onClose={onClose}
      isOpen={isOpen}
      image={goalFlag}
      closeButtonColor="white"
    >
      {completeSmallGoals.length !== 0 ? (
        completeSmallGoals.map((smallGoal, index) => (
          <Flex
            align="center"
            justify="space-between"
            key={smallGoal.id}
            fontSize={{ base: "14px", sm: "15px", md: "16px", lg: "18px" }}
          >
            <Text>{smallGoal.smallGoalName}</Text>
            <Flex justify="center" align="center">
              <Box mr={4}>
                <TotalTime totalTime={smallGoal.totalTime} />
              </Box>
              <Button
                bg="transparent"
                w="30%"
                p="0"
                _hover={{ bg: "unset", color: "orange" }}
                _focus={{
                  boxShadow: "unset",
                }}
                _active={{ bg: "unset" }}
                onClick={() => {
                  onClick(smallGoal.id, index);
                  onClickPlaySoundEffect();
                }}
              >
                もどす
              </Button>
            </Flex>
          </Flex>
        ))
      ) : (
        <Flex justify="center" p={6}>
          <Text>完了したスモールゴールはありません</Text>
        </Flex>
      )}
    </DrawerContainer>
  );
};
