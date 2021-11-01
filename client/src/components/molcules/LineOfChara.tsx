import { Box, Text } from "@chakra-ui/react";

import { PrimaryContainer } from "../atoms/PrimaryContainer";

type Props = {
  line: string;
  position: "right" | "bottom";
  width: any;
};

export const LineOfChara = (props: Props) => {
  const { line, position, width } = props;
  const deltaLft = { base: "154px", sm: "180px", md: "220px", lg: "285px" };
  const right = position === "right" ? "block" : "none";
  const bottom = position === "bottom" ? "block" : "none";

  return (
    <PrimaryContainer>
      <Box p={3} position="relative" w={width}>
        {/* delta right */}
        <Box
          d={right}
          position="absolute"
          w={0}
          top="10px"
          left={deltaLft}
          right={0}
          mx="auto"
          border={{
            base: "11px solid transparent",
            lg: "16px solid transparent",
          }}
          borderLeftColor={{ base: "#171923", lg: "#171923" }}
          zIndex={2}
        ></Box>
        <Box
          d={right}
          position="absolute"
          w={0}
          top="6px"
          left={deltaLft}
          right={0}
          mx="auto"
          border={{
            base: "15px solid transparent",
            lg: "21px solid transparent",
          }}
          borderLeftColor={{ base: "white", lg: "white" }}
          zIndex={1}
        ></Box>

        {/* delta bottom */}
        <Box
          d={bottom}
          position="absolute"
          w={0}
          top={{ base: "38px", md: "46px" }}
          right={{ base: "4px" }}
          mx="auto"
          border={{
            base: "11px solid transparent",
            lg: "16px solid transparent",
          }}
          borderTopColor={{ base: "#171923", lg: "#171923" }}
          zIndex={2}
        ></Box>
        <Box
          d={bottom}
          position="absolute"
          w={0}
          top={{ base: "39px", md: "47px" }}
          right={0}
          mx="auto"
          border={{
            base: "15px solid transparent",
            lg: "21px solid transparent",
          }}
          borderTopColor={{ base: "white", lg: "white" }}
          zIndex={1}
        ></Box>

        <Text
          fontSize={{ base: "10px", sm: "12px", md: "15px", lg: "20px" }}
          textAlign="center"
        >
          {line}
        </Text>
      </Box>
    </PrimaryContainer>
  );
};
