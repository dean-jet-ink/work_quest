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
} from "@chakra-ui/react";

import { AccordionInnerButton } from "../atoms/AccordionInnerButton";
import { TotalTime } from "../molcules/TotalTime";
import { SmallGoal } from "../../types/smallGoal";
import { Link } from "react-router-dom";
import { SecondaryButton } from "../atoms/forms/SecondaryButton";
import { useSelectSmallGoal } from "../../hooks/useSelectSmallGoal";
import { Dialog } from "./Dialog";
import { useSoundEffect } from "../../hooks/useSoundEffect";
import complete from "../../assets/audio/complete.mp3";
import { PrimaryAccordionPanel } from "./PaimaryAccordionPanel";
import { useDisclosures } from "../../hooks/useDisclosures";
import { EditSmallGoalModal } from "../organisms/EditSmallGoalModal";
import { SmallGoalUpdateProps } from "../../hooks/useSmallGoal";
import { OptionalObjectSchema } from "yup/lib/object";

type Props = {
  smallGoals: Array<SmallGoal>;
  onClickUpdate: (props: SmallGoalUpdateProps) => void;
  onClickDelete: (id: number, index: number) => void;
  onClickComplete: (id: number, index: number) => void;
  validationSchema: OptionalObjectSchema<any>;
};

export const SmallGoalList = memo((props: Props) => {
  const {
    smallGoals,
    onClickDelete,
    onClickComplete,
    onClickUpdate,
    validationSchema,
  } = props;
  const { selectedSmallGoal, onSelectSmallGoal } = useSelectSmallGoal();
  const { onOpen1, onOpen2, onClose1, onClose2, isOpen1, isOpen2 } =
    useDisclosures();
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
              <PrimaryAccordionPanel>
                <Flex
                  justify="center"
                  color="white"
                  _hover={{ color: "orange" }}
                >
                  <Link to={`/top/battle/${smallGoal.id}`}>
                    <Text fontWeight="bold">たたかう</Text>
                  </Link>
                </Flex>
                <SecondaryButton onClick={onOpen1}>編集する</SecondaryButton>
                <Box
                  onClick={() => {
                    onClickComplete(smallGoal.id, index);
                    onClickCompleteSound();
                  }}
                >
                  <AccordionInnerButton>完了する</AccordionInnerButton>
                </Box>
                <SecondaryButton
                  onClick={() => {
                    onSelectSmallGoal({
                      id: smallGoal.id,
                      smallGoals,
                      onOpen: onOpen2,
                    });
                  }}
                >
                  削除する
                </SecondaryButton>
              </PrimaryAccordionPanel>
            </AccordionPanel>
            <EditSmallGoalModal
              smallGoal={smallGoal}
              onSubmit={onClickUpdate}
              validationSchema={validationSchema}
              onClose={onClose1}
              isOpen={isOpen1}
            />
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
        onClose={onClose2}
        isOpen={isOpen2}
      />
    </Accordion>
  );
});
