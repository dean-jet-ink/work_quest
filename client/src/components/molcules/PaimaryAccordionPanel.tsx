import { memo, ReactNode } from "react";
import { Flex, Box, Divider } from "@chakra-ui/react";

import { PrimaryContainer } from "../atoms/PrimaryContainer";

type Props = {
  children: ReactNode[];
};

export const PrimaryAccordionPanel = memo((props: Props) => {
  const { children } = props;

  return (
    <Box
      bg="#f5e8c3"
      mx={1}
      p={{ base: 6, lg: 12 }}
      px={{ xl: "90px" }}
      borderBottomEndRadius={5}
      borderBottomLeftRadius={5}
    >
      <PrimaryContainer>
        <Box color="white" fontWeight="bold" p={5}>
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
