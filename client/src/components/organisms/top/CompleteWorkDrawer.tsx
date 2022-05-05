import { Box, Flex, Text, Button } from "@chakra-ui/react";

import { Work } from "../../../types/work";
import { DrawerContainer } from "../../molcules/display/DrawerContainer";
import { useSoundEffect } from "../../../hooks/useSoundEffect";
import { TotalTime } from "../../molcules/layout/TotalTime";

import treasure from "../../../assets/image/treasure2.png";
import chest from "../../../assets/audio/chest.mp3";

type Props = {
  completeWorks: Array<Work>;
  onClose: () => void;
  onClick: (id: number, index: number) => void;
  isOpen: boolean;
};

export const CompleteWorkDrawer = (props: Props) => {
  const { completeWorks, onClose, onClick, isOpen } = props;
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [soundEffect, onClickPlaySoundEffect] = useSoundEffect(chest);

  return (
    <DrawerContainer
      onClose={onClose}
      isOpen={isOpen}
      image={treasure}
      closeButtonColor="white"
    >
      {completeWorks.length !== 0 ? (
        completeWorks.map((work, index) => (
          <Flex
            align="center"
            justify="space-between"
            key={work.id}
            fontSize={{ base: "14px", sm: "15px", md: "16px", lg: "18px" }}
          >
            <Box>
              <Text color="#e8cf45" fontWeight="bold">
                {work.workName}
              </Text>
            </Box>

            <Flex pl={5} justify="center" align="center">
              <Box mr={{ base: 4 }}>
                <TotalTime totalTime={work.totalTime} />
              </Box>
              <Button
                bg="transparent"
                color="inherit"
                p="0"
                _hover={{ bg: "unset", color: "orange" }}
                _focus={{
                  boxShadow: "unset",
                }}
                _active={{ bg: "unset" }}
                onClick={() => {
                  onClick(work.id, index);
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
          <Text>完了したWorkはありません</Text>
        </Flex>
      )}
    </DrawerContainer>
  );
};
