import { memo } from "react";
import { Box, Image } from "@chakra-ui/react";

import { SecondaryLayout } from "../templates/layout/SecondaryLayout";
import { UserList } from "../organisms/_common/UserList";
import queen from "../../image/queen.png";
import { InfiniteScroller } from "../molcules/loader/InfiniteScroller";
import { useInfiniteScrollUser } from "../../hooks/useInfiniteScrollUser";
import { LineOfChara } from "../molcules/layout/LineOfChara";
import palace from "../../image/palace.jpg";

export const Ranking = memo(() => {
  const { userList, hasMore, loadMoreUser } = useInfiniteScrollUser();

  return (
    <Box bg={`center/cover url(${palace}) no-repeat`} bgAttachment="fixed">
      <Box bg="#00000052">
        <SecondaryLayout>
          <Box
            position="relative"
            mx="auto"
            w={{ sm: "500px" }}
            h={{ base: "231px", lg: "261px" }}
          >
            <Box
              position="absolute"
              top={{ base: "65px" }}
              left={{ base: "5px", sm: "38px", md: "-10px", lg: "-110px" }}
              zIndex={1}
            >
              <LineOfChara
                line="せいぜい頑張んなさい!"
                position="right"
                width={{ base: "154px", sm: "180px", md: "220px", lg: "285px" }}
              />
            </Box>
            <Box position="absolute" right={{ base: "0", sm: "30px" }}>
              <Image
                src={queen}
                mt={4}
                boxSize={{ base: "250px", lg: "280px" }}
                mr={{ base: "unset", md: "auto" }}
                ml={{ base: "auto", md: "auto" }}
              />
            </Box>
          </Box>
          <Box minH="100vh">
            <Box px={{ md: "40px", lg: "120px", xl: "220px" }}>
              <InfiniteScroller hasMore={hasMore} loadMore={loadMoreUser}>
                <UserList users={userList} isRanking={true} />
              </InfiniteScroller>
            </Box>
          </Box>
        </SecondaryLayout>
      </Box>
    </Box>
  );
});
