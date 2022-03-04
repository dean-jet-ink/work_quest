import { Button } from "@chakra-ui/react";

type Props = {
  children: string;
  isLoading?: boolean;
  color?: string;
  fontSize?: string;
  onClick?: () => void;
};

export const PrimaryButton = (props: Props) => {
  const {
    children,
    isLoading,
    color = "red",
    fontSize = "inherit",
    onClick,
  } = props;

  return (
    <Button
      borderRadius="unset"
      type="submit"
      fontSize={fontSize}
      colorScheme={color}
      isLoading={isLoading}
      onClick={onClick}
      lineHeight="normal"
    >
      {children}
    </Button>
  );
};
