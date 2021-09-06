import { useCallback, useState } from "react";

export const useSoundEffect = (sound: string) => {
  const [audio] = useState(new Audio(sound));

  const soundEffect = useCallback(() => {
    audio.play();
  }, []);

  const onClickPlaySoundEffect = useCallback(() => {
    soundEffect();
  }, []);

  return [soundEffect, onClickPlaySoundEffect];
};
