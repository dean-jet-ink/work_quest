import { memo } from "react";
import { Box, Text, Image, Stack } from "@chakra-ui/react";
import { Form, Formik } from "formik";

import { PrimaryModal } from "../../molcules/popUp/PrimaryModal";
import { Guild } from "../../../types/guild";
import { PeopleOfNumber } from "../../molcules/layout/PeopleOfNumber";
import { Comment } from "../../molcules/layout/Comment";
import { PrimaryButton } from "../../atoms/button/PrimarButton";
import {
  MyGuildInitialValuesType,
  MyGuildOnSubmitProps,
} from "../../../hooks/useMyGuild";
import { useFile } from "../../../hooks/useFile";
import { useFetchGuildMembers } from "../../../hooks/useFetchGuildMembers";

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
  const isMyGuild = myGuildList.find(
    (myGuild) => myGuild.guildId === guild.guildId
  );
  const joinFormDisplay =
    myGuildList.length >= 3 || isMyGuild ? "none" : "flex"; //所属しているギルドが3つ、もしくは所属ギルドなら参加フォーム非表示
  const { guildMembers } = useFetchGuildMembers(guild.guildId);
  const numberOfGuildMember = guildMembers.length;

  return (
    <PrimaryModal onClose={onClose} isOpen={isOpen}>
      <Box p="20px 20px 30px">
        <Stack flexGrow={1} align="center" spacing={{ base: 2, sm: 4 }}>
          <Image
            src={file}
            Members
            boxSize={{ base: "90px", md: "120px" }}
            borderRadius="50%"
            m="auto"
          />
          <Text>{guild.guildName}</Text>
          <PeopleOfNumber num={numberOfGuildMember} />
          <Box w="100%" textAlign="start">
            <Comment
              height="79px"
              fontSize="14px"
            >{`*「 ${guild.comment} 」`}</Comment>
          </Box>
          <Box d={joinFormDisplay} pt={2}>
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
                  <PrimaryButton isLoading={isSubmitting}>
                    参加する
                  </PrimaryButton>
                </Form>
              )}
            </Formik>
          </Box>
        </Stack>
      </Box>
    </PrimaryModal>
  );
});
