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
  margin?: number;
};

export const PrimaryModal = memo((props: Props) => {
  const { onClose, isOpen, children, isCentered = true, margin = 5 } = props;

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      autoFocus={false}
      isCentered={isCentered}
    >
      <ModalOverlay>
        <ModalContent mx={margin} bg="transparent">
          <ModalCloseButton />
          <PrimaryContainer>{children}</PrimaryContainer>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
});
