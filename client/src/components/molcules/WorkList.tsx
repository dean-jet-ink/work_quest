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
  useDisclosure,
} from "@chakra-ui/react";

import { AccordionInnerButton } from "../atoms/AccordionInnerButton";
import { Work } from "../../types/work";
import { Dialog } from "./Dialog";
import { useSelectWork } from "../../hooks/useSelectWork";
import { SecondaryButton } from "../atoms/forms/SecondaryButton";
import { useSoundEffect } from "../../hooks/useSoundEffect";
import complete from "../../assets/audio/complete.mp3";
import { WorkItem } from "./WorkItem";
import { PrimaryAccordionPanel } from "./PaimaryAccordionPanel";
import { EditWorkModal } from "../organisms/EditWorkModal";
import { OptionalObjectSchema } from "yup/lib/object";
import { WorkUpdateProps } from "../../hooks/useWorks";
import { useDisclosures } from "../../hooks/useDisclosures";

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
  const [completeSound, onClickCompleteSound] = useSoundEffect(complete);
  const { onOpen1, onOpen2, onClose1, onClose2, isOpen1, isOpen2 } =
    useDisclosures();

  return (
    <Accordion allowToggle>
      <Stack spacing={{ base: 2 }}>
        {works.map((work, index) => (
          <AccordionItem key={work.id} border="unset">
            <AccordionButton p="0" _focus={{ boxShadow: "unset" }}>
              <WorkItem name={work.workName} deadline={work.deadline} />
            </AccordionButton>
            <AccordionPanel p="0">
              <PrimaryAccordionPanel>
                <Link to={`/top/work/${work.id}`}>
                  <Flex
                    align="center"
                    justify="center"
                    _hover={{ color: "orange" }}
                  >
                    <Text mr={2}>Workへすすむ</Text>
                  </Flex>
                </Link>
                <SecondaryButton onClick={onOpen1}>編集する</SecondaryButton>
                <Box
                  onClick={() => {
                    onClickComplete(work.id, index);
                    onClickCompleteSound();
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
            <EditWorkModal
              work={work}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
              onClose={onClose1}
              isOpen={isOpen1}
            />
          </AccordionItem>
        ))}
      </Stack>
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
