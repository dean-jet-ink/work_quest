import { memo } from "react";
import { Box, FormLabel, Stack } from "@chakra-ui/react";
import { Formik, Form } from "formik";

import { PrimaryModal } from "../molcules/PrimaryModal";
import { PrimaryInputFile } from "../molcules/forms/PrimaryInputFile";
import { useFile } from "../../hooks/useFile";
import noImage from "../../image/no-image.png";
import { PrimaryInputText } from "../molcules/forms/PrimaryInputText";
import { SubmitOrCancel } from "../molcules/forms/SubmitOrCancel";
import {
  GuildInitialValuesType,
  GuildOnSubmitProps,
} from "../../hooks/form/useGuildList";
import { useUploadFile } from "../../hooks/useUploadFile";
import { OptionalObjectSchema } from "yup/lib/object";

type Props = {
  initialValues: GuildInitialValuesType;
  onSubmit: (props: GuildOnSubmitProps) => void;
  onClose: () => void;
  isOpen: boolean;
  validationSchema: OptionalObjectSchema<any>;
};

export const AddGuildModal = memo((props: Props) => {
  const { onSubmit, initialValues, onClose, isOpen, validationSchema } = props;
  const { fileLoad, file, setFile } = useFile(noImage);
  const { selectedFile, setSelectedFile, handleFile, uploadFile } =
    useUploadFile();

  return (
    <PrimaryModal onClose={onClose} isOpen={isOpen}>
      <Box py={4} px={8}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              onSubmit({ values, setSubmitting });
              uploadFile("guild/");
              setFile(noImage);
              setSelectedFile(null);
              onClose();
            }, 500);
          }}
        >
          {({ isSubmitting, setFieldValue, handleSubmit }) => (
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
                setFieldValue(
                  "guildPicture",
                  selectedFile ? selectedFile : null
                );
              }}
            >
              <PrimaryInputFile
                name="file"
                src={file}
                onChange={fileLoad}
                handleFile={handleFile}
              />
              <Stack spacing={5}>
                <FormLabel fontSize="12px" m={0}>
                  ギルド名
                  <PrimaryInputText name="guildName" />
                </FormLabel>
                <FormLabel fontSize="12px" m={0}>
                  コメント
                  <PrimaryInputText name="comment" />
                </FormLabel>
                <SubmitOrCancel onClose={onClose} isLoading={isSubmitting} />
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>
    </PrimaryModal>
  );
});
