import { memo } from "react";
import { Flex, Image } from "@chakra-ui/react";

export const ImageBox = memo((props: { src: string }) => {
  const { src } = props;

  return (
    <Flex justify="center" margin={{ base: "auto" }}>
      <Image src={src} h={{ base: "280px" }} />
    </Flex>
  );
});
