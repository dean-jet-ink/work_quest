import { Box, Text } from "@chakra-ui/react";

import { PrimaryModal } from "../molcules/PrimaryModal";
import { SubmitOrCancel } from "../molcules/forms/SubmitOrCancel";

type Props = {
  onClose: () => void;
  isOpen: boolean;
  onClick: () => void;
};

export const ExitModal = (props: Props) => {
  const { onClose, isOpen } = props;
  return (
    <PrimaryModal onClose={onClose} isOpen={isOpen}>
      <Box>
        <Text>このギルドから退会しますか？</Text>
      </Box>
      <SubmitOrCancel
        onClose={onClose}
        onClick={() => console.log("hello")}
        text="はい"
      />
    </PrimaryModal>
  );
};
