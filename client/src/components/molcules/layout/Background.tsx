import { ReactNode } from "react";
import { Box } from "@chakra-ui/react";

import bg from "../../../assets/image/city.jpg";

export const Background = (props: { children: ReactNode }) => {
  const { children } = props;

  return (
    <Box background={`center/cover url(${bg}) no-repeat`}>
      <Box bg="#70685229">{children}</Box>
    </Box>
  );
};
