import React, { useEffect, useState } from "react";
import MainContainer from "../layout/MainContainer";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  IconButton,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Spinner,
  Tab,
  TabList,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  Outlet,
  Link as RouterLink,
  useNavigate,
  useParams,
} from "react-router-dom";
import { IoEllipsisHorizontalCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../store/modalSlice";
import { selectUser } from "../../store/userSlice";
import {
  useCounts,
  useFollowers,
  useFollowing,
  useUser,
} from "../../hooks/users";
import { VscCircleSmall } from "react-icons/vsc";
import FollowButton from "../search/FollowButton";

function ShowAvatarImage({ isOpen, onClose, imgSrc }) {
  return (
    <Modal
      onClose={onClose}
      // onCloseComplete={onCloseComplete}
      isOpen={isOpen}
      isCentered
    >
      <ModalOverlay />
      <ModalContent width="fit-content">
        <ModalCloseButton />
        <ModalBody
          display="flex"
          justifyContent="center"
          alignItems="center"
          p="24px"
        >
          <Image
            borderRadius="full"
            boxSize="262px"
            objectFit="cover"
            src={imgSrc}
            alt="Dan Abramov"
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, isLoading: currentUserLoading } =
    useSelector(selectUser);
  const { userId } = useParams();
  const { data: user, isLoading: userLoading } = useUser(userId);
  const { data: counts, isLoading: countsLoading } = useCounts(userId);
  const { data: following, isLoading: isFollowingLoading } = useFollowing(
    currentUser.uid
  );
  const followingArr = following ? following.map((el) => el.docId) : [];

  const isMyProfile = currentUser.uid === userId;
  const [imgOpen, setImgOpen] = useState(false);

  useEffect(() => {
    if (!userLoading && !user) return navigate("/notfound");
  }, [navigate, userLoading, user]);

  const isLoading =
    currentUserLoading || userLoading || countsLoading || isFollowingLoading;

  function handleEditProfile() {
    dispatch(openModal({ modalType: "editProfile" }));
  }

  function openUserInfo() {
    dispatch(openModal({ modalType: "userInfo", data: user }));
  }

  function openFollowersFollowing() {
    dispatch(openModal({ modalType: "followersFollowing", data: user }));
  }

  if (isLoading)
    return (
      <Flex justify="center" align="center" flex="1">
        <Spinner />
      </Flex>
    );

  return (
    <MainContainer>
      <ShowAvatarImage
        isOpen={imgOpen}
        onClose={() => setImgOpen(false)}
        imgSrc={user.avatar}
      />
      <VStack py="16px" px={{ base: "12px", sm: "0px" }} spacing="0px">
        <Grid
          templateColumns="minmax(0, 1fr) max-content"
          alignItems="center"
          columnGap="16px"
          width="full"
        >
          <GridItem>
            <Box>
              <Text
                fontSize="3xl"
                cursor="pointer"
                w="fit-content"
                onClick={openUserInfo}
              >
                {user.fullName}
              </Text>
            </Box>
            <Box>
              <Text>{user.username}</Text>
            </Box>
          </GridItem>
          <GridItem>
            <Box>
              {user.avatar ? (
                <Avatar
                  key="with-src"
                  size="xl"
                  src={user.avatar}
                  cursor="pointer"
                  onClick={() => setImgOpen(true)}
                  borderWidth="0.5px"
                  borderColor="gray.200"
                />
              ) : (
                <Avatar key="without-src" size="xl" />
              )}
            </Box>
          </GridItem>
        </Grid>
        {user.bio && (
          <Box mt="16px" width="full">
            {user.bio}
          </Box>
        )}

        <Flex
          minHeight="22px"
          mt="18px"
          alignItems="center"
          width="full"
          color="gray.400"
        >
          <Flex
            flexShrink="0"
            lignItems="center"
            cursor="pointer"
            _hover={{ textDecoration: "underline" }}
            onClick={openFollowersFollowing}
          >
            팔로워 {counts.followers}명
          </Flex>
          <Flex alignItems="center" flexGrow="1">
            {user.link && (
              <>
                <VscCircleSmall />
                <Link target="_blank" rel="noopener noreferrer">
                  {user.link}
                </Link>
              </>
            )}
          </Flex>
          <Flex flexGrow="0" alignItems="center">
            <IconButton
              colorScheme="teal"
              variant="ghost"
              isRound={true}
              icon={<IoEllipsisHorizontalCircleOutline size={26} />}
            />
          </Flex>
        </Flex>
      </VStack>
      <Flex py="12px" px={{ base: "12px", sm: "0px" }} gap="10px">
        {isMyProfile ? (
          <Button
            w="full"
            colorScheme="teal"
            variant="outline"
            onClick={handleEditProfile}
          >
            프로필 편집
          </Button>
        ) : (
          <>
            <FollowButton
              config={{
                id: userId,
                uid: currentUser.uid,
                isFollowing: followingArr.includes(userId),
              }}
              isFull={true}
            />
            <Button w="full" colorScheme="teal" variant="outline">
              메시지 보내기
            </Button>
          </>
        )}
      </Flex>
      <Box mb="16px">
        <Tabs colorScheme="teal" isFitted={true}>
          <TabList color="gray.400">
            <Tab as={RouterLink} to="./">
              스레드
            </Tab>
            <Tab as={RouterLink} to="./replies">
              답글
            </Tab>
            <Tab as={RouterLink} to="./reposts">
              리포스트
            </Tab>
          </TabList>

          <TabPanels>
            <Outlet />
          </TabPanels>
        </Tabs>
      </Box>
    </MainContainer>
  );
}
