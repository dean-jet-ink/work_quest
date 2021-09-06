import { memo } from "react";
import { Link } from "react-router-dom";

import { guilds } from "../../assets/data/guilds";
import {
  Box,
  Flex,
  List,
  ListItem,
  Image,
  Text,
  Stack,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  HStack,
} from "@chakra-ui/react";

import { SecondaryLayout } from "../templates/SecondaryLayout";
import { TotalTime } from "../molcules/TotalTime";
import guildBg from "../../image/guild_bg.jpg";
import { Chat } from "../molcules/Chat";
import { PrimaryInputText } from "../molcules/forms/PrimaryInputText";
import { PrimaryContainer } from "../atoms/PrimaryContainer";
import { Form, Formik } from "formik";
import { PrimaryButton } from "../atoms/forms/PrimarButton";
import { useChat } from "../../hooks/form/useChat";
import { UserList } from "../organisms/UserList";

export const Guild = memo(() => {
  const guild = guilds[0];
  const user = guilds[0].members[0];
  const { chatContents, initialValues, onSubmit } = useChat(user);
  const tabsBgColor = "#b1967b";
  const tabColumnTextColor = "#500707";
  const tabNonSelectedColor = "#cebfb5";

  console.log(chatContents);

  return (
    <SecondaryLayout>
      <Image src={guildBg} mt={3} w="100%" h="220px" objectFit="cover" />
      <Tabs variant="enclosed" mt="-40px">
        <TabList borderBottom="none">
          <Tab
            _focus={{}}
            color={tabNonSelectedColor}
            _selected={{ bg: tabsBgColor, color: tabColumnTextColor }}
            fontWeight="bold"
          >
            メンバー
          </Tab>
          <Tab
            _focus={{}}
            color={tabNonSelectedColor}
            _selected={{ bg: tabsBgColor, color: tabColumnTextColor }}
            fontWeight="bold"
          >
            メッセージ
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel bg={tabsBgColor} p={{ base: 5, sm: 8 }}>
            <UserList users={guild.members} />
          </TabPanel>

          <TabPanel bg={tabsBgColor} px={0} py={4} minHeight="290px">
            {chatContents.map((chatContent) => {
              if (chatContent.text) {
                return (
                  <Chat key={chatContent.user.user_id} user={chatContent.user}>
                    {chatContent.text}
                  </Chat>
                );
              }
            })}
            <Box position="fixed" bottom="0" w="100%">
              <PrimaryContainer>
                <Box p={4}>
                  <Formik
                    initialValues={initialValues}
                    onSubmit={(values, { resetForm }) => {
                      onSubmit(values);
                      resetForm();
                    }}
                  >
                    {({ isSubmitting }) => (
                      <Form>
                        <Flex justyfy="space-between">
                          <Box w="80%" mr={4}>
                            <PrimaryInputText
                              placeholder="メッセージを入力"
                              name="text"
                            />
                          </Box>
                          <PrimaryButton>送信</PrimaryButton>
                        </Flex>
                      </Form>
                    )}
                  </Formik>
                </Box>
              </PrimaryContainer>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </SecondaryLayout>
  );
});
