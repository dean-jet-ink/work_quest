import { memo, ReactNode } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
} from "@chakra-ui/react";

import { PrimaryContainer } from "../atoms/PrimaryContainer";

type Props = {
  onClose: () => void;
  isOpen: boolean;
  children: ReactNode;
};

export const PrimaryModal = memo((props: Props) => {
  const { onClose, isOpen, children } = props;

  return (
    <Modal onClose={onClose} isOpen={isOpen} autoFocus={false} isCentered>
      <ModalOverlay>
        <ModalContent mx={5} color="white">
          <ModalCloseButton />
          <PrimaryContainer>{children}</PrimaryContainer>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
});
