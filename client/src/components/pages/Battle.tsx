import { memo, useEffect, useState } from "react";
import { Flex, Box, Image, Text, useDisclosure } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import { PrimaryContainer } from "../atoms/PrimaryContainer";
import { SecondaryButton } from "../atoms/forms/SecondaryButton";
import { useEnemyEncounter } from "../../hooks/useEnemyEncounter";
import restTime from "../../image/restTime.png";
import { useWhiteNoise } from "../../hooks/useWhiteNoise";
import clock from "../../assets/audio/clock.mp3";
import victory from "../../assets/audio/victory.mp3";
import breakIsOver from "../../assets/audio/breakIsOver.mp3";
import { useSoundEffect } from "../../hooks/useSoundEffect";
import { Dialog } from "../molcules/Dialog";
import { useBattle } from "../../hooks/useBattle";
import { TotalTime } from "../molcules/TotalTime";
import { useLoginUser } from "../../hooks/useLoginUser";

export const Battle = memo(() => {
  // 制限時間設定
  const limit = 60 * 25;
  // 休憩回数カウント
  const [restCount, setRestCount] = useState(0);
  // 休憩時間設定
  const rest = restCount >= 3 ? 60 * 15 : 60 * 5;
  const { id } = useParams<{ id: string }>();
  const { loginUserId } = useLoginUser();
  const {
    smallGoalName,
    totalTime,
    active,
    timeLeft,
    finish,
    onClickStart,
    onClickStop,
    onClickReset,
    onClickFinish,
    toTimeFormat,
  } = useBattle({ limit, rest, id: Number(id), userId: loginUserId as number });
  const time = toTimeFormat(timeLeft);
  const { enemy } = useEnemyEncounter();
  const { play, pause } = useWhiteNoise(clock);
  const [soundVic] = useSoundEffect(victory);
  const [soundOver] = useSoundEffect(breakIsOver);
  const { onClose, onOpen, isOpen } = useDisclosure();

  useEffect(() => {
    if (timeLeft <= 0) {
      if (!finish) {
        soundVic();
        pause();
        if (restCount >= 3) {
          setRestCount(0);
        } else {
          setRestCount((prev) => ++prev);
        }
      } else {
        soundOver();
      }
    }
  }, [timeLeft]);

  return (
    <Box bg="gray.900" h="100vh">
      <Box p={6}>
        <PrimaryContainer>
          <Flex align="center" justify="center" p={3} color="white">
            {!finish ? (
              <Text letterSpacing={1}>
                <Box as="span" color="orange">
                  {smallGoalName}
                </Box>
                が現れた！
              </Text>
            ) : (
              <Text>一休みしましょう</Text>
            )}
          </Flex>
        </PrimaryContainer>
      </Box>
      <Box px={6}>
        <TotalTime totalTime={totalTime} fontSize="18px" />

        <Flex align="center" justify="center" pt={4} h="40%">
          {!finish ? (
            <Image src={enemy} w="200px" />
          ) : (
            <Image src={restTime} w="150px" />
          )}
        </Flex>

        <Flex align="center" justify="center" fontSize="40px" letterSpacing={1}>
          {!finish ? (
            <Text color="white">{time}</Text>
          ) : (
            <Text color="#6dcc80">{time}</Text>
          )}
        </Flex>
        <Box pt={6}>
          <PrimaryContainer>
            <Box py="10px" color="white">
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
            </Box>
          </PrimaryContainer>
        </Box>
      </Box>
      <Dialog
        header="前のページに戻りますか？"
        onClick={onClickReset}
        onClose={onClose}
        isOpen={isOpen}
      />
    </Box>
  );
});
