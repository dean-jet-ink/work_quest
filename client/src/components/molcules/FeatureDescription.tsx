import { Box, Heading, Text } from "@chakra-ui/react";
import { ReactNode } from "react";
import { memo } from "react";

type Props = {
  heading: string;
  children: ReactNode;
};

export const FeatureDescription = memo((props: Props) => {
  const { heading, children } = props;

  return (
    <Box>
      <Heading
        fontSize="25px"
        my={5}
        textAlign={{ base: "center", md: "start" }}
      >
        {heading}
      </Heading>
      <Text>{children}</Text>
    </Box>
  );
});
