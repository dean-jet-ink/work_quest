import { useCallback, useState } from "react";

export const useSoundEffect = (sound: string) => {
  const [audio] = useState(new Audio(sound));

  const soundEffect = useCallback(() => {
    audio.play();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickPlaySoundEffect = useCallback(() => {
    soundEffect();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [soundEffect, onClickPlaySoundEffect];
};
