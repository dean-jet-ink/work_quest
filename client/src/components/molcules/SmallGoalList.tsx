import { memo } from "react";
import {
  Accordion,
  Stack,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  Flex,
  Text,
  Spacer,
  AccordionPanel,
  Box,
  Divider,
} from "@chakra-ui/react";

import { PrimaryContainer } from "../atoms/PrimaryContainer";
import { AccordionInnerButton } from "../atoms/AccordionInnerButton";
import { TotalTime } from "../molcules/TotalTime";
import { SmallGoal } from "../../types/smallGoal";
import { Link } from "react-router-dom";
import { SecondaryButton } from "../atoms/forms/SecondaryButton";
import { useSelectSmallGoal } from "../../hooks/useSelectSmallGoal";
import { Dialog } from "./Dialog";
import { useDisclosureDelete } from "../../hooks/useDisclosureDelete";
import { useSoundEffect } from "../../hooks/useSoundEffect";
import complete from "../../assets/audio/complete.mp3";

type Props = {
  smallGoals: Array<SmallGoal>;
  onClickDelete: (id: number, index: number) => void;
  onClickComplete: (id: number, index: number) => void;
};

export const SmallGoalList = memo((props: Props) => {
  const { smallGoals, onClickDelete, onClickComplete } = props;
  const { selectedSmallGoal, onSelectSmallGoal } = useSelectSmallGoal();
  const { isOpenDelete, onOpenDelete, onCloseDelete } = useDisclosureDelete();
  const [completeSound, onClickCompleteSound] = useSoundEffect(complete);

  return (
    <Accordion allowToggle>
      <Stack spacing={2}>
        {smallGoals.map((smallGoal, index) => (
          <AccordionItem border="unset" key={smallGoal.id}>
            <AccordionButton p="0" _focus={{ boxShadow: "unset" }}>
              <Flex
                bg="whiteAlpha.700"
                h="60px"
                w="100%"
                align="center"
                justify="space-between"
                borderRadius="md"
                borderWidth="2px"
                borderColor="#3c3c3c"
                p={{ base: 3 }}
                cursor="pointer"
              >
                <Text fontSize="15px" fontWeight="bold">
                  {smallGoal.smallGoalName}
                </Text>
                <Spacer />
                <TotalTime totalTime={smallGoal.totalTime} color="inherit" />
                <AccordionIcon />
              </Flex>
            </AccordionButton>
            <AccordionPanel p="0">
              <Box
                bg="#f5e8c3"
                mx={1}
                p={{ base: 6, lg: 12 }}
                px={{ lg: "90px" }}
                borderBottomEndRadius={5}
                borderBottomLeftRadius={5}
              >
                <PrimaryContainer>
                  <Box p={{ base: 5 }}>
                    <Stack spacing={3}>
                      <Flex justify="center" color="white">
                        <Link to={`/top/battle/${smallGoal.id}`}>
                          <Text fontWeight="bold">たたかう</Text>
                        </Link>
                      </Flex>
                      <Divider />
                      <Flex align="center" justify="space-around" color="white">
                        <Flex
                          justify="center"
                          w="50%"
                          onClick={() => {
                            onClickComplete(smallGoal.id, index);
                            onClickCompleteSound();
                          }}
                        >
                          <AccordionInnerButton>完了する</AccordionInnerButton>
                        </Flex>
                        <Flex justify="center" w="50%">
                          <SecondaryButton
                            onClick={() => {
                              onSelectSmallGoal({
                                id: smallGoal.id,
                                smallGoals,
                                onOpen: onOpenDelete,
                              });
                            }}
                          >
                            削除する
                          </SecondaryButton>
                        </Flex>
                      </Flex>
                    </Stack>
                  </Box>
                </PrimaryContainer>
              </Box>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Stack>
      <Dialog
        header={`「${selectedSmallGoal.smallGoalName}」を削除しますか？`}
        color="red"
        onClick={() => {
          onClickDelete(
            selectedSmallGoal.id,
            smallGoals.indexOf(selectedSmallGoal)
          );
        }}
        onClose={onCloseDelete}
        isOpen={isOpenDelete}
      />
    </Accordion>
  );
});
