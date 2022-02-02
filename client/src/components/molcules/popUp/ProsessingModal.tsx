import { Flex } from "@chakra-ui/layout";
import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import { Spinner } from "@chakra-ui/spinner";

export const ProsessingModal = (props: { prosessing: boolean }) => {
  const { prosessing } = props;

  return (
    <Modal
      isOpen={prosessing}
      onClose={() => console.log("hello")}
      isCentered={true}
    >
      <ModalOverlay />
      <ModalBody>
        <ModalContent bg="transparent" shadow="none">
          <Flex align="center" justify="center">
            <Spinner
              color="gray.600"
              emptyColor="white"
              size="xl"
              thickness="4px"
            />
          </Flex>
        </ModalContent>
      </ModalBody>
    </Modal>
  );
};
