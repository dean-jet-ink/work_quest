import { Formik, Form } from "formik";
import { Box, Flex, Stack } from "@chakra-ui/react";

import { PrimaryInputText } from "../../molcules/input/PrimaryInputText";
import { PrimaryButton } from "../../atoms/button/PrimarButton";
import {
  LoginInitialValuesType,
  LoginOnSubmitProps,
} from "../../../hooks/useLogin";
import { OptionalObjectSchema } from "yup/lib/object";

type Props = {
  initialValues: LoginInitialValuesType;
  onSubmit: (props: LoginOnSubmitProps) => void;
  validationSchema: OptionalObjectSchema<any>;
};

export const LoginForm = (props: Props) => {
  const { initialValues, onSubmit, validationSchema } = props;

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => onSubmit({ actions, values })}
      validationSchema={validationSchema}
    >
      {({ isSubmitting }) => (
        <Form>
          <Stack spacing={{ base: 5, sm: 8 }}>
            <Flex w="100%" justify="center">
              <Box w="100%" maxW="410px">
                <PrimaryInputText placeholder="メールアドレス" name="mail" />
              </Box>
            </Flex>
            <Flex w="100%" justify="center">
              <Box w="100%" maxW="410px">
                <PrimaryInputText
                  placeholder="パスワード"
                  name="pass"
                  type="password"
                />
              </Box>
            </Flex>
            <Flex w="100%" align="center" justify="center">
              <Box w="170px">
                <PrimaryButton isLoading={isSubmitting}>ログイン</PrimaryButton>
              </Box>
            </Flex>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};
