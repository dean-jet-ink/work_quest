import { useCallback } from "react";
import { Box, List, Stack, useDisclosure, Wrap } from "@chakra-ui/react";

import { useSelectGuild } from "../../../hooks/useSelectGuild";
import { GuildDetailModal } from "./GuildDetailModal";
import { Guild } from "../../../types/guild";
import {
  MyGuildInitialValuesType,
  MyGuildOnSubmitProps,
} from "../../../hooks/form/useMyGuild";
import { GuildRow } from "../../molcules/layout/GuildRow";

type Props = {
  guildList: Guild[];
  myGuildList: Guild[];
  initialValues: MyGuildInitialValuesType;
  onSubmit: (props: MyGuildOnSubmitProps) => void;
};

export const GuildList = (props: Props) => {
  const { guildList, myGuildList, initialValues, onSubmit } = props;
  const { onClose, onOpen, isOpen } = useDisclosure();
  const { selectedGuild, onSelectGuild } = useSelectGuild();
  const onClickSelect = useCallback(
    (id: number) => {
      onSelectGuild({ id, guildList });
      onOpen();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [guildList]
  );

  return (
    <List>
      <Stack spacing={{ base: 2, md: 3 }}>
        {guildList.map((guild) => (
          <GuildRow
            key={guild.guildId}
            guild={guild}
            myGuilds={myGuildList}
            onClickSelect={onClickSelect}
          />
        ))}
      </Stack>
      <GuildDetailModal
        onClose={onClose}
        isOpen={isOpen}
        guild={selectedGuild}
        myGuildList={myGuildList}
        initialValues={initialValues}
        onSubmit={onSubmit}
      />
    </List>
  );
};
