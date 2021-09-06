import { memo, ReactNode } from "react";
import { Box, Stack, Image } from "@chakra-ui/react";

import { PrimaryDrawer } from "./PrimaryDrawer";
import { PrimaryContainer } from "../atoms/PrimaryContainer";

type Props = {
  children: ReactNode;
  onClose: () => void;
  isOpen: boolean;
  image: string;
};

export const DrawerContainer = memo((props: Props) => {
  const { children, onClose, isOpen, image } = props;

  return (
    <PrimaryDrawer onClose={onClose} isOpen={isOpen}>
      <PrimaryContainer>
        <Box p={8} color="white">
          <Image src={image} w="75px" objectFit="cover" />
          <Stack spacing={8} py={6} px={3}>
            {children}
          </Stack>
        </Box>
      </PrimaryContainer>
    </PrimaryDrawer>
  );
});
