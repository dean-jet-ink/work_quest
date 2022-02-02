import { Box, Input, Text } from "@chakra-ui/react";
import { useField } from "formik";

type Props = {
  name: string;
  placeholder?: string;
  type?: string;
};

export const PrimaryInputText = (props: Props) => {
  const [field, meta] = useField(props);
  const { placeholder = "", type = "text" } = props;

  return (
    <Box>
      <Input
        fontSize="12px"
        borderColor="gray.300"
        placeholder={placeholder}
        type={type}
        {...field}
      />
      {meta.error && meta.touched ? (
        <Text
          color="red"
          fontSize={{ base: "10px", md: "12px" }}
          textAlign="start"
          mt={1}
        >
          {meta.error}
        </Text>
      ) : null}
    </Box>
  );
};
