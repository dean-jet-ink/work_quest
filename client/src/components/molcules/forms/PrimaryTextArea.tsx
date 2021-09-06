import { Box, Text, Textarea } from "@chakra-ui/react";
import { useField } from "formik";
import { memo } from "react";

type Props = {
  placeholder?: string;
  name: string;
  children?: string;
};

export const PrimaryTextArea = memo((props: Props) => {
  const [field, meta] = useField(props);
  const { children } = props;

  return (
    <Box>
      <Textarea resize="none" fontSize={{ base: "14px" }} {...field}>
        {children}
      </Textarea>
      {meta.error && meta.touched ? (
        <Text color="red" fontSize="10px" textAlign="start" mt={1}>
          {meta.error}
        </Text>
      ) : null}
    </Box>
  );
});
