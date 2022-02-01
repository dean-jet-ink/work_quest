import { memo } from "react";
import { Box, Text, Image, Flex, Stack } from "@chakra-ui/react";

import { PrimaryModal } from "../molcules/PrimaryModal";
import { Guild } from "../../types/guild";
import { PeopleOfNumber } from "../molcules/PeopleOfNumber";
import { Comment } from "../molcules/Comment";
import { PrimaryButton } from "../atoms/forms/PrimarButton";
import { Form, Formik } from "formik";
import {
  MyGuildInitialValuesType,
  MyGuildOnSubmitProps,
} from "../../hooks/form/useMyGuild";
import { useFile } from "../../hooks/useFile";

type Props = {
  onClose: () => void;
  isOpen: boolean;
  guild: Guild;
  myGuildList: Guild[];
  initialValues: MyGuildInitialValuesType;
  onSubmit: (props: MyGuildOnSubmitProps) => void;
};

export const GuildDetailModal = memo((props: Props) => {
  const { onClose, isOpen, guild, myGuildList, initialValues, onSubmit } =
    props;
  const { file } = useFile({ key: "guild", picture: guild.guildPicture });
  const joinFormDisplay = myGuildList.length >= 3 ? "none" : "flex"; //所属しているギルドが3つなら参加フォームグレーアウト

  return (
    <PrimaryModal onClose={onClose} isOpen={isOpen}>
      <Box p="20px 20px 30px">
        <Box py={3}>
          <Text fontSize="30px">lv10</Text>
        </Box>
        <Flex align="center" pb={6}>
          <Box w="60%">
            <Image src={file} boxSize="150px" borderRadius="50%" m="auto" />
          </Box>
          <Stack flexGrow={1} align="center" spacing={4} textAlign="center">
            <Text fontSize="18px">{guild.guildName}</Text>
            <PeopleOfNumber num={8} />
          </Stack>
        </Flex>
        <Comment>{`*「 ${guild.comment} 」`}</Comment>
        <Flex justify="flex-end" pt={6} d={joinFormDisplay}>
          <Formik
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                onSubmit({ values, setSubmitting });
                onClose();
              }, 500);
            }}
          >
            {({ isSubmitting, handleSubmit, setFieldValue }) => (
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                  setFieldValue("guildId", guild.guildId);
                }}
              >
                <PrimaryButton isLoading={isSubmitting}>参加する</PrimaryButton>
              </Form>
            )}
          </Formik>
        </Flex>
      </Box>
    </PrimaryModal>
  );
});
