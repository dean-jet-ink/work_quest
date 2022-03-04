import { memo } from "react";
import {
  Flex,
  Box,
  Heading,
  Stack,
  Text,
  Image,
  Progress,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import party from "party-js";

import { PrimaryContainer } from "../../atoms/layout/PrimaryContainer";
import { TotalTime } from "../../molcules/layout/TotalTime";
import { User } from "../../../types/user";
import { Comment } from "../../molcules/layout/Comment";
import { LevelUpModal } from "./LevelUpModal";
import praise from "../../../assets/audio/praise.mp3";
import { useSoundEffect } from "../../../hooks/useSoundEffect";
import { MotionBox } from "../../../animation/MotionBox";

type Props = {
  user: User;
  titleImage: string;
  myProfile?: boolean;
  experienceRate?: number;
  level?: number;
  title?: string;
  flag?: boolean;
  onClickLevelUp?: (props: any) => void;
};

type DefaultProps = {
  experienceRate: number;
  onClickLevelUp: (props: any) => void;
};

type PropsWithDefault = Props & DefaultProps;

export const Status = memo((props: Props) => {
  const {
    user,
    titleImage,
    myProfile = false,
    experienceRate,
    level,
    title,
    flag = false,
    onClickLevelUp,
  } = props as PropsWithDefault;
  const colorScheme = experienceRate >= 100 ? "pink" : "blue";
  const progressDisplay = myProfile ? "auto" : "none";
  const commentDisplay = myProfile ? "none" : "auto";
  const levelUpDisplay = flag ? "auto" : "none";
  const profileLevel = myProfile ? level : user.level;
  const profileTitle = myProfile ? title : user.title;

  const { isOpen, onClose, onOpen } = useDisclosure();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [soundPraise, onClickPraise] = useSoundEffect(praise);

  const onClickParty = () => {
    setTimeout(() => {
      party.confetti(document.body, {
        count: party.variation.range(30, 30),
      });
    }, 200);
  };

  return (
    <PrimaryContainer>
      <Flex
        py={{ base: "25px", md: "40px" }}
        px={{ base: 4, md: 8 }}
        align="center"
        justify="space-around"
        height={{ md: "420px" }}
      >
        <Box>
          <Box mb={6}>
            <TotalTime totalTime={user.totalTime} fontSize="18px" />
          </Box>
          <Box mb={3}>
            <Text fontSize={{ base: "18px", xl: "22px" }}>{user.userName}</Text>
          </Box>
          <Stack spacing={{ base: 5, md: 8 }}>
            <Box>
              <Flex align="center">
                <Text fontSize={{ base: "15px", xl: "20px" }}>Level</Text>
                <Text ml={5}>{profileLevel}</Text>
              </Flex>
              <Progress
                d={progressDisplay}
                value={experienceRate}
                colorScheme={colorScheme}
                size="md"
                w={{ base: "100px", md: "120px", xl: "150px" }}
                mt={2}
              />

              {/* レベルアップボタン */}
              <Box mt={4} d={levelUpDisplay}>
                <MotionBox
                  animate={{
                    backgroundColor: ["#9e5d3d", "#da652b", "#9e5d3d"],
                  }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                    times: [0, 0.8, 1],
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                  w="fit-content"
                  borderRadius={4}
                >
                  <Button
                    onClick={() => {
                      setTimeout(() => {
                        onClickLevelUp({
                          onOpen,
                          onClickPraise,
                          onClickParty,
                        });
                      }, 200);
                    }}
                    bg="transparent"
                    color="#ddc421"
                    fontSize="14px"
                    h="fit-content"
                    p={2}
                  >
                    level up
                  </Button>
                </MotionBox>
              </Box>
            </Box>
            <Flex align="center">
              <Text fontSize="15px">称号</Text>
              <Text ml={5}>{profileTitle}</Text>
            </Flex>
          </Stack>
        </Box>
        <Box>
          <Image
            src={titleImage}
            w={{ base: "135px", md: "170px", xl: "200px" }}
          />
        </Box>
      </Flex>
      <Box d={commentDisplay} mx={2} mb={3} mt={{ md: "-65px" }}>
        <Comment
          height={{ base: "63px" }}
        >{`${user.userName}「 ${user.comment} 」`}</Comment>
      </Box>
      <LevelUpModal
        onClose={onClose}
        isOpen={isOpen}
        user={user}
        level={level!}
        title={title!}
        titleImage={titleImage}
      />
    </PrimaryContainer>
  );
});
