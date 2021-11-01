import { Flex, Text, Button } from "@chakra-ui/react";

import { DrawerContainer } from "../molcules/DrawerContainer";
import { TotalTime } from "../molcules/TotalTime";
import { SmallGoal } from "../../types/smallGoal";
import goalFlag from "../../image/goalFlag.png";
import cancel from "../../assets/audio/cancel.mp3";
import { useSoundEffect } from "../../hooks/useSoundEffect";

type Props = {
  completeSmallGoals: Array<SmallGoal>;
  onClose: () => void;
  onClick: (id: number, index: number) => void;
  isOpen: boolean;
};

export const CompleteSmallGoalDrawer = (props: Props) => {
  const { completeSmallGoals, onClose, onClick, isOpen } = props;
  const [BackSound, onClickBackSound] = useSoundEffect(cancel);

  return (
    <DrawerContainer
      onClose={onClose}
      isOpen={isOpen}
      image={goalFlag}
      closeButtonColor="white"
    >
      {completeSmallGoals.length != 0 ? (
        completeSmallGoals.map((smallGoal, index) => (
          <Flex align="center" justify="center" key={smallGoal.id}>
            <Flex justify="start" align="center" w="70%">
              <TotalTime totalTime={10} color="gray.300" fontSize="14px" />
              <Text color="#7ad069" fontWeight="bold">
                {smallGoal.smallGoalName}
              </Text>
            </Flex>
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
                onClickBackSound();
              }}
            >
              もどす
            </Button>
          </Flex>
        ))
      ) : (
        <Flex justify="center" p={6}>
          <Text>完了したスモールゴールがありません...</Text>
        </Flex>
      )}
    </DrawerContainer>
  );
};
