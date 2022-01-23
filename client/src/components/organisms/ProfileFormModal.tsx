import { ChangeEvent, memo } from "react";
import { Form, Formik } from "formik";
import { Box, Stack, FormLabel, Flex } from "@chakra-ui/react";
import { OptionalObjectSchema } from "yup/lib/object";

import { PrimaryButton } from "../atoms/forms/PrimarButton";
import { PrimaryModal } from "../molcules/PrimaryModal";
import { PrimaryInputText } from "../molcules/forms/PrimaryInputText";
import { PrimaryInputFile } from "../molcules/forms/PrimaryInputFile";
import { PrimarySelect } from "../molcules/forms/PrimarySelect";
import { PrimaryTextArea } from "../molcules/forms/PrimaryTextArea";
import { User } from "../../types/user";
import { SecondaryButton } from "../atoms/forms/SecondaryButton";
import { useLogout } from "../../hooks/useLogout";
import { useUploadFile } from "../../hooks/useUploadFile";
import { UserInitialValuesType, UserOnSubmitProps } from "../../hooks/useUser";

type Props = {
  user: User;
  initialValues: UserInitialValuesType;
  onSubmit: (props: UserOnSubmitProps) => void;
  validationSchema: OptionalObjectSchema<any>;
  onClose: () => void;
  isOpen: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  src: string;
};

export const ProfileFormModal = memo((props: Props) => {
  const {
    user,
    initialValues,
    onSubmit,
    validationSchema,
    onClose,
    isOpen,
    onChange,
    src,
  } = props;
  const { logout } = useLogout();
  const { selectedFile, handleFile, uploadFile } = useUploadFile();

  return (
    <PrimaryModal onClose={onClose} isOpen={isOpen}>
      <Box py={{ base: 4 }} px={{ base: 10 }}>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              onSubmit({ values, actions });
              uploadFile("member/", user.picture);
            }, 500);
          }}
          validationSchema={validationSchema}
        >
          {({ values, isSubmitting, handleSubmit, setFieldValue }) => (
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
                setFieldValue(
                  "picture",
                  selectedFile ? selectedFile : values.picture
                );
              }}
            >
              <Stack spacing={3}>
                <PrimaryInputFile
                  name="file"
                  src={src}
                  onChange={onChange}
                  handleFile={handleFile}
                />
                <FormLabel fontSize="12px">
                  ユーザー名
                  <PrimaryInputText name="name" />
                </FormLabel>
                <FormLabel fontSize="12px">
                  メールアドレス
                  <PrimaryInputText name="mail" />
                </FormLabel>
                <FormLabel fontSize="12px">
                  性別
                  <PrimarySelect
                    name="sex"
                    options={[
                      { value: "male", text: "男性" },
                      { value: "female", text: "女性" },
                    ]}
                  />
                </FormLabel>
                <FormLabel fontSize="12px">
                  コメント
                  <PrimaryTextArea name="comment"></PrimaryTextArea>
                </FormLabel>
                <Flex justify="center" pt={4}>
                  <PrimaryButton color="facebook" isLoading={isSubmitting}>
                    プロフィールを変更する
                  </PrimaryButton>
                </Flex>
                <Flex justify="center" pt={2}>
                  <SecondaryButton onClick={logout}>ログアウト</SecondaryButton>
                </Flex>
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>
    </PrimaryModal>
  );
});
