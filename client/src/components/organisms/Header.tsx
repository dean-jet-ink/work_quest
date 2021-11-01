import { memo } from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { PrimaryContainer } from "../atoms/PrimaryContainer";

import ranking from "../../image/rank1.png";
import guild from "../../image/guild.png";
import report from "../../image/report.png";
import { CheerButton } from "../molcules/CheerButton";

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
    path: "/top/guild",
  },
  {
    itemName: "レポート",
    src: report,
    path: "/top/report",
  },
];

type Props = {
  onOpenProfile: () => void;
  onOpenCheer: () => void;
  src: string;
};

export const Header = memo((props: Props) => {
  const { onOpenProfile, onOpenCheer, src } = props;

  return (
    <PrimaryContainer>
      <Flex
        py={{ base: 3, md: 5 }}
        px={{ base: 5, md: 8 }}
        align="center"
        justify="space-between"
      >
        <Box cursor="pointer" onClick={onOpenProfile}>
          <Image
            src={src}
            borderRadius="50%"
            boxSize={{ base: "50px", md: "60px" }}
            objectFit="cover"
          />
        </Box>
        <Text
          d={{ base: "none", md: "block" }}
          color="white"
          fontSize={{ md: "35px", lg: "42px" }}
          ml="15%"
        >
          Work Quest
        </Text>
        <Flex align="center" justify="space-between">
          <CheerButton onOpenCheer={onOpenCheer} />
          {headerItems.map((item) => (
            <Flex
              key={item.itemName}
              align="center"
              justify="center"
              flexDir="column"
              ml={{ base: 6, md: 10 }}
              color="whiteAlpha.800"
              cursor="pointer"
            >
              <Link to={item.path}>
                <Image src={item.src} w={{ base: "30px", md: "40px" }} />
              </Link>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </PrimaryContainer>
  );
});
