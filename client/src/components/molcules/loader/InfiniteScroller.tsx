import { ReactNode } from "react";
import { Box, Flex, Spinner } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroller";

type Props = {
  hasMore: boolean;
  loadMore: (page: number) => void;
  children: ReactNode;
};

export const InfiniteScroller = (props: Props) => {
  const { hasMore, loadMore, children } = props;

  const loader = (
    <Box key={0}>
      <Flex align="center" justify="center">
        <Spinner
          color="gray.600"
          emptyColor="white"
          size="xl"
          thickness="4px"
        />
      </Flex>
    </Box>
  );

  return (
    <Box w="100%">
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} loader={loader}>
        {children}
      </InfiniteScroll>
    </Box>
  );
};
