import { Flex } from "@chakra-ui/react";
import { memo } from "react";

import { SecondaryButton } from "../../atoms/button/SecondaryButton";

type Props = {
  finish: boolean;
  active: boolean;
  onClickStart: () => void;
  onClickStop: () => void;
  onClickFinish: () => void;
  onOpen: () => void;
  play: () => void;
  pause: () => void;
};

export const BattleButtons = memo((props: Props) => {
  const {
    finish,
    active,
    onClickStart,
    onClickStop,
    onClickFinish,
    onOpen,
    play,
    pause,
  } = props;

  return (
    <Flex align="center" justify="space-around" color="white">
      {!finish ? (
        active ? (
          <SecondaryButton
            onClick={() => {
              onClickStop();
              pause();
            }}
            fontSize="18px"
          >
            一時停止
          </SecondaryButton>
        ) : (
          <SecondaryButton
            onClick={() => {
              onClickStart();
              play();
            }}
            fontSize="18px"
          >
            たたかう
          </SecondaryButton>
        )
      ) : active ? (
        <SecondaryButton onClick={onClickFinish} fontSize="18px">
          休憩おわり
        </SecondaryButton>
      ) : (
        <SecondaryButton onClick={onClickStart} fontSize="18px">
          休憩する
        </SecondaryButton>
      )}

      <SecondaryButton onClick={onOpen} fontSize="18px">
        {!finish ? "にげる" : "おわる"}
      </SecondaryButton>
    </Flex>
  );
});
