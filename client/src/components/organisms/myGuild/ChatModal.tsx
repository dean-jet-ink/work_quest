import { Box } from "@chakra-ui/react";
import { Form, Formik } from "formik";

import { PrimaryButton } from "../../atoms/button/PrimarButton";
import { PrimaryModal } from "../../molcules/popUp/PrimaryModal";
import { PrimaryTextArea } from "../../molcules/input/PrimaryTextArea";

type Props = {
  initialValues: any;
  onSubmit: any;
  onClose: () => void;
  isOpen: boolean;
};

export const ChatModal = (props: Props) => {
  const { initialValues, onSubmit, onClose, isOpen } = props;

  return (
    <PrimaryModal onClose={onClose} isOpen={isOpen}>
      <Box pt={{ base: "45px" }} pb={{ base: 2 }} px={{ base: 4 }}>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, { resetForm }) => {
            onSubmit(values);
            resetForm();
            onClose();
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Box>
                <PrimaryTextArea
                  placeholder="メッセージを入力"
                  name="comment"
                />
              </Box>
              <Box w="fit-content" ml="auto" mt={2}>
                <PrimaryButton>送信</PrimaryButton>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </PrimaryModal>
  );
};
