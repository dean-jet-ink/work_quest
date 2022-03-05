import { memo, VFC } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

import { PrimaryWrapper } from "../atoms/layout/PrimaryWrapper";
import { AddContents } from "../molcules/button/AddContents";
import { WorkList } from "../organisms/top/WorkList";
import { PrimaryLayout } from "../templates/layout/PrimaryLayout";
import { WorkContainer } from "../atoms/layout/WorkContainer";
import { Status } from "../organisms/top/Status";
import { useWorks } from "../../hooks/useWorks";
import { DrawerButton } from "../molcules/display/DrawerButton";
import { useFormFile } from "../../hooks/useFormFile";
import { ProfileFormModal } from "../organisms/top/ProfileFormModal";
import { CompleteWorkDrawer } from "../organisms/top/CompleteWorkDrawer";
import { AddWorkModal } from "../organisms/top/AddWorkModal";
import { useDisclosures } from "../../hooks/useDisclosures";
import { CheerDrawer } from "../organisms/top/CheerDrawer";
import { useLoginUser } from "../../hooks/useLoginUser";
import { useUser } from "../../hooks/useUser";
import { useLevelUp } from "../../hooks/useLevelup";
import { useCheer } from "../../hooks/useCheer";
import { useCheered } from "../../hooks/useCheered";
import { Background } from "../molcules/layout/Background";
import { useFile } from "../../hooks/useFile";

export const Top: VFC = memo(() => {
  const { loginUserId } = useLoginUser();
  const { user, userInitialValues, userOnSubmit, userValidationSchema } =
    useUser(loginUserId as number);
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
  const { file, selectedFile, handleFile, uploadFile } = useFile({
    key: "member",
    picture: user.picture,
  });
  const { formFile, fileLoad } = useFormFile(file);
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
  const width = { base: "100%", sm: "440px", md: "440px", lg: "530px" };

  return (
    <Background>
      <PrimaryLayout onOpenProfile={onOpen1} onOpenCheer={onOpen4} src={file}>
        <PrimaryWrapper>
          <Flex
            flexDir={{ base: "column", md: "row" }}
            align={"center"}
            justify={"center"}
          >
            <Box w={width} mr={{ md: 6 }}>
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

            <Box w={width} mt={{ base: "25px", md: 0 }}>
              <WorkContainer>
                <Box
                  pt={{ base: 4, lg: 8 }}
                  pb={{ base: 2 }}
                  px={{ base: 6, lg: 8, xl: "50px" }}
                >
                  <Box mb={{ base: 2 }}>
                    <AddContents onClick={onOpen2} color="#c5d198fc" />
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
                        <Text>Workを設定しましょう</Text>
                      </Flex>
                    )}
                  </Box>
                </Box>
              </WorkContainer>
            </Box>
          </Flex>

          <Flex w="100%" justify="center">
            <Box w="100%" maxW="580px" pt={{ base: "20px", md: "30px" }}>
              <DrawerButton
                text={`完了したWork (${completeWorks.length})`}
                onClick={onOpen3}
              />
            </Box>
          </Flex>
        </PrimaryWrapper>
        <ProfileFormModal
          user={user}
          initialValues={userInitialValues}
          onSubmit={userOnSubmit}
          validationSchema={userValidationSchema}
          onClose={onClose1}
          isOpen={isOpen1}
          onChange={fileLoad}
          formSrc={formFile}
          file={file}
          selectedFile={selectedFile}
          handleFile={handleFile}
          uploadFile={uploadFile}
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
    </Background>
  );
});
