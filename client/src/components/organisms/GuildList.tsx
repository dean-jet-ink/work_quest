import { useCallback } from "react";
import { useDisclosure, Wrap, WrapItem } from "@chakra-ui/react";

import { useSelectGuild } from "../../hooks/useSelectGuild";
import { GuildDetailModal } from "./GuildDetailModal";
import { Guild } from "../../types/guild";
import {
  MyGuildInitialValuesType,
  MyGuildOnSubmitProps,
} from "../../hooks/form/useMyGuild";
import { GuildCard } from "../molcules/GuildCard";

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
    [guildList]
  );

  return (
    <Wrap justify="space-between">
      {guildList.map((guild) => (
        <GuildCard
          key={guild.guildId}
          guild={guild}
          myGuildList={myGuildList}
          onClickSelect={onClickSelect}
        />
      ))}
      <GuildDetailModal
        onClose={onClose}
        isOpen={isOpen}
        guild={selectedGuild}
        myGuildList={myGuildList}
        initialValues={initialValues}
        onSubmit={onSubmit}
      />
    </Wrap>
  );
};
