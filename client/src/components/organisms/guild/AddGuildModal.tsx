import { memo } from "react";
import { Box, FormLabel, Stack } from "@chakra-ui/react";
import { Formik, Form } from "formik";

import { PrimaryModal } from "../../molcules/popUp/PrimaryModal";
import { PrimaryInputFile } from "../../molcules/input/PrimaryInputFile";
import { useFormFile } from "../../../hooks/useFormFile";
import { PrimaryInputText } from "../../molcules/input/PrimaryInputText";
import { SubmitOrCancel } from "../../molcules/button/SubmitOrCancel";
import {
  GuildInitialValuesType,
  GuildOnSubmitProps,
} from "../../../hooks/form/useGuildList";
import { useFile } from "../../../hooks/useFile";
import { OptionalObjectSchema } from "yup/lib/object";
import { generateFileNameWithHash } from "../../../utils/generateFileNameWithHash";
import noImage from "../../../image/no-image.png";

type Props = {
  initialValues: GuildInitialValuesType;
  onSubmit: (props: GuildOnSubmitProps) => void;
  onClose: () => void;
  isOpen: boolean;
  validationSchema: OptionalObjectSchema<any>;
};

export const AddGuildModal = memo((props: Props) => {
  const { onSubmit, initialValues, onClose, isOpen, validationSchema } = props;
  const { file, selectedFile, setSelectedFile, handleFile, uploadFile } =
    useFile({ key: "guild", picture: null });
  const { fileLoad, formFile, setFormFile } = useFormFile(file);

  return (
    <PrimaryModal onClose={onClose} isOpen={isOpen}>
      <Box py={4} px={8}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(async () => {
              await uploadFile(values.guildPicture);
              await onSubmit({ values, setSubmitting });
              await setSelectedFile(null);
              await setFormFile(noImage);
              await onClose();
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
                  selectedFile ? generateFileNameWithHash(selectedFile) : null
                );
              }}
            >
              <PrimaryInputFile
                name="file"
                src={formFile}
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
