import { Box, Tabs, Tab, TabList, TabPanels, TabPanel } from "@chakra-ui/react";

import { User } from "../../types/user";
import { UserList } from "./UserList";
import { PrimaryDrawer } from "../molcules/PrimaryDrawer";

type Props = {
  cheerings: User[];
  listCheered: User[];
  onClose: () => void;
  isOpen: boolean;
};

export const CheerDrawer = (props: Props) => {
  const { cheerings, listCheered, onClose, isOpen } = props;

  return (
    <PrimaryDrawer onClose={onClose} isOpen={isOpen} placement="right">
      <Box bg="#f0e8d8" minH="100vh" py={10} textAlign="center">
        <Tabs variant="unstyled" align="center">
          <TabList
            bg="#d7d7d7"
            w="fit-content"
            borderRadius="20px"
            fontSize={{ base: "18px", lg: "20px" }}
          >
            <Tab
              _focus={{}}
              color="#b3b3b3"
              _selected={{ bg: "#fad686c9", color: "#b85032" }}
              fontWeight="bold"
              fontSize="inherit"
              borderTopLeftRadius="20px"
              borderBottomLeftRadius="20px"
              w="50%"
            >
              Cheer
            </Tab>
            <Tab
              _focus={{}}
              color="#b3b3b3"
              _selected={{ bg: "#fad686c9", color: "#b85032" }}
              fontWeight="bold"
              fontSize="inherit"
              borderTopRightRadius="20px"
              borderBottomRightRadius="20px"
              w="50%"
            >
              Cheered
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel py={8}>
              <UserList users={cheerings} />
            </TabPanel>
            <TabPanel py={8}>
              <UserList users={listCheered} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </PrimaryDrawer>
  );
};
