import { memo } from "react";
import { Link } from "react-router-dom";
import {
  Stack,
  Flex,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";

import { AccordionInnerButton } from "../../atoms/button/AccordionInnerButton";
import { Work } from "../../../types/work";
import { Dialog } from "../../molcules/popUp/Dialog";
import { useSelectWork } from "../../../hooks/useSelectWork";
import { SecondaryButton } from "../../atoms/button/SecondaryButton";
import { useSoundEffect } from "../../../hooks/useSoundEffect";
import complete from "../../../assets/audio/complete.mp3";
import { WorkItem } from "../../molcules/layout/WorkItem";
import { PrimaryAccordionPanel } from "../../molcules/display/PaimaryAccordionPanel";
import { EditWorkModal } from "./EditWorkModal";
import { OptionalObjectSchema } from "yup/lib/object";
import { WorkUpdateProps } from "../../../hooks/useWorks";
import { useDisclosures } from "../../../hooks/useDisclosures";

type Props = {
  works: Array<Work>;
  onClickDelete: (id: number, index: number) => void;
  onClickComplete: (id: number, index: number) => void;
  onSubmit: (props: WorkUpdateProps) => void;
  validationSchema: OptionalObjectSchema<any>;
};

export const WorkList = memo((props: Props) => {
  const { works, onClickDelete, onClickComplete, onSubmit, validationSchema } =
    props;
  const { selectedWork, onSelectWork } = useSelectWork();
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [completeSound, onClickPlayCompleteSound] = useSoundEffect(complete);
  const { onOpen1, onOpen2, onClose1, onClose2, isOpen1, isOpen2 } =
    useDisclosures();

  return (
    <Accordion allowToggle>
      <Stack spacing={{ base: 1 }}>
        {works.map((work, index) => (
          <AccordionItem key={work.id} border="unset">
            <AccordionButton p="0" _focus={{ boxShadow: "unset" }}>
              <WorkItem name={work.workName} deadline={work.deadline} />
            </AccordionButton>
            <AccordionPanel p={0}>
              <PrimaryAccordionPanel>
                <Link to={`/top/work/${work.id}`}>
                  <Flex
                    align="center"
                    justify="center"
                    _hover={{ color: "orange" }}
                  >
                    <Text mr={2}>Work</Text>
                  </Flex>
                </Link>
                <SecondaryButton
                  onClick={() =>
                    onSelectWork({
                      id: work.id,
                      works,
                      onOpen: onOpen1,
                    })
                  }
                >
                  編集する
                </SecondaryButton>
                <Box
                  onClick={() => {
                    onClickComplete(work.id, index);
                    onClickPlayCompleteSound();
                  }}
                >
                  <AccordionInnerButton>完了する</AccordionInnerButton>
                </Box>
                <SecondaryButton
                  onClick={() =>
                    onSelectWork({
                      id: work.id,
                      works,
                      onOpen: onOpen2,
                    })
                  }
                >
                  削除する
                </SecondaryButton>
              </PrimaryAccordionPanel>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Stack>
      <EditWorkModal
        work={selectedWork}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        onClose={onClose1}
        isOpen={isOpen1}
      />
      <Dialog
        header={`「${selectedWork.workName}」を削除しますか？`}
        color="red"
        onClick={() => {
          onClickDelete(selectedWork.id, works.indexOf(selectedWork));
          onClose2();
        }}
        onClose={onClose2}
        isOpen={isOpen2}
      />
    </Accordion>
  );
});
