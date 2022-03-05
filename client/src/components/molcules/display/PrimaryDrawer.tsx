import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  SlideDirection,
} from "@chakra-ui/react";
import { memo, ReactNode } from "react";

type Props = {
  onClose: () => void;
  isOpen: boolean;
  children: ReactNode;
  placement?: SlideDirection;
  closeButtonColor?: string;
};

export const PrimaryDrawer = memo((props: Props) => {
  const {
    onClose,
    isOpen,
    children,
    placement = "bottom",
    closeButtonColor = "black",
  } = props;

  return (
    <Drawer
      onClose={onClose}
      isOpen={isOpen}
      placement={placement}
      autoFocus={false}
      size="md"
    >
      <DrawerOverlay />
      <DrawerContent bg="transparent">
        <DrawerCloseButton top="25px" right="45px" color={closeButtonColor} />
        {children}
      </DrawerContent>
    </Drawer>
  );
});
