import { memo } from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { PrimaryContainer } from "../atoms/PrimaryContainer";

import ranking from "../../image/ranking-rank1.png";
import guild from "../../image/guild.png";
import report from "../../image/report.png";

type Item = {
  itemName: string;
  src: string;
  path: string;
};

const headerItems: Array<Item> = [
  {
    itemName: "ランキング",
    src: ranking,
    path: "/top/ranking",
  },
  {
    itemName: "ギルド",
    src: guild,
    path: "/top/guildlist",
  },
  {
    itemName: "レポート",
    src: report,
    path: "/top/report",
  },
];

type Props = {
  onClick: () => void;
  src: string;
};

export const Header = memo((props: Props) => {
  const { onClick, src } = props;

  return (
    <Box mt={3} mx={2}>
      <PrimaryContainer>
        <Flex
          py={{ base: 3, md: 5 }}
          px={{ base: 5, md: 8 }}
          align="center"
          justify="space-between"
        >
          <Box cursor="pointer" onClick={onClick}>
            <Image
              src={src}
              borderRadius="50%"
              w="50px"
              h="50px"
              objectFit="cover"
            />
          </Box>
          <Flex align="center" justify="space-around">
            {headerItems.map((item) => (
              <Flex
                key={item.itemName}
                align="center"
                justify="center"
                flexDir="column"
                ml={{ base: 6, md: 10, lg: 20 }}
                color="whiteAlpha.800"
                cursor="pointer"
              >
                <Link to={item.path}>
                  <Text d={{ base: "none", md: "block" }}>{item.itemName}</Text>
                  <Image src={item.src} w="40px" />
                </Link>
              </Flex>
            ))}
          </Flex>
        </Flex>
      </PrimaryContainer>
    </Box>
  );
});
