import { memo, VFC } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

import { PrimaryWrapper } from "../atoms/PrimaryWrapper";
import { AddContents } from "../molcules/AddContents";
import { WorkList } from "../molcules/WorkList";
import { PrimaryLayout } from "../templates/PrimaryLayout";
import { WorkContainer } from "../atoms/WorkContainer";
import { Status } from "../organisms/Status";
import { useWorks } from "../../hooks/useWorks";
import { DrawerButton } from "../molcules/DrawerButton";
import { useFile } from "../../hooks/useFile";
import { ProfileFormModal } from "../organisms/ProfileFormModal";
import { CompleteWorkDrawer } from "../organisms/CompleteWorkDrawer";
import { AddWorkModal } from "../organisms/AddWorkModal";
import { useDisclosures } from "../../hooks/useDisclosures";
import { CheerDrawer } from "../organisms/CheerDrawer";
import { useLoginUser } from "../../hooks/useLoginUser";
import { useUser } from "../../hooks/useUser";
import { useLevelUp } from "../../hooks/useLevelup";
import { useDefaultPicture } from "../../hooks/useDefaultPicutre";
import { useCheer } from "../../hooks/useCheer";
import { useCheered } from "../../hooks/useCheered";
import { BackgroundCity } from "../molcules/BackgroundCity";

export const Top: VFC = memo(() => {
  const { loginUserId } = useLoginUser();
  const { user, userInitialValues, userOnSubmit, userValidationSchema } =
    useUser(loginUserId as number);
  // プロフィール画像の設定が無ければ初期画像表示
  const { inspectedPicture } = useDefaultPicture(user.picture, "member/");
  const {
    workInitialValues,
    incompleteWorks,
    completeWorks,
    onSubmit,
    onClickDelete,
    onClickComplete,
    onClickBack,
    onClickUpdate,
    workValidationSchema,
  } = useWorks(loginUserId as number);
  const { file, fileLoad } = useFile(inspectedPicture);
  const {
    experienceRate,
    levelUpFlag,
    level,
    title,
    titleImage,
    onClickLevelUp,
  } = useLevelUp(user);
  const { cheerings } = useCheer(loginUserId as number);
  const { listCheered } = useCheered(loginUserId as number);
  const {
    onOpen1,
    onOpen2,
    onOpen3,
    onOpen4,
    onClose1,
    onClose2,
    onClose3,
    onClose4,
    isOpen1,
    isOpen2,
    isOpen3,
    isOpen4,
  } = useDisclosures();

  return (
    <BackgroundCity>
      <PrimaryLayout
        onOpenProfile={onOpen1}
        onOpenCheer={onOpen4}
        src={inspectedPicture}
      >
        <PrimaryWrapper>
          <Box py={{ md: "30px" }}>
            <Flex
              flexDir={{ base: "column", md: "row" }}
              align={{ md: "center" }}
              justify={{ md: "center" }}
            >
              <Box flex={{ md: "50%" }} mr={{ md: 6, lg: 20 }}>
                <Status
                  user={user}
                  level={level}
                  title={title}
                  titleImage={titleImage}
                  experienceRate={experienceRate}
                  flag={levelUpFlag}
                  onClickLevelUp={onClickLevelUp}
                  myProfile={true}
                />
              </Box>

              <Box mt={{ base: "30px", md: 0 }} flex={{ md: "50%" }}>
                <WorkContainer>
                  <Box
                    py={{ base: 4, lg: 8 }}
                    px={{ base: 6, lg: 8, xl: "50px" }}
                  >
                    <Box mb={{ base: 2 }}>
                      <AddContents onClick={onOpen2} />
                    </Box>
                    <Box mt={3}>
                      {incompleteWorks.length !== 0 ? (
                        <WorkList
                          works={incompleteWorks}
                          onClickDelete={onClickDelete}
                          onClickComplete={onClickComplete}
                          onSubmit={onClickUpdate}
                          validationSchema={workValidationSchema}
                        />
                      ) : (
                        <Flex align="center" justify="center" pt={5}>
                          <Text>Workを設定しましょう！</Text>
                        </Flex>
                      )}
                    </Box>
                  </Box>
                </WorkContainer>
              </Box>
            </Flex>

            <Box pt={{ base: "20px", md: "30px" }}>
              <DrawerButton
                text={`完了したWork (${completeWorks.length})`}
                onClick={onOpen3}
              />
            </Box>
          </Box>
        </PrimaryWrapper>
        <ProfileFormModal
          user={user}
          initialValues={userInitialValues}
          onSubmit={userOnSubmit}
          validationSchema={userValidationSchema}
          onClose={onClose1}
          isOpen={isOpen1}
          onChange={fileLoad}
          src={file}
        />
        <AddWorkModal
          initialValues={workInitialValues}
          onSubmit={onSubmit}
          validationSchema={workValidationSchema}
          onClose={onClose2}
          isOpen={isOpen2}
        />
        <CompleteWorkDrawer
          completeWorks={completeWorks}
          onClick={onClickBack}
          onClose={onClose3}
          isOpen={isOpen3}
        />
        <CheerDrawer
          onClose={onClose4}
          isOpen={isOpen4}
          cheerings={cheerings}
          listCheered={listCheered}
        />
      </PrimaryLayout>
    </BackgroundCity>
  );
});
