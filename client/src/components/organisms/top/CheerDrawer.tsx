import { Box, Tabs, Tab, TabList, TabPanels, TabPanel } from "@chakra-ui/react";

import { User } from "../../../types/user";
import { UserList } from "../_common/UserList";
import { PrimaryDrawer } from "../../molcules/display/PrimaryDrawer";
import { PrimaryContainer } from "../../atoms/layout/PrimaryContainer";

type Props = {
  cheerings: User[];
  listCheered: User[];
  onClose: () => void;
  isOpen: boolean;
};

export const CheerDrawer = (props: Props) => {
  const { cheerings, listCheered, onClose, isOpen } = props;
  const color = "#b3b3b3";
  const selectedColor = "#cf6a2fb5";
  const selectedBg = "#f9be51bf";
  const userListBg = "#6a6ca673";

  return (
    <PrimaryDrawer onClose={onClose} isOpen={isOpen} placement="right">
      <PrimaryContainer>
        <Box minH="100vh" py={10} textAlign="center">
          <Tabs variant="unstyled" align="center">
            <TabList
              bg="#d7d7d7"
              w="fit-content"
              borderRadius="20px"
              fontSize={{ base: "18px", lg: "20px" }}
            >
              <Tab
                _focus={{}}
                color={color}
                _selected={{ bg: selectedBg, color: selectedColor }}
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
                color={color}
                _selected={{ bg: selectedBg, color: selectedColor }}
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
                <UserList users={cheerings} bg={userListBg} />
              </TabPanel>
              <TabPanel py={8}>
                <UserList users={listCheered} bg={userListBg} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </PrimaryContainer>
    </PrimaryDrawer>
  );
};
