import { memo } from "react";
import { Box, Image, Heading, Button } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

import bg from "../../../image/bg.svg";
import { useCallback } from "react";

export const CTA = memo(() => {
  const history = useHistory();

  const onClickLogin = useCallback(() => history.push("/signup"), [history]);

  return (
    <Box position="relative" h="300px" mt="70px">
      <Image
        src={bg}
        position="absolute"
        w="300px"
        right="0"
        left="0"
        m="auto"
      />
      <Box
        position="absolute"
        w="fit-content"
        textAlign="center"
        top="118px"
        right="0"
        left="0"
        m="auto"
      >
        <Heading fontSize="20px" mb={8}>
          さあ、
          <br />
          楽しく勉強しましょう！
        </Heading>
        <Button
          borderRadius="unset"
          colorScheme="red"
          onClick={onClickLogin}
          letterSpacing="2px"
        >
          新規登録
        </Button>
      </Box>
    </Box>
  );
});
