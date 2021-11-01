import { memo } from "react";
import { Flex, Box, Center } from "@chakra-ui/react";
import { FeatureImage } from "../molcules/FeatureImage";
import { FeatureDescription } from "../molcules/FeatureDescription";
import { ReactNode } from "react";

type Props = {
  heading: string;
  children: ReactNode;
  src: string;
};

export const Feature = memo((props: Props) => {
  const { src, heading, children } = props;

  return (
    <Flex
      flexDir={{ base: "column", md: "row" }}
      _even={{ flexDir: { md: "row-reverse" } }}
      px={{ base: "20px", md: "80px" }}
      pt="60px"
      align="center"
    >
      <Box flex={{ md: "40%" }}>
        <FeatureImage src={src} />
      </Box>
      <Box flex={{ md: "60%" }} h="250px">
        <FeatureDescription heading={heading}>{children}</FeatureDescription>
      </Box>
    </Flex>
  );
});
