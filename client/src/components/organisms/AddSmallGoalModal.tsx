import { memo } from "react";
import { FormLabel, Flex, HStack, Button, Stack } from "@chakra-ui/react";
import { Formik, Form } from "formik";

import { PrimaryButton } from "../atoms/forms/PrimarButton";
import { PrimaryInputText } from "../molcules/forms/PrimaryInputText";
import { PrimaryModal } from "../molcules/PrimaryModal";
import { Box } from "@chakra-ui/layout";
import { SmallGoal } from "../../types/smallGoal";
import { InitialValuesType } from "../../hooks/useSmallGoal";

type Props = {
  initialValues: InitialValuesType;
  onSubmit: (values: InitialValuesType) => void;
  onClose: () => void;
  isOpen: boolean;
};

export const AddSmallGoalModal = memo((props: Props) => {
  const { initialValues, onSubmit, onClose, isOpen } = props;

  return (
    <PrimaryModal onClose={onClose} isOpen={isOpen}>
      <Box py={{ base: 10 }} px={{ base: 10 }}>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              onSubmit(values);
              setSubmitting(false);
              onClose();
            }, 500);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Stack spacing={5}>
                <FormLabel textAlign="center">
                  スモールゴール名
                  <PrimaryInputText name="smallGoalName" />
                </FormLabel>
                <Flex align="center" justify="center">
                  <HStack spacing="25px">
                    <PrimaryButton isLoading={isSubmitting}>追加</PrimaryButton>
                    <Button
                      borderRadius="unset"
                      colorScheme="whiteAlpha"
                      onClick={onClose}
                    >
                      Cancel
                    </Button>
                  </HStack>
                </Flex>
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>
    </PrimaryModal>
  );
});
