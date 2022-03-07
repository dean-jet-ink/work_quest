import { memo } from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";

import { PrimaryContainer } from "../../atoms/layout/PrimaryContainer";

import { CheerButton } from "../../molcules/button/CheerButton";
import { HeaderItems } from "../../molcules/menu/HeaderItems";
import logo from "../../../image/workquest_logo.svg";

type Props = {
  onOpenProfile: () => void;
  onOpenCheer: () => void;
  src: string;
};

export const Header = memo((props: Props) => {
  const { onOpenProfile, onOpenCheer, src } = props;

  return (
    <PrimaryContainer>
      <Flex
        py={{ base: 3, md: 5 }}
        px={{ base: 5, md: 8 }}
        align="center"
        justify="space-between"
      >
        <Box
          cursor="pointer"
          onClick={onOpenProfile}
          data-testid="profileModalButton"
        >
          <Image
            src={src}
            borderRadius="50%"
            boxSize={{ base: "50px", md: "60px" }}
            objectFit="cover"
          />
        </Box>
        <Image
          src={logo}
          ml="15%"
          w={{ md: "168px" }}
          d={{ base: "none", md: "block" }}
        />
        <Flex align="center" justify="space-between">
          <CheerButton onOpenCheer={onOpenCheer} />
          <HeaderItems />
        </Flex>
      </Flex>
    </PrimaryContainer>
  );
});
