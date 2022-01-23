import { memo } from "react";
import { Guild } from "../../types/guild";
import { Dialog } from "./Dialog";

type Props = {
  id: number;
  guild: Guild;
  isOpen: boolean;
  onClose: () => void;
  onClickDelete: () => void;
  onClickExit: () => void;
};

export const ExitGuildDialog = memo((props: Props) => {
  const { id, guild, isOpen, onClose, onClickDelete, onClickExit } = props;
  const dialog =
    id === guild.adminId
      ? `「${guild.guildName}」を解散させますか？`
      : `「${guild.guildName}」から退会しますか？`;
  const onClick = id === guild.adminId ? onClickDelete : onClickExit;

  return (
    <Dialog
      header={dialog}
      onClick={onClick}
      isOpen={isOpen}
      onClose={onClose}
    />
  );
});
