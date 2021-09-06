import { memo } from "react";
import { FormLabel, Stack } from "@chakra-ui/react";
import { Formik, Form } from "formik";

import { PrimaryInputText } from "../molcules/forms/PrimaryInputText";
import { PrimaryModal } from "../molcules/PrimaryModal";
import { Box } from "@chakra-ui/layout";
import { SubmitOrCancel } from "../molcules/forms/SubmitOrCancel";
import { WorkInitialValuesType, WorkOnSubmitProps } from "../../hooks/useWorks";

type Props = {
  initialValues: WorkInitialValuesType;
  onSubmit: (values: WorkOnSubmitProps) => void;
  onClose: () => void;
  isOpen: boolean;
};

export const AddWorkModal = memo((props: Props) => {
  const { initialValues, onSubmit, onClose, isOpen } = props;

  return (
    <PrimaryModal onClose={onClose} isOpen={isOpen}>
      <Box py={{ base: 10 }} px={{ base: 10 }}>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              onSubmit({ values });
              setSubmitting(false);
              onClose();
            }, 500);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Stack spacing={5}>
                <FormLabel textAlign="center">
                  ワーク名
                  <PrimaryInputText name="workName" />
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
