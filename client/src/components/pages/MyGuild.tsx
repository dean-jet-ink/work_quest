import { memo } from "react";
import {
  Box,
  Flex,
  Image,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";

import { SecondaryLayout } from "../templates/SecondaryLayout";
import guildBg from "../../image/guild_bg.jpg";
import { Chat } from "../molcules/Chat";
import { PrimaryInputText } from "../molcules/forms/PrimaryInputText";
import { PrimaryContainer } from "../atoms/PrimaryContainer";
import { Form, Formik } from "formik";
import { PrimaryButton } from "../atoms/forms/PrimarButton";
import { useChat } from "../../hooks/form/useChat";
import { UserList } from "../organisms/UserList";
import { useParams } from "react-router-dom";
import { useGuild } from "../../hooks/useGuild";
import { useFetchGuildMembers } from "../../hooks/useFetchGuildMembers";
import { useLoginUser } from "../../hooks/useLoginUser";

export const MyGuild = memo(() => {
  const { id } = useParams<{ id: string }>();
  const { loginUserId } = useLoginUser();
  const { guildMembers } = useFetchGuildMembers(Number(id));
  const { guild } = useGuild(Number(id));
  const { chat, initialValues, onSubmit } = useChat({
    guildId: Number(id),
    userId: loginUserId as number,
  });
  const tabsBgColor = "#b1967b";
  const tabColumnTextColor = "#500707";
  const tabNonSelectedColor = "#cebfb5";

  console.log(chat);

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
            <UserList users={guildMembers} />
          </TabPanel>

          <TabPanel bg={tabsBgColor} px={0} py={4} minHeight="290px">
            {chat.map((item) => {
              if (item.commnet) {
                return (
                  <Chat
                    key={item.chatId}
                    loginUserId={loginUserId as number}
                    userId={item.userId}
                    members={guildMembers}
                  >
                    {item.commnet}
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
                              name="comment"
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
