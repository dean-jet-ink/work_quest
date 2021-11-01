import { Box, Heading, Text } from "@chakra-ui/react";
import { ReactNode } from "react";
import { memo } from "react";
import { PrimaryContainer } from "../atoms/PrimaryContainer";

type Props = {
  heading: string;
  children: ReactNode;
};

export const FeatureDescription = memo((props: Props) => {
  const { heading, children } = props;

  return (
    <PrimaryContainer>
      <Box p={{ base: 8, md: 12 }} h={{ md: "400px" }}>
        <Heading
          fontSize={{ base: "35px", lg: "40px" }}
          color="white"
          mb={6}
          textAlign={{ base: "center", md: "start" }}
          fontFamily="inherit"
        >
          {heading}
        </Heading>
        <Text>{children}</Text>
      </Box>
    </PrimaryContainer>
  );
});
