import { Box, Input, Text, FormLabel, Image, Flex } from "@chakra-ui/react";
import { useField } from "formik";
import { ChangeEvent } from "react";

type Props = {
  name: string;
  src: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const PrimaryInputFile = (props: Props) => {
  const [field, meta] = useField(props);
  const { src, onChange } = props;

  return (
    <Box>
      <Flex align="center" justify="center">
        <FormLabel p={2}>
          <Image
            src={src}
            borderRadius="full"
            boxSize={{ base: "80px" }}
            objectFit="cover"
            cursor="pointer"
            _hover={{ opacity: 0.8 }}
          />
          <Input
            type="file"
            accept="image/*"
            {...field}
            d="none"
            onChange={onChange}
          />
        </FormLabel>
      </Flex>
      {meta.error && meta.touched ? (
        <Text color="red" fontSize="10px" textAlign="start" mt={1}>
          {meta.error}
        </Text>
      ) : null}
    </Box>
  );
};
