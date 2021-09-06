import { Flex } from "@chakra-ui/react";
import { memo } from "react";
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
      pt="60px"
      _even={{ flexDir: { md: "row-reverse" } }}
      px={{ base: "20px", md: "80px" }}
    >
      <FeatureImage src={src} />
      <FeatureDescription heading={heading}>{children}</FeatureDescription>
    </Flex>
  );
});
