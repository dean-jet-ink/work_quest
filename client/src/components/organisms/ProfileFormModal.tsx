import { ChangeEvent, memo, Dispatch, SetStateAction } from "react";
import { Form, Formik } from "formik";
import { Box, Stack, FormLabel, Flex } from "@chakra-ui/react";

import { PrimaryButton } from "../atoms/forms/PrimarButton";
import { PrimaryModal } from "../molcules/PrimaryModal";
import { PrimaryInputText } from "../molcules/forms/PrimaryInputText";
import { PrimaryInputFile } from "../molcules/forms/PrimaryInputFile";

import { PrimarySelect } from "../molcules/forms/PrimarySelect";
import { PrimaryTextArea } from "../molcules/forms/PrimaryTextArea";
import { User } from "../../types/user";
import { useProfile } from "../../hooks/form/useProfile";
import { SecondaryButton } from "../atoms/forms/SecondaryButton";
import { useLogout } from "../../hooks/useLogout";
import { useUploadFile } from "../../hooks/useUploadFile";

type Props = {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  onClose: () => void;
  isOpen: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  src: string;
};

export const ProfileFormModal = memo((props: Props) => {
  const { user, setUser, onClose, isOpen, onChange, src } = props;
  const { initialValues, onSubmit, validationSchema } = useProfile(
    user,
    setUser
  );
  const { logout } = useLogout();
  const { selectedFile, handleFile, uploadFile } = useUploadFile();

  return (
    <PrimaryModal onClose={onClose} isOpen={isOpen}>
      <Box py={{ base: 4 }} px={{ base: 10 }}>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            onSubmit({ values, actions });
            uploadFile("member/", user.picture);
          }}
          validationSchema={validationSchema}
        >
          {({ isSubmitting, handleSubmit, setFieldValue }) => (
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
                setFieldValue("picture", selectedFile);
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
                  アバターの性別
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
                  <PrimaryTextArea name="comment">頑張ります！</PrimaryTextArea>
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
