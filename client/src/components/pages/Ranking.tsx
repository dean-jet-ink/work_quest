import { memo } from "react";
import { Box, Image } from "@chakra-ui/react";

import { SecondaryLayout } from "../templates/SecondaryLayout";
import { UserList } from "../organisms/UserList";
import coronation from "../../image/coronation.jpg";
import { InfiniteScroller } from "../molcules/InfiniteScroller";
import { useInfiniteScrollUser } from "../../hooks/useInfiniteScrollUser";

export const Ranking = memo(() => {
  const { userList, hasMore, loadMoreUser } = useInfiniteScrollUser();

  return (
    <SecondaryLayout>
      <Image src={coronation} mt={4} w="100%" h="215px" />
      <Box minH="100vh">
        <InfiniteScroller hasMore={hasMore} loadMore={loadMoreUser}>
          <UserList users={userList} />
        </InfiniteScroller>
      </Box>
    </SecondaryLayout>
  );
});
