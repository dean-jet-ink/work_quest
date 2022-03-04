import { ReactNode } from "react";
import { Flex, Box, Text, Image, useDisclosure } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import soldier from "../../../image/title/soldier.png";
import { HowToUseModal } from "../../organisms/login/HowToUseModal";

type Props = {
  children: ReactNode;
  signup: boolean;
  color: string;
};

export const LoginHeaderForm = (props: Props) => {
  const { children, signup, color } = props;
  const { onClose, onOpen, isOpen } = useDisclosure();
  const howToDisplay = signup ? "none" : "flex";

  return (
    <Flex
      w="100%"
      flexDir="column"
      align="center"
      justify="center"
      textAlign="center"
      py={7}
      px={3}
      border={`2px solid ${color}`}
      borderRadius={5}
    >
      <Box w="100%">
        <Text
          fontSize={{ base: "35px", sm: "45px", md: "80px", lg: "100px" }}
          fontWeight="bold"
          mb={{ sm: 3, md: 8 }}
          fontFamily="fantasy"
        >
          Work Quest
        </Text>
        <Box py={7} spacing={20} w="100%" mx="auto">
          {children}
        </Box>
        {signup ? (
          <Box w="fit-content" mx="auto">
            <Link to="/">
              <Text
                fontSize="sm"
                textDecor="underline"
                _hover={{ color: "orange" }}
              >
                登録済みの方
              </Text>
            </Link>
          </Box>
        ) : (
          <Box w="fit-content" mx="auto">
            <Link to="/signup">
              <Text
                fontSize="sm"
                textDecor="underline"
                _hover={{ color: "orange" }}
              >
                新規ご登録の方
              </Text>
            </Link>
          </Box>
        )}
      </Box>

      <Flex
        w="100%"
        align="center"
        justify="space-around"
        pt={7}
        fontSize={{ base: "12px" }}
        display={howToDisplay}
      >
        <Box
          color={color}
          _hover={{ color: "orange", borderBottomColor: "orange" }}
          cursor="pointer"
          onClick={onOpen}
          border-bottom="1px solid #d2c9c9"
          width="90px"
          pb={3}
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
          position={{ lg: "absolute" }}
          bottom={{ lg: "64px" }}
          right={{ lg: "115px" }}
        />
      </Flex>

      <HowToUseModal onClose={onClose} isOpen={isOpen} color={color} />
    </Flex>
  );
};
