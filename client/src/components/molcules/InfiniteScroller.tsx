import { ReactNode } from "react";
import { Box, Spinner } from "@chakra-ui/react";
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
      <Spinner color="blue.500" emptyColor="gray.200" />
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
