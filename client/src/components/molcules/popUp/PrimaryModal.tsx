import { memo, ReactNode } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
} from "@chakra-ui/react";

import { PrimaryContainer } from "../../atoms/layout/PrimaryContainer";

type Props = {
  onClose: () => void;
  isOpen: boolean;
  children: ReactNode;
  isCentered?: boolean;
};

export const PrimaryModal = memo((props: Props) => {
  const { onClose, isOpen, children, isCentered = true } = props;

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      autoFocus={false}
      isCentered={isCentered}
    >
      <ModalOverlay>
        <ModalContent mx={5} color="white">
          <ModalCloseButton />
          <PrimaryContainer>{children}</PrimaryContainer>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
});
