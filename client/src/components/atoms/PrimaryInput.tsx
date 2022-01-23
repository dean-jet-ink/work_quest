import { Box, Input, Text } from "@chakra-ui/react";
import { useField } from "formik";

type Props = {
  placeholder: string;
  name: string;
};

export const PrimaryInput = (props: Props) => {
  const [field, meta] = useField(props);

  return (
    <Box>
      <Input
        fontSize="12px"
        type="text"
        borderColor="gray.300"
        {...props}
        {...field}
      />
      {meta.error && meta.touched ? (
        <Text color="red" fontSize="10px" textAlign="start" mt={1}>
          {meta.error}
        </Text>
      ) : null}
    </Box>
  );
};
