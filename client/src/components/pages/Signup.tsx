import { Box, Center, Flex, Stack } from "@chakra-ui/react";

import { PrimaryButton } from "../atoms/button/PrimarButton";
import { PrimaryInputText } from "../molcules/input/PrimaryInputText";
import { PrimarySelect } from "../molcules/input/PrimarySelect";
import { LoginWrapper } from "../atoms/layout/LoginWrapper";
import { LoginContainer } from "../molcules/layout/LoginContainer";
import { Form, Formik } from "formik";
import { memo } from "react";
import { useSignup } from "../../hooks/form/useSignup";
import { FooterLayout } from "../templates/layout/FooterLayout";

export const Signup = memo(() => {
  const { initialValues, onSubmit, validationSchema } = useSignup();
  const color = "#d2c9c9";

  return (
    <FooterLayout>
      <Box>
        <LoginWrapper color={color}>
          <LoginContainer signup={true} color={color}>
            <Formik
              initialValues={initialValues}
              onSubmit={(values, actions) => onSubmit({ values, actions })}
              validationSchema={validationSchema}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Center>
                    <Box w="100%" maxW="410px">
                      <Stack spacing={{ base: 5, sm: 7 }}>
                        <PrimaryInputText
                          placeholder="ユーザーネーム"
                          name="userName"
                        />
                        <PrimaryInputText
                          placeholder="メールアドレス"
                          name="mail"
                        />
                        <PrimaryInputText
                          placeholder="パスワード"
                          name="pass"
                          type="password"
                        />
                        <PrimaryInputText
                          placeholder="パスワードの確認"
                          name="passConfirm"
                          type="password"
                        />
                        <PrimarySelect
                          placeholder="- 性別 -"
                          name="sex"
                          options={[
                            { value: "male", text: "男性" },
                            { value: "female", text: "女性" },
                          ]}
                        />
                        <Flex w="100%" align="center" justify="center">
                          <Box w="170px">
                            <PrimaryButton isLoading={isSubmitting}>
                              新規登録
                            </PrimaryButton>
                          </Box>
                        </Flex>
                      </Stack>
                    </Box>
                  </Center>
                </Form>
              )}
            </Formik>
          </LoginContainer>
        </LoginWrapper>
      </Box>
    </FooterLayout>
  );
});
