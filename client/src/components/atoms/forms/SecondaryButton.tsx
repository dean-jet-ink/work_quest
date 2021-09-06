import { Button } from "@chakra-ui/react";
import { memo } from "react";

type Props = {
  children: string;
  onClick: (props?: any) => void;
  color?: string;
  fontSize?: string;
  disabled?: boolean;
};

export const SecondaryButton = memo((props: Props) => {
  const {
    children,
    onClick,
    color = "white",
    fontSize = "inherit",
    disabled = false,
  } = props;

  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      color={color}
      fontSize={fontSize}
      bg="transparent"
      _focus={{ bg: "transparent" }}
      _active={{ bg: "transparent" }}
      _hover={{ bg: "transparent", color: "orange" }}
    >
      {children}
    </Button>
  );
});
