import { ChangeEvent, memo } from "react";
import { Form, Formik } from "formik";
import { Box, Stack, FormLabel, Flex } from "@chakra-ui/react";
import { OptionalObjectSchema } from "yup/lib/object";

import { PrimaryButton } from "../../atoms/button/PrimarButton";
import { PrimaryModal } from "../../molcules/popUp/PrimaryModal";
import { PrimaryInputText } from "../../molcules/input/PrimaryInputText";
import { PrimaryInputFile } from "../../molcules/input/PrimaryInputFile";
import { PrimarySelect } from "../../molcules/input/PrimarySelect";
import { PrimaryTextArea } from "../../molcules/input/PrimaryTextArea";
import { User } from "../../../types/user";
import { SecondaryButton } from "../../atoms/button/SecondaryButton";
import { useLogout } from "../../../hooks/useLogout";
import {
  UserInitialValuesType,
  UserOnSubmitProps,
} from "../../../hooks/useUser";
import { generateFileNameWithHash } from "../../../utils/generateFileNameWithHash";

type Props = {
  user: User;
  initialValues: UserInitialValuesType;
  onSubmit: (props: UserOnSubmitProps) => void;
  validationSchema: OptionalObjectSchema<any>;
  onClose: () => void;
  isOpen: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  formSrc: string;
  file: string;
  selectedFile: File | null;
  handleFile: (e: ChangeEvent<HTMLInputElement>) => void;
  uploadFile: (newFile: string | null, preFile: string | null) => void;
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
    formSrc,
    file,
    selectedFile,
    handleFile,
    uploadFile,
  } = props;
  const { logout } = useLogout();

  return (
    <PrimaryModal onClose={onClose} isOpen={isOpen}>
      <Box py={{ base: 4 }} px={{ base: 10 }}>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            setTimeout(async () => {
              await uploadFile(values.picture, user.picture);
              await onSubmit({ values, actions });
            }, 500);
          }}
          validationSchema={validationSchema}
        >
          {({ isSubmitting, handleSubmit, setFieldValue }) => (
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
                setFieldValue(
                  "picture",
                  selectedFile
                    ? generateFileNameWithHash(selectedFile)
                    : user.picture
                );
              }}
            >
              <Stack spacing={2}>
                <PrimaryInputFile
                  name="file"
                  src={formSrc}
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
                <Flex justify="center" align="center">
                  <PrimaryButton
                    fontSize="14px"
                    color="facebook"
                    isLoading={isSubmitting}
                  >
                    プロフィールを変更する
                  </PrimaryButton>
                </Flex>
                <Flex justify="center" pt={2}>
                  <SecondaryButton fontSize="14px" onClick={logout}>
                    ログアウト
                  </SecondaryButton>
                </Flex>
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>
    </PrimaryModal>
  );
});
