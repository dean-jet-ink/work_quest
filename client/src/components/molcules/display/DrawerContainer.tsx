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
        <Box
          pt={{ base: "73px", md: "100px", xl: "65px" }}
          px={{ base: "20px", sm: "50px", md: "75px" }}
          overflow="auto"
          h="369px"
        >
          <Image
            src={image}
            w={{ base: "51px", md: "60px", lg: "80px", xl: "115px" }}
            objectFit="cover"
            position="absolute"
            top={{ base: "15px", md: "28px" }}
            left={{ base: "35px", md: "55px" }}
          />
          <Stack spacing={8} px={{ lg: "80px", xl: "220px" }}>
            {children}
          </Stack>
        </Box>
      </PrimaryContainer>
    </PrimaryDrawer>
  );
});
