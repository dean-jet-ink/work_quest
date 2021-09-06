import { Box, Select, Text } from "@chakra-ui/react";
import { useField } from "formik";

type Props = {
  placeholder?: string;
  name: string;
  options: Array<{
    value: string;
    text: string;
  }>;
};

export const PrimarySelect = (props: Props) => {
  const { placeholder, name, options } = props;
  const [field, meta] = useField(name);

  return (
    <Box>
      <Select {...field} placeholder={placeholder}>
        {options.map((option) => {
          const { value, text } = option;
          return (
            <option key={value} value={value}>
              {text}
            </option>
          );
        })}
      </Select>
      {meta.error && meta.touched ? (
        <Text color="red" fontSize="10px" textAlign="start" mt={1}>
          {meta.error}
        </Text>
      ) : null}
    </Box>
  );
};
