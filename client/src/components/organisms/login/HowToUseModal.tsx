import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import CommentIcon from "@material-ui/icons/Comment";

import { MotionBox } from "../../../animation/MotionBox";
import { PrimaryModal } from "../../molcules/popUp/PrimaryModal";
import { Slider } from "../../molcules/slider/Slider";
import howToUse from "../../../image/howtouse_1.png";
import howToUse2 from "../../../image/howtouse_2.png";
import howToUse3 from "../../../image/howtouse_3.png";
import howToUse4 from "../../../image/howtouse_4.png";
import howToUse5 from "../../../image/howtouse_5.png";
import ranking from "../../../image/rank1.png";
import guild from "../../../image/guild.png";
import report from "../../../image/report.png";
import "../../../assets/css/slick.css";

type Props = {
  onClose: () => void;
  isOpen: boolean;
  color: string;
};

export const HowToUseModal = (props: Props) => {
  const { onClose, isOpen, color } = props;
  return (
    <PrimaryModal
      isOpen={isOpen}
      onClose={onClose}
      isCentered={false}
      margin={0}
    >
      <Box p={7} fontSize={{ base: "12px", sm: "14px" }}>
        <Heading
          fontSize={{ base: "28px", sm: "35px" }}
          fontFamily="fantasy"
          color="#dbdc9fde"
        >
          HOW TO USE
        </Heading>
        <Box h={{ base: "400px", sm: "420px" }}>
          <Slider color={color}>
            {/* 1page */}
            <Box p={7}>
              <Text>先ずは自分の行いたい'Work'を設定します。</Text>
              <Text>
                'Workの追加'からワークを設定し、'Workへすすむ'を選択します。
              </Text>
              <Box pt={{ base: "20px", sm: "30px" }} w="fit-content" mx="auto">
                <Image src={howToUse} w="220px" h="260px" />
              </Box>
            </Box>

            {/* 2page */}
            <Box p={7}>
              <Text>
                続いて、Workを目標ごとに細分化した'Small Goal'を設定します。
              </Text>
              <Text>
                出来るだけ達成しやすい目標まで細かくして、一歩ずつ着実に進めましょう！
              </Text>
              <Text>'たたかう'を選択します。</Text>
              <Box pt="20px" w="fit-content" mx="auto">
                <Image src={howToUse2} w="220px" h="260px" />
              </Box>
            </Box>

            {/* 3page */}
            <Box p={7}>
              <MotionBox
                animate={{
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 1,
                  ease: "easeInOut",
                  times: [0, 0.1, 0.2, 0.3],
                  delay: 0.4,
                }}
              >
                <Text textAlign="center" fontSize="15px" color="orange">
                  敵が現れました！
                </Text>
              </MotionBox>
              <Box pt="20px" w="fit-content" mx="auto">
                <Image src={howToUse3} w="240px" h="315px" />
              </Box>
            </Box>

            {/* 4page */}
            <Box p={7}>
              <Text>たたかいは一回25分です。</Text>
              <Text>
                25分の後に5分の休憩を行い、4度目の休憩で15分間休憩します。
              </Text>
              <Text>
                このサイクルでの作業法を、`ポモドーロテクニック`と呼び、集中力の維持や疲労の軽減に効果的とされています。
              </Text>
              <Box fontFamily="cursive" textAlign="center">
                <Flex pt={5}>
                  <Flex>
                    <Text fontSize="15px" color="orange">
                      25min
                    </Text>
                    <Box>
                      <Text>→</Text>
                      <Text mt={2} color="#66d6da">
                        5min
                      </Text>
                    </Box>
                  </Flex>
                  <Flex>
                    <Text fontSize="15px" color="orange">
                      25min
                    </Text>
                    <Box>
                      <Text>→</Text>
                      <Text mt={2} color="#66d6da">
                        5min
                      </Text>
                    </Box>
                  </Flex>
                  <Flex>
                    <Text fontSize="15px" color="orange">
                      25min
                    </Text>
                    <Box>
                      <Text>→</Text>
                      <Text mt={2} color="#66d6da">
                        5min
                      </Text>
                    </Box>
                  </Flex>
                  <Text fontSize="15px" color="orange">
                    25min
                  </Text>
                </Flex>
                <Flex w="100%" align="center" justify="center" pt={4}>
                  <Text mr={2}>→</Text>
                  <Text fontSize="15px" color="#66d6da">
                    15min
                  </Text>
                </Flex>
              </Box>
            </Box>

            {/* 5page */}
            <Box p={7}>
              <Text>
                Workをこなして作業時間を増やしていくと、それを経験値としてアバターがレベルアップします。
                一定のレベルに到達すると、称号と見た目が変化します。
              </Text>
              <Box position="relative" pt={3}>
                <Image
                  src={howToUse4}
                  height={{ base: "155px", sm: "185px" }}
                  width={{ base: "150px", sm: "180px" }}
                />
                <Box position="absolute" top="130px" right="-15px">
                  <Image src={howToUse5} height="155px" width="150px" />
                </Box>
              </Box>
            </Box>

            {/* 6page */}
            <Box p={7}>
              <Text>基本的な使い方はこれだけです。</Text>
              <Text>
                この他にも、作業時間での'ランキング'や、チーム機能の'ギルド'、応援の'Cheer'などがありますので、色々とお試しください♪
              </Text>
              <Box py={14}>
                <Flex align="center" justify="space-around">
                  <Image src={ranking} w={{ base: "55px", md: "76px" }} />
                  <Image src={guild} w={{ base: "55px", md: "76px" }} />
                  <Flex
                    align="center"
                    fontSize={{ base: "41px", md: "55px", lg: "37px" }}
                    color="#debd0b"
                    w="fit-content"
                  >
                    <InsertEmoticonIcon color="inherit" fontSize="inherit" />
                  </Flex>
                </Flex>
                <Flex pt={7} align="center" justify="space-around">
                  <Image src={report} w={{ base: "55px", md: "76px" }} />
                  <Box
                    w="fit-content"
                    fontSize={{ base: "41px", md: "55px" }}
                    color="white"
                  >
                    <CommentIcon fontSize="inherit" color="inherit" />
                  </Box>
                </Flex>
              </Box>
            </Box>
          </Slider>
        </Box>
      </Box>
    </PrimaryModal>
  );
};
