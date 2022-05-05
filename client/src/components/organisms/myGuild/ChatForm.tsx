import { Box, Flex } from "@chakra-ui/react";
import { Form, Formik } from "formik";

import { PrimaryButton } from "../../atoms/button/PrimarButton";
import { PrimaryTextArea } from "../../molcules/input/PrimaryTextArea";

type Props = {
  initialValues: any;
  onSubmit: any;
};

export const ChatForm = (props: Props) => {
  const { initialValues, onSubmit } = props;
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        resetForm();
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Flex align="center">
            <Box
              w="100%"
              _hover={{ shadow: "2px 4px 10px 0 rgb(0 0 0 / 60%)" }}
              bg="white"
              border="1px solid gray.300"
              borderRadius="6px"
            >
              <PrimaryTextArea
                placeholder="メッセージを入力"
                name="comment"
                rows={2}
                border="unset"
                borderColor="unset"
                shadow="unset"
                color="#3e3e3e"
                fontSize={{ base: "16px", xl: "20px" }}
              />
            </Box>
            <Box
              w="fit-content"
              ml={2}
              fontSize={{ base: "15px", md: "18px", xl: "20px" }}
            >
              <PrimaryButton>送信</PrimaryButton>
            </Box>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};
