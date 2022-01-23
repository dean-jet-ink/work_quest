import { memo } from "react";
import { FormLabel, Flex, Stack } from "@chakra-ui/react";
import { Formik, Form } from "formik";

import { PrimaryInputText } from "../molcules/forms/PrimaryInputText";
import { PrimaryModal } from "../molcules/PrimaryModal";
import { Box } from "@chakra-ui/layout";
import { SmallGoal } from "../../types/smallGoal";
import { SmallGoalUpdateProps } from "../../hooks/useSmallGoal";
import { OptionalObjectSchema } from "yup/lib/object";
import { SubmitOrCancel } from "../molcules/forms/SubmitOrCancel";

type Props = {
  smallGoal: SmallGoal;
  onSubmit: (props: SmallGoalUpdateProps) => void;
  validationSchema: OptionalObjectSchema<any>;
  onClose: () => void;
  isOpen: boolean;
};

export const EditSmallGoalModal = memo((props: Props) => {
  const { smallGoal, onSubmit, validationSchema, onClose, isOpen } = props;

  return (
    <PrimaryModal onClose={onClose} isOpen={isOpen}>
      <Box py={{ base: 10 }} px={{ base: 10 }}>
        <Formik
          initialValues={{
            smallGoalName: smallGoal.smallGoalName,
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              onSubmit({ values, smallGoalId: smallGoal.id });
              setSubmitting(false);
              onClose();
            }, 500);
          }}
          validationSchema={validationSchema}
        >
          {({ isSubmitting }) => (
            <Form>
              <Stack spacing={5}>
                <FormLabel textAlign="center">
                  スモールゴール名
                  <PrimaryInputText name="smallGoalName" />
                </FormLabel>
                <Flex align="center" justify="center">
                  <SubmitOrCancel
                    onClose={onClose}
                    isLoading={isSubmitting}
                    text="編集"
                  />
                </Flex>
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>
    </PrimaryModal>
  );
});
