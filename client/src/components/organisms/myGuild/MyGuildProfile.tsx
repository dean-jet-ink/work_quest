import { memo } from "react";
import { Box, Text, Flex, Stack, Image, useDisclosure } from "@chakra-ui/react";
import guildBg from "../../../image/guild_bg.jpg";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { ExitGuildDialog } from "../../molcules/popUp/ExitGuildDialog";
import { PrimaryContainer } from "../../atoms/layout/PrimaryContainer";
import { Guild } from "../../../types/guild";

type Props = {
  loginUserId: number;
  guild: Guild;
  file: string;
  onClickDelete: () => void;
  onClickExit: () => void;
  deleteFile: () => void;
};

export const MyGuildProfile = memo((props: Props) => {
  const { loginUserId, guild, file, onClickDelete, deleteFile, onClickExit } =
    props;
  const { onOpen, isOpen, onClose } = useDisclosure();

  return (
    <Box
      bg={`center/cover url(${guildBg}) no-repeat`}
      position="relative"
      zIndex={1}
    >
      <Flex align="start" h={{ base: "195px", md: "225px", lg: "245px" }}>
        <Flex
          p={{ base: "25px" }}
          position="relative"
          align="center"
          justify="center"
          w="100%"
        >
          <Image
            src={file}
            boxSize={{ base: "85px", sm: "100px", lg: "120px", xl: "145px" }}
            borderRadius="50%"
            objectFit="cover"
          />
          <Box ml={{ base: "15px", sm: "30px" }}>
            <PrimaryContainer>
              <Box
                p={{ base: 2 }}
                w="100%"
                maxW={{
                  base: "225px",
                  sm: "330px",
                  lg: "345px",
                  xl: "470px",
                }}
              >
                <Flex>
                  <Stack spacing={2} mr={{ base: 2 }}>
                    <Text fontSize={{ lg: "18px" }} fontWeight="bold">
                      {guild.guildName}
                    </Text>
                    <Box overflow="auto" maxH={{ base: "36px", lg: "54px" }}>
                      <Text fontSize={{ base: "12px", xl: "14px" }}>
                        *「 {guild.comment} 」
                      </Text>
                    </Box>
                  </Stack>
                  <Box
                    data-testid="exitButton"
                    fontSize={{ base: "30px", md: "40px", lg: "50px" }}
                    _hover={{ cursor: "pointer" }}
                    onClick={onOpen}
                    h="fit-content"
                  >
                    <ExitToAppIcon fontSize="inherit" color="inherit" />
                  </Box>
                </Flex>
              </Box>
            </PrimaryContainer>
          </Box>
        </Flex>
      </Flex>

      <ExitGuildDialog
        id={loginUserId!}
        guild={guild}
        isOpen={isOpen}
        onClose={onClose}
        onClickDelete={onClickDelete}
        onClickExit={onClickExit}
        deleteFile={deleteFile}
      />
    </Box>
  );
});
