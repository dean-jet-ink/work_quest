import { Box, Input, Text } from "@chakra-ui/react";
import { useField } from "formik";

type Props = {
  name: string;
  placeholder?: string;
  type?: string;
  bg?: string;
  color?: string;
};

export const PrimaryInputText = (props: Props) => {
  const [field, meta] = useField(props);
  const {
    placeholder = "",
    type = "text",
    bg = "e7e7e7",
    color = "#5b5b5b",
  } = props;

  return (
    <Box w="100%">
      <Input
        fontSize="16px"
        borderColor="gray.300"
        bg={bg}
        color={color}
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
