import { memo, VFC } from "react";
import { Box, Stack, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";

import { useLogin } from "../../hooks/form/useLogin";

import { PrimaryButton } from "../atoms/forms/PrimarButton";
import { PrimaryInputText } from "../molcules/forms/PrimaryInputText";
import { SpanFontWeight } from "../atoms/SpanFontWeight";
import { LoginHeaderContainer } from "../molcules/LoginHeaderContainer";
import { LoginHeaderForm } from "../molcules/LoginHeaderForm";
import { DownArrow } from "../molcules/DownArrow";
import { CTA } from "../molcules/CTA";
import { Feature } from "../organisms/Feature";
import { Column } from "../organisms/Column";
import yuusya from "../../image/yuusya.png";
import party from "../../image/party.png";
import treasure from "../../image/treasure.png";
import rare_enemy from "../../image/rare_enemy.png";
import enemy from "../../image/enemy.png";
import { FooterLayout } from "../templates/FooterLayout";
import { PrimaryWrapper } from "../atoms/PrimaryWrapper";

export const Login: VFC = memo(() => {
  const { initialValues, onSubmit, validationSchema } = useLogin();

  return (
    <FooterLayout>
      <LoginHeaderContainer>
        <LoginHeaderForm signup={false}>
          <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => onSubmit({ actions, values })}
            validationSchema={validationSchema}
          >
            {({ isSubmitting }) => (
              <Form>
                <Stack spacing={5}>
                  <PrimaryInputText placeholder="メールアドレス" name="mail" />
                  <PrimaryInputText
                    placeholder="パスワード"
                    name="pass"
                    type="password"
                  />
                  <PrimaryButton isLoading={isSubmitting}>
                    ログイン
                  </PrimaryButton>
                </Stack>
              </Form>
            )}
          </Formik>
        </LoginHeaderForm>
        <DownArrow />
      </LoginHeaderContainer>

      <PrimaryWrapper>
        <Box
          px="50px"
          pt={{ base: "55px", md: "80px" }}
          pb={{ base: "40px", md: "60px" }}
          mx={{ base: "-10px", md: "-32px", lg: "-56px", xl: "-140px" }}
          mt={{ base: "-30px", md: "-50px" }}
          textAlign="center"
          color="white"
          bg="#d7c1b4"
        >
          <Text
            as="h1"
            fontSize={{ base: "18px", md: "25px" }}
            fontWeight="bold"
          >
            勉強や作業を、楽しく継続！
          </Text>
        </Box>

        <Box mt="100px" px={{ sm: "30px", md: "0" }}>
          <Stack spacing={{ base: "180px", md: "220px", xl: "275px" }}>
            <Box>
              <Column title="ゲーミフィケーション" left="15px">
                ゲーミフィケーションとは、面倒な作業やつまらない勉強を、
                <SpanFontWeight>ゲームに置き換えて楽しむ技術</SpanFontWeight>
                のことです。
                <br />
                ここでは
                <SpanFontWeight>「可視化」「目標」</SpanFontWeight>
                の２つの要素でそれを実現しています。
              </Column>
              <Stack spacing={{ base: "80px", md: "40px" }}>
                <Feature src={yuusya} heading="「可視化」">
                  タスクをこなすと、それに応じた経験値を獲得し、アバターがレベルアップします。レベルに応じて、見た目や称号も変化していきます。また、作業時間による、他のユーザーとのランキングを見ることができます。
                </Feature>
                <Feature src={party} heading="「目標」">
                  先ずは、何か1つの目標を
                  <SpanFontWeight>「Work」</SpanFontWeight>
                  に定め、そこから「Work」達成のための小さな目標を
                  <SpanFontWeight>「スモールゴール」</SpanFontWeight>
                  に定めていきます。
                  <br />
                  こうすることで、目標までの道のりが明確になり、モチベーションが持続しやすくなります。
                </Feature>
              </Stack>
            </Box>
            <Box>
              <Column title="ポモドーロテクニック" left="15px">
                ポモドーロテクニックとは、イタリアのフランチェスコさんが開発した、
                <SpanFontWeight>集中力を持続させる勉強方法</SpanFontWeight>
                のことです。
              </Column>
              <Stack spacing={{ base: "80px", md: "40px" }}>
                <Feature src={enemy} heading="「(25分＋5分)×4」">
                  25分（作業）と5分（休憩）を1セットとして、4セットごとに15分の休憩があります。
                  1セットごとに敵が出現し、終えると敵を倒し、経験値を獲得します。
                </Feature>
                <Feature src={rare_enemy} heading="「レアキャラ出現」">
                  一定の確率でレアキャラが出現します。その日のセット数が増えるほど、レアキャラの出現率が高くなり、倒すと多くの経験値を獲得します。
                </Feature>
              </Stack>
            </Box>
            <Box>
              <Column title="その他の機能">
                この他にも、<SpanFontWeight>「ギルド」</SpanFontWeight>
                というチーム機能や、他のユーザーへの
                <SpanFontWeight>応援</SpanFontWeight>などの機能があります。
              </Column>
            </Box>
          </Stack>
        </Box>

        <Box pb={{ base: "60px", md: "90px" }}>
          <CTA />
        </Box>
      </PrimaryWrapper>
    </FooterLayout>
  );
});
