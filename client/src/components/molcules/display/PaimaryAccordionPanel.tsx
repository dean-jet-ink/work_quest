import { memo, ReactNode } from "react";
import { Flex, Box, Divider } from "@chakra-ui/react";

import { PrimaryContainer } from "../../atoms/layout/PrimaryContainer";

type Props = {
  children: ReactNode[];
};

export const PrimaryAccordionPanel = memo((props: Props) => {
  const { children } = props;

  return (
    <Box w="235px" mx="auto" mb="10px" fontSize={{ base: "14px", md: "16px" }}>
      <PrimaryContainer>
        <Box p={{ base: 2 }}>
          <Flex align="center" justify="space-around">
            <Flex align="center" justify="center" w="50%">
              {children[0]}
            </Flex>
            <Flex align="center" justify="center" w="50%">
              {children[1]}
            </Flex>
          </Flex>
          <Divider my={1} borderColor="transparent" />
          <Flex align="center" justify="space-around">
            <Flex align="center" justify="center" w="50%">
              {children[2]}
            </Flex>
            <Flex align="center" justify="center" w="50%">
              {children[3]}
            </Flex>
          </Flex>
        </Box>
      </PrimaryContainer>
    </Box>
  );
});
