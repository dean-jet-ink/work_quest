import { Box } from "@chakra-ui/react";
import { memo, useCallback } from "react";

import { PrimaryContainer } from "../atoms/PrimaryContainer";
import { SecondaryButton } from "../atoms/forms/SecondaryButton";
import { useHistory } from "react-router-dom";

export const HeaderGoBack = memo(() => {
  const history = useHistory();

  const onClickGoBack = useCallback(() => {
    history.goBack();
  }, []);

  return (
    <PrimaryContainer>
      <Box color="white" py={{ base: 3, md: 5 }} px={{ base: 5, md: 8 }}>
        <SecondaryButton onClick={onClickGoBack}>戻る</SecondaryButton>
      </Box>
    </PrimaryContainer>
  );
});
