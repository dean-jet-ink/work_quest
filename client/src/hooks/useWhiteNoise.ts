import { useEffect, useState } from "react";

export const useWhiteNoise = (sound: string) => {
  const [audio] = useState(new Audio(sound));
  const [playing, setPlaying] = useState<boolean>(false);

  const play = () => {
    if (!playing) {
      setTimeout(() => {
        audio.play();
      }, 1000);
      setPlaying(true);
    }
  };

  const pause = () => {
    audio.pause();
    audio.currentTime = 0;
    setPlaying(false);
  };

  useEffect(() => {
    setPlaying(true);
    audio.loop = true;
    setTimeout(() => {
      audio.play();
    }, 1000);
    return () => audio.pause();
  }, []);

  return { play, pause };
};
