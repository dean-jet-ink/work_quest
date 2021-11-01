import { Box, Flex, Text, Button } from "@chakra-ui/react";

import { Work } from "../../types/work";
import { DrawerContainer } from "../molcules/DrawerContainer";
import treasure from "../../image/treasure2.png";
import chest from "../../assets/audio/chest.mp3";
import { useSoundEffect } from "../../hooks/useSoundEffect";
import { TotalTime } from "../molcules/TotalTime";

type Props = {
  completeWorks: Array<Work>;
  onClose: () => void;
  onClick: (id: number, index: number) => void;
  isOpen: boolean;
};

export const CompleteWorkDrawer = (props: Props) => {
  const { completeWorks, onClose, onClick, isOpen } = props;
  const [BackSound, onClickBackSound] = useSoundEffect(chest);

  return (
    <DrawerContainer
      onClose={onClose}
      isOpen={isOpen}
      image={treasure}
      closeButtonColor="white"
    >
      {completeWorks.length != 0 ? (
        completeWorks.map((work, index) => (
          <Flex align="center" justify="center" key={work.id}>
            <Flex
              w="70%"
              align="center"
              fontSize={{ base: "12px", sm: "15px", lg: "18px" }}
            >
              <Text color="gold" fontWeight="bold">
                {work.workName}
              </Text>
              <Box ml={{ base: 4 }}>
                <TotalTime totalTime={work.totalTime} />
              </Box>
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
                onClick(work.id, index);
                onClickBackSound();
              }}
            >
              もどす
            </Button>
          </Flex>
        ))
      ) : (
        <Flex justify="center" p={6}>
          <Text>完了したWorkがありません</Text>
        </Flex>
      )}
    </DrawerContainer>
  );
};
