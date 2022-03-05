import { Box, Text } from "@chakra-ui/react";

import { SecondaryContainer } from "../../atoms/layout/SecondaryContainer";

type Props = {
  line: any;
  position: "right" | "bottom" | "left";
  width: any;
};

export const LineOfChara = (props: Props) => {
  const { line, position, width } = props;
  const deltaLft = { base: "154px", sm: "180px", md: "220px", lg: "285px" };
  const right = position === "right" ? "block" : "none";
  const bottom = position === "bottom" ? "block" : "none";
  const left = position === "left" ? "block" : "none";

  return (
    <SecondaryContainer>
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
          border="11px solid transparent"
          borderLeftColor="gray.800"
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
          border="15px solid transparent"
          borderLeftColor="#dadada"
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
          border="11px solid transparent"
          borderTopColor="gray.800"
          zIndex={2}
        ></Box>
        <Box
          d={bottom}
          position="absolute"
          w={0}
          top={{ base: "39px", md: "47px" }}
          right={0}
          mx="auto"
          border="15px solid transparent"
          borderTopColor="#dadada"
          zIndex={1}
        ></Box>

        {/* delta left */}
        <Box
          d={left}
          position="absolute"
          w={0}
          top={{ base: "22px" }}
          left={{ base: "-22px" }}
          mx="auto"
          border="11px solid transparent"
          borderRightColor="gray.800"
          zIndex={2}
        ></Box>
        <Box
          d={left}
          position="absolute"
          w={0}
          top={{ base: "18px" }}
          left={{ base: "-31px" }}
          mx="auto"
          border="15px solid transparent"
          borderRightColor="#dadada"
          zIndex={1}
        ></Box>

        <Text fontSize={{ base: "10px", sm: "12px", md: "15px", lg: "16px" }}>
          {line}
        </Text>
      </Box>
    </SecondaryContainer>
  );
};
