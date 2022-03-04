import { memo } from "react";
import { Flex, Text, Box } from "@chakra-ui/react";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import { MotionBox } from "../../../animation/MotionBox";
import { ProsessingModal } from "../popUp/ProsessingModal";

type Props = {
  cheered: boolean;
  prosessing: boolean;
  onClickSubmit: () => void;
  onClickDelete: () => void;
};

export const CheerUp = memo((props: Props) => {
  const { cheered, prosessing, onClickSubmit, onClickDelete } = props;

  return (
    <Box
      background="#191e2bd6"
      border="3px solid #dadada"
      box-shadow="md"
      border-radius="md"
    >
      {cheered ? (
        <Flex
          py={1}
          px={2}
          align="center"
          cursor="pointer"
          _hover={{ opacity: 0.8 }}
          userSelect="none"
          onClick={onClickDelete}
        >
          <Text mr={1} fontWeight="bold">
            応援する
          </Text>
          <Box position="relative">
            <MotionBox
              as="div"
              animate={{ scale: [0, 1, 1.2], opacity: [0, 1, 0] }}
              transition={{
                duration: 0.2,
                ease: "easeInOut",
                times: [0, 0.5, 1],
              }}
            >
              <Box bg="#debd0b" borderRadius="full" boxSize="30px"></Box>
            </MotionBox>
            <MotionBox
              as="div"
              position="absolute"
              top="2px"
              right="2px"
              animate={{ scale: [0, 1], opacity: [0, 1] }}
              transition={{
                duration: 0.2,
                ease: "easeInOut",
                times: [0, 0.5, 1],
              }}
            >
              <Flex fontSize="25px" color="#debd0b">
                <InsertEmoticonIcon color="inherit" fontSize="inherit" />
              </Flex>
            </MotionBox>
          </Box>
        </Flex>
      ) : (
        <Flex
          py={1}
          px={2}
          data-testid="cheerButton"
          align="center"
          cursor="pointer"
          _hover={{ opacity: 0.8 }}
          userSelect="none"
          onClick={onClickSubmit}
        >
          <Text mr={1} fontWeight="bold">
            応援する
          </Text>
          <Flex
            align="center"
            justify="center"
            color="gray"
            borderRadius="full"
            w="30px"
            h="30px"
            fontSize="25px"
          >
            <InsertEmoticonIcon color="inherit" fontSize="inherit" />
          </Flex>
        </Flex>
      )}
      <ProsessingModal prosessing={prosessing} />
    </Box>
  );
});
