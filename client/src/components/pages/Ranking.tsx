import { memo } from "react";
import { Box, Flex, Image } from "@chakra-ui/react";

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
          <Flex align="center" justify="center" pt={4}>
            <Flex align="center" justify="center">
              <Box h="fit-content" textAlign="center">
                <LineOfChara
                  line="頑張ってくださいね！"
                  position="right"
                  width={{
                    base: "154px",
                    sm: "180px",
                    md: "220px",
                    lg: "285px",
                  }}
                />
              </Box>
            </Flex>
            <Flex justify="center" align="center">
              <Image
                src={queen}
                w={{ base: "120px", lg: "145px" }}
                h={{ base: "160px", lg: "190px" }}
              />
            </Flex>
          </Flex>
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
