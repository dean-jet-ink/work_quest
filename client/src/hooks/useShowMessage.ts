import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";

type Props = {
  description: string;
  status: "info" | "success" | "warning" | "error";
};

export const useShowMessage = () => {
  const toast = useToast();

  const showMessage = useCallback((props: Props) => {
    const { description, status } = props;

    toast({
      description,
      status,
      position: "top",
      duration: 2000,
      isClosable: true,
    });
  }, []);

  return { showMessage };
};
