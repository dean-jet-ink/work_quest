import { Button } from "@chakra-ui/react";

type Props = {
  children: string;
  isLoading?: boolean;
  color?: string;
  onClick?: () => void;
};

export const PrimaryButton = (props: Props) => {
  const { children, isLoading, color = "red", onClick } = props;

  return (
    <Button
      borderRadius="unset"
      type="submit"
      colorScheme={color}
      isLoading={isLoading}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
