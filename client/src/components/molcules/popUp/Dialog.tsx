import { memo, useRef } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogOverlay,
  Heading,
  Flex,
  Button,
  Box,
} from "@chakra-ui/react";

import { PrimaryContainer } from "../../atoms/layout/PrimaryContainer";
import { SecondaryButton } from "../../atoms/button/SecondaryButton";

type Props = {
  onClick: () => void;
  onClose: () => void;
  deleteFile?: () => void;
  isOpen: boolean;
  header: string;
  color?: string;
};

export const Dialog = memo((props: Props) => {
  const {
    onClick,
    onClose,
    deleteFile,
    isOpen,
    header,
    color = "white",
  } = props;
  const cancelRef = useRef(null);

  return (
    <AlertDialog
      onClose={onClose}
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      isCentered={true}
    >
      <AlertDialogOverlay />
      <AlertDialogContent m={5} bg="transparent">
        <PrimaryContainer>
          <Box p={5} textAlign="center">
            <Heading as="h2" color={color} fontSize="18px" fontWeight="normal">
              {header}
            </Heading>
            <Flex pt={3} justify="center">
              <SecondaryButton
                onClick={() => {
                  onClose();
                  if (deleteFile) {
                    deleteFile();
                  }
                  onClick();
                }}
              >
                はい
              </SecondaryButton>
              <Button
                onClick={() => {
                  onClose();
                }}
                color="white"
                fontSize="15px"
                bg="transparent"
                _focus={{ bg: "transparent" }}
                _active={{ bg: "transparent" }}
                _hover={{ bg: "transparent", color: "orange" }}
                ref={cancelRef}
                ml={2}
              >
                いいえ
              </Button>
            </Flex>
          </Box>
        </PrimaryContainer>
      </AlertDialogContent>
    </AlertDialog>
  );
});
