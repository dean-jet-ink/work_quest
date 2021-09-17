import { memo } from "react";
import { Link } from "react-router-dom";
import {
  Stack,
  Flex,
  Text,
  Accordion,
  AccordionItem,
  AccordionIcon,
  AccordionButton,
  AccordionPanel,
  Box,
  Divider,
  useDisclosure,
} from "@chakra-ui/react";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";

import { PrimaryContainer } from "../atoms/PrimaryContainer";
import { AccordionInnerButton } from "../atoms/AccordionInnerButton";
import { Work } from "../../types/work";
import { Dialog } from "./Dialog";
import { useSelectWork } from "../../hooks/useSelectWork";
import { SecondaryButton } from "../atoms/forms/SecondaryButton";
import { useSoundEffect } from "../../hooks/useSoundEffect";
import complete from "../../assets/audio/complete.mp3";
import { useDeadline } from "../../hooks/form/useDaedline";
import { WorkItem } from "./WorkItem";

type Props = {
  works: Array<Work>;
  onClickDelete: (id: number, index: number) => void;
  onClickComplete: (id: number, index: number) => void;
};

export const WorkList = memo((props: Props) => {
  const { works, onClickDelete, onClickComplete } = props;
  const { onClose, onOpen, isOpen } = useDisclosure();
  const { selectedWork, onSelectWork } = useSelectWork();
  const [completeSound, onClickCompleteSound] = useSoundEffect(complete);

  return (
    <Accordion allowToggle>
      <Stack spacing={2}>
        {works.map((work, index) => (
          <AccordionItem key={work.id} border="unset">
            <AccordionButton p="0" _focus={{ boxShadow: "unset" }}>
              <WorkItem name={work.workName} deadline={work.deadline} />
            </AccordionButton>
            <AccordionPanel p="0">
              <Box
                bg="#f5e8c3"
                mx={1}
                p={{ base: 6 }}
                borderBottomEndRadius={5}
                borderBottomLeftRadius={5}
              >
                <PrimaryContainer>
                  <Box color="white" fontWeight="bold" p={5}>
                    <Link to={`/top/work/${work.id}`}>
                      <Flex
                        align="center"
                        justify="center"
                        _hover={{ color: "orange" }}
                      >
                        <Text mr={2}>Workへすすむ</Text>
                        <ArrowRightAltIcon />
                      </Flex>
                    </Link>
                    <Divider my={4} />
                    <Flex align="center" justify="space-around">
                      <Flex align="center" justify="center" w="50%">
                        <Box
                          onClick={() => {
                            onClickComplete(work.id, index);
                            onClickCompleteSound();
                          }}
                        >
                          <AccordionInnerButton>完了する</AccordionInnerButton>
                        </Box>
                      </Flex>
                      <Flex align="center" justify="center" w="50%">
                        <SecondaryButton
                          onClick={() =>
                            onSelectWork({
                              id: work.id,
                              works,
                              onOpen: onOpen,
                            })
                          }
                        >
                          削除する
                        </SecondaryButton>
                      </Flex>
                    </Flex>
                  </Box>
                </PrimaryContainer>
              </Box>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Stack>
      <Dialog
        header={`「${selectedWork.workName}」を削除しますか？`}
        color="red"
        onClick={() => {
          onClickDelete(selectedWork.id, works.indexOf(selectedWork));
          onClose();
        }}
        onClose={onClose}
        isOpen={isOpen}
      />
    </Accordion>
  );
});
