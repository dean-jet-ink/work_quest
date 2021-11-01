import { Text, Box, Image } from "@chakra-ui/react";

import { PrimaryModal } from "../molcules/PrimaryModal";

type Props = {
  onClose: () => void;
  isOpen: boolean;
  line: {
    saying: string;
    who: string;
  };
  king: string;
};

export const KingModal = (props: Props) => {
  const { onClose, isOpen, line, king } = props;

  return (
    <PrimaryModal onClose={onClose} isOpen={isOpen}>
      <Box py={{ base: 10 }} px={{ base: 10 }}>
        <Text color="#d7d7d7">"{line.saying}"</Text>
        <Text fontSize="12px" color="#989898" mt="15px">
          - {line.who} -
        </Text>
        <Text mt="15px">じゃぞ。</Text>
        <Image src={king} boxSize="120px" mx="auto" />
      </Box>
    </PrimaryModal>
  );
};
