import { memo, useEffect, useState } from "react";
import { Flex, Box, Image, Text, useDisclosure } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import { PrimaryContainer } from "../atoms/layout/PrimaryContainer";
import { useEnemyEncounter } from "../../hooks/useEnemyEncounter";
import restTime from "../../image/restTime.png";
import { useWhiteNoise } from "../../hooks/useWhiteNoise";
import clock from "../../assets/audio/clock.mp3";
import victory from "../../assets/audio/victory.mp3";
import breakIsOver from "../../assets/audio/breakIsOver.mp3";
import { useSoundEffect } from "../../hooks/useSoundEffect";
import { Dialog } from "../molcules/popUp/Dialog";
import { useBattle } from "../../hooks/useBattle";
import { TotalTime } from "../molcules/layout/TotalTime";
import { useLoginUser } from "../../hooks/useLoginUser";
import { BattleButtons } from "../molcules/button/BattleButtons";

export const Battle = memo(() => {
  // 制限時間設定
  const limit = 60 * 25;

  // 休憩回数カウント
  const [restCount, setRestCount] = useState(0);

  // 休憩時間設定
  const rest = restCount >= 3 ? 60 * 15 : 60 * 5;

  const { workId, smallGoalId } =
    useParams<{ workId: string; smallGoalId: string }>();
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
  } = useBattle({
    limit,
    rest,
    workId: Number(workId),
    smallGoalId: Number(smallGoalId),
    userId: loginUserId as number,
  });
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  return (
    <Box bg="gray.900" h="100vh">
      <Box px={{ base: 6, lg: "90px" }}>
        <Box py={{ base: 6 }}>
          <PrimaryContainer>
            <Flex
              align="center"
              justify="center"
              p={{ base: 3, md: 6 }}
              color="white"
              fontSize={{ lg: "18px" }}
            >
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

        <Box>
          <TotalTime totalTime={totalTime} fontSize="18px" />

          <Flex
            align="center"
            justify="center"
            pt={{ base: 4, sm: "60px" }}
            h={{ base: "335px" }}
          >
            {!finish ? (
              <Image
                src={enemy}
                w={{ base: "200px", sm: "260px", lg: "320px" }}
              />
            ) : (
              <Image
                src={restTime}
                w={{ base: "200px", sm: "260px", lg: "320px" }}
              />
            )}
          </Flex>

          <Flex
            align="center"
            justify="center"
            fontSize="40px"
            letterSpacing={1}
          >
            {!finish ? (
              <Text color="white">{time}</Text>
            ) : (
              <Text color="#6dcc80">{time}</Text>
            )}
          </Flex>

          <Box pt={{ base: 6, sm: "100px", md: "60px" }}>
            <PrimaryContainer>
              <Box py={{ base: "10px", md: 6 }} color="white">
                <BattleButtons
                  active={active}
                  finish={finish}
                  onClickStart={onClickStart}
                  onClickStop={onClickStop}
                  onClickFinish={onClickFinish}
                  onOpen={onOpen}
                  play={play}
                  pause={pause}
                />
              </Box>
            </PrimaryContainer>
          </Box>
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
