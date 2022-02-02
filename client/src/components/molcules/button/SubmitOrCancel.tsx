import { memo } from "react";
import { Flex, HStack, Button } from "@chakra-ui/react";

import { PrimaryButton } from "../../atoms/button/PrimarButton";

type Props = {
  text?: string;
  onClose: () => void;
  onClick?: (props?: any) => void;
  isLoading?: boolean;
};

export const SubmitOrCancel = memo((props: Props) => {
  const { text = "追加", onClose, onClick, isLoading } = props;

  return (
    <Flex align="center" justify="center">
      <HStack spacing="25px">
        <PrimaryButton onClick={onClick} isLoading={isLoading}>
          {text}
        </PrimaryButton>
        <Button borderRadius="unset" colorScheme="whiteAlpha" onClick={onClose}>
          やめる
        </Button>
      </HStack>
    </Flex>
  );
});
