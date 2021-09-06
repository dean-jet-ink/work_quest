import {
  Drawer,
  DrawerBody,
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
};

export const PrimaryDrawer = memo((props: Props) => {
  const { onClose, isOpen, children, placement = "bottom" } = props;

  return (
    <Drawer
      onClose={onClose}
      isOpen={isOpen}
      placement={placement}
      autoFocus={false}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerBody p="0">
          <DrawerCloseButton />
          {children}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
});
