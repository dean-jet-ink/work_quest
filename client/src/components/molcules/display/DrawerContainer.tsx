import { memo, ReactNode } from "react";
import { Box, Stack, Image } from "@chakra-ui/react";

import { PrimaryDrawer } from "./PrimaryDrawer";
import { PrimaryContainer } from "../../atoms/layout/PrimaryContainer";
import "../../../assets/css/drawer.css";

type Props = {
  children: ReactNode;
  onClose: () => void;
  isOpen: boolean;
  image: string;
  closeButtonColor?: string;
};

export const DrawerContainer = memo((props: Props) => {
  const { children, onClose, isOpen, image, closeButtonColor } = props;

  return (
    <PrimaryDrawer
      onClose={onClose}
      isOpen={isOpen}
      closeButtonColor={closeButtonColor}
    >
      <PrimaryContainer>
        <Box p={8} color="white" overflow="auto" h="369px">
          <Image
            src={image}
            w={{ base: "75px", lg: "90px", xl: "120px" }}
            objectFit="cover"
          />
          <Stack spacing={8} py={8} px={{ lg: "80px", xl: "220px" }}>
            {children}
          </Stack>
        </Box>
      </PrimaryContainer>
    </PrimaryDrawer>
  );
});
