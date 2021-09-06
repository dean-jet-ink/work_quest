import { Box, Flex, Text, Button } from "@chakra-ui/react";
import StarIcon from "@material-ui/icons/Star";

import { Work } from "../../types/work";
import { DrawerContainer } from "../molcules/DrawerContainer";
import treasure from "../../image/treasure2.png";
import chest from "../../assets/audio/chest.mp3";
import { useSoundEffect } from "../../hooks/useSoundEffect";

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
    <DrawerContainer onClose={onClose} isOpen={isOpen} image={treasure}>
      {completeWorks.length != 0 ? (
        completeWorks.map((work, index) => (
          <Flex align="center" justify="center" key={work.id}>
            <Flex flexDirection="column" w="70%">
              <Text color="gold" fontWeight="bold">
                {work.workName}
              </Text>
              <Flex pt={1}>
                <Box bg="gray.300" borderRadius="md" px={2} mr={2}>
                  <Text fontSize="12px" fontWeight="bold" color="black">
                    レア度
                  </Text>
                </Box>
                <Flex
                  align="center"
                  justify="center"
                  color="yellow"
                  h="autp"
                  fontSize="14px"
                >
                  <StarIcon fontSize="inherit" />
                  <StarIcon fontSize="inherit" />
                  <StarIcon fontSize="inherit" />
                  <StarIcon fontSize="inherit" />
                  <StarIcon fontSize="inherit" />
                </Flex>
              </Flex>
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
          <Text>完了したWorkがありません...</Text>
        </Flex>
      )}
    </DrawerContainer>
  );
};
