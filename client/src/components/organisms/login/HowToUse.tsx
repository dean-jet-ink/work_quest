import { memo } from "react";
import { Box, Flex, Image, Text, useDisclosure } from "@chakra-ui/react";

import { HowToUseModal } from "./HowToUseModal";
import soldier from "../../../image/title/soldier.png";

export const HowToUse = memo((props: { color: string }) => {
  const { color } = props;
  const { onOpen, isOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        w="100%"
        align="center"
        justify="space-around"
        pt={7}
        fontSize={{ base: "12px" }}
      >
        <Box
          color={color}
          _hover={{ color: "orange", borderBottomColor: "orange" }}
          cursor="pointer"
          onClick={onOpen}
          border-bottom="1px solid #d2c9c9"
          width="90px"
        >
          <Text
            fontFamily="fantasy"
            fontSize={{ base: "17px", sm: "20px" }}
            fontWeight="bold"
          >
            使い方
          </Text>
        </Box>
        <Image
          src={soldier}
          w={{ base: "85px", sm: "128px", lg: "210px" }}
          h={{ base: "125px", sm: "163px", lg: "265px" }}
          objectFit="cover"
          position="absolute"
          bottom="64px"
          right="115px"
          d={{ base: "none", md: "block" }}
        />
      </Flex>

      <HowToUseModal onClose={onClose} isOpen={isOpen} color={color} />
    </>
  );
});
