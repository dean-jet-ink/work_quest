import { Box, Image } from "@chakra-ui/react";
import { memo } from "react";

export const FeatureImage = memo((props: { src: string }) => {
  const { src } = props;

  return (
    <Box w="fit-content" margin="auto">
      <Image src={src} width={{ base: "200px", md: "300px" }} />
    </Box>
  );
});
