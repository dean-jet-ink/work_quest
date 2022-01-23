import { memo } from "react";
import { Flex, Text, Box } from "@chakra-ui/react";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import { MotionBox } from "../../animation/MotionBox";
import { ProsessingModal } from "./ProsessingModal";

type Props = {
  cheered: boolean;
  prosessing: boolean;
  onClickSubmit: () => void;
  onClickDelete: () => void;
};

export const CheerUp = memo((props: Props) => {
  const { cheered, prosessing, onClickSubmit, onClickDelete } = props;

  return (
    <>
      {cheered ? (
        <Flex
          align="center"
          cursor="pointer"
          _hover={{ opacity: 0.8 }}
          userSelect="none"
          onClick={onClickDelete}
        >
          <Text mr={1} fontWeight="bold" fontSize={{ lg: "18px" }}>
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
              <Flex fontSize={{ base: "26px", lg: "32px" }} color="#debd0b">
                <InsertEmoticonIcon color="inherit" fontSize="inherit" />
              </Flex>
            </MotionBox>
          </Box>
        </Flex>
      ) : (
        <Flex
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
    </>
  );
});
