import { memo, useEffect } from "react";
import { Box, FormLabel, Stack } from "@chakra-ui/react";
import { Formik, Form } from "formik";

import { Guild } from "../../types/guild";
import { PrimaryModal } from "../molcules/PrimaryModal";
import { PrimaryInputFile } from "../molcules/forms/PrimaryInputFile";
import { useFile } from "../../hooks/useFile";
import noImage from "../../image/no-image.png";
import { PrimaryInputText } from "../molcules/forms/PrimaryInputText";
import { SubmitOrCancel } from "../molcules/forms/SubmitOrCancel";

type Props = {
  initialValues: Guild;
  onSubmit: (values: any) => void;
  onClose: () => void;
  isOpen: boolean;
};

export const AddGuildModal = memo((props: Props) => {
  const { onSubmit, initialValues, onClose, isOpen } = props;
  const { fileLoad, file } = useFile(noImage);

  return (
    <PrimaryModal onClose={onClose} isOpen={isOpen}>
      <Box py={4} px={8}>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            onSubmit(values);
            resetForm();
          }}
        >
          {({ setFieldValue, handleSubmit }) => (
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
                setFieldValue("guildImage", file);
              }}
            >
              <PrimaryInputFile name="file" src={file} onChange={fileLoad} />
              <Stack spacing={5}>
                <FormLabel fontSize="12px" m={0}>
                  ギルド名
                  <PrimaryInputText name="guildName" />
                </FormLabel>
                <FormLabel fontSize="12px" m={0}>
                  コメント
                  <PrimaryInputText name="comment" />
                </FormLabel>
                <SubmitOrCancel onClose={onClose} />
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>
    </PrimaryModal>
  );
});
