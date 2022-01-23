import { memo, useCallback } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Link, useHistory } from "react-router-dom";

import { PrimaryContainer } from "../atoms/PrimaryContainer";
import { SecondaryButton } from "../atoms/forms/SecondaryButton";
import { HeaderItems } from "../molcules/HeaderItems";
import HomeIcon from "@material-ui/icons/Home";

export const HeaderGoBack = memo(() => {
  const history = useHistory();

  const onClickGoBack = useCallback(() => {
    history.goBack();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PrimaryContainer>
      <Box py={{ base: 3, md: 5 }} px={{ base: 5, md: 8 }}>
        <Flex align="center" justify="space-between">
          <Box color="white">
            <SecondaryButton onClick={onClickGoBack}>戻る</SecondaryButton>
          </Box>
          <Flex justify="space-between" align="center">
            <Box fontSize={{ base: "27px", md: "36px" }} color="#d0cab7">
              <Link to="/top">
                <HomeIcon fontSize="inherit" color="inherit" />
              </Link>
            </Box>
            <HeaderItems />
          </Flex>
        </Flex>
      </Box>
    </PrimaryContainer>
  );
});
