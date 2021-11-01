import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import { ReactNode } from "react";

import wood from "../../image/wood.png";

type Props = {
  defaultIndex: 0 | 1;
  tab1: string;
  tab2: string;
  children: ReactNode[];
  onClickTab1?: () => void;
  onClickTab2?: () => void;
};

export const PrimaryTab = (props: Props) => {
  const { defaultIndex, tab1, tab2, children, onClickTab1, onClickTab2 } =
    props;
  const tabColor = "white";
  const tabBg = "#523209";
  const tabNonSelectedColor = "#cebfb5";
  const tabWidth = { md: "180px" };
  const tabHeight = { md: "65px" };

  return (
    <Tabs variant="enclosed" defaultIndex={defaultIndex}>
      <TabList borderBottom="none">
        <Tab
          _focus={{}}
          color={tabNonSelectedColor}
          bg={tabBg}
          _selected={{
            bg: `url(${wood}) no-repeat`,
            color: tabColor,
          }}
          fontWeight="bold"
          fontSize="inherit"
          w={tabWidth}
          h={tabHeight}
          onClick={onClickTab1}
        >
          {tab1}
        </Tab>
        <Tab
          _focus={{}}
          color={tabNonSelectedColor}
          bg={tabBg}
          _selected={{
            bg: `url(${wood}) no-repeat`,
            color: tabColor,
          }}
          fontWeight="bold"
          fontSize="inherit"
          w={tabWidth}
          h={tabHeight}
          onClick={onClickTab2}
        >
          {tab2}
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel
          bg={`url(${wood})`}
          py={{ base: 5, sm: 8, md: "40px", lg: "60px" }}
          px={{ base: 5, sm: 8, md: "40px", lg: "120px", xl: "190px" }}
          minH="50vh"
        >
          {children[0]}
        </TabPanel>
        <TabPanel
          bg={`url(${wood}) `}
          minH="50vh"
          py={{ base: 5, sm: 8, md: "40px", lg: "60px" }}
          px={{ base: 5, sm: 8, md: "40px", lg: "120px", xl: "190px" }}
        >
          {children[1]}
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
