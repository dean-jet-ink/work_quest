import { memo } from "react";
import { AccordionButton } from "@chakra-ui/react";

export const AccordionInnerButton = memo((props: { children: string }) => {
  const { children } = props;

  return (
    <AccordionButton
      bg="transparent"
      w="auto"
      p="0"
      fontSize="inherit"
      _hover={{ bg: "unset", color: "orange" }}
      _focus={{
        boxShadow: "unset",
      }}
      _active={{ bg: "unset" }}
    >
      {children}
    </AccordionButton>
  );
});
