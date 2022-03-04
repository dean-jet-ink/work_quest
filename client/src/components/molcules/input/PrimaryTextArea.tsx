import { Box, Text, Textarea } from "@chakra-ui/react";
import { useField } from "formik";
import { memo } from "react";

type Props = {
  placeholder?: string;
  name: string;
  children?: string;
  rows?: number;
  bg?: string;
  border?: string;
  borderColor?: string;
  shadow?: string;
  color?: string;
  fontSize?: any;
};

export const PrimaryTextArea = memo((props: Props) => {
  const [field, meta] = useField(props);
  const {
    children,
    placeholder,
    rows = 3,
    bg = "unset",
    border = "1px solid",
    borderColor = "#3182ce",
    shadow = "0 0 0 1px #3182ce",
    color = "inherit",
    fontSize = "16px",
  } = props;

  return (
    <Box>
      <Textarea
        resize="none"
        fontSize={fontSize}
        {...field}
        placeholder={placeholder}
        size="sm"
        rows={rows}
        bg={bg}
        border={border}
        color={color}
        _focus={{ borderColor, shadow }}
      >
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
