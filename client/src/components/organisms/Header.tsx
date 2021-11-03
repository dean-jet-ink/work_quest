import { memo } from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";

import { PrimaryContainer } from "../atoms/PrimaryContainer";

import { CheerButton } from "../molcules/CheerButton";
import { HeaderItems } from "../molcules/HeaderItems";

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
        <Box cursor="pointer" onClick={onOpenProfile}>
          <Image
            src={src}
            borderRadius="50%"
            boxSize={{ base: "50px", md: "60px" }}
            objectFit="cover"
          />
        </Box>
        <Text
          d={{ base: "none", md: "block" }}
          color="white"
          fontSize={{ md: "35px", lg: "42px" }}
          ml="15%"
        >
          Work Quest
        </Text>
        <Flex align="center" justify="space-between">
          <CheerButton onOpenCheer={onOpenCheer} />
          <HeaderItems />
        </Flex>
      </Flex>
    </PrimaryContainer>
  );
});
