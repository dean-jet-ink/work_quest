import { Flex, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import ranking from "../../../assets/image/rank1.png";
import guild from "../../../assets/image/guild.png";
import report from "../../../assets/image/report.png";

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

export const HeaderItems = () => {
  return (
    <>
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
    </>
  );
};
