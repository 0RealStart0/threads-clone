import {
  Box,
  Center,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, selectModal } from "../../../store/modalSlice";
import {
  useCounts,
  useFollowersCount,
  useFollowingCount,
} from "../../../hooks/users";

export default function FollowersFollowing() {
  const [isOpen, setIsOpen] = useState(true);
  const { data: user } = useSelector(selectModal);
  const dispatch = useDispatch();

  // const { data: followersCount, isPending: isFollowersLoading } =
  //   useFollowersCount(user.id);
  // const { data: followingCount, isPending: isFollowingLoading } =
  //   useFollowingCount(user.id);

  const {
    data: { followers, following },
    isLoading,
  } = useCounts(user.id);

  // const isLoading = isFollowersLoading || isFollowingLoading;

  // console.log("isloading", isLoading);
  function onClose() {
    setIsOpen(false);
  }

  function onCloseComplete() {
    dispatch(closeModal());
  }

  //님은 아직 아무도 팔로우하고 있지 않습니다.
  //님은 아직 팔로워가 없습니다.
  return (
    <Modal
      onClose={onClose}
      onCloseComplete={onCloseComplete}
      isOpen={isOpen}
      isCentered
    >
      <ModalOverlay />
      {isLoading ? (
        <ModalContent maxWidth="fit-content" background="none" boxShadow="none">
          <Spinner />
        </ModalContent>
      ) : (
        <ModalContent maxWidth="medium_screen_max_width">
          <ModalBody p="0px">
            <Tabs colorScheme="teal" isFitted={true} isLazy>
              <TabList color="gray.400">
                <Tab
                  borderTopLeftRadius="var(--chakra-radii-md)"
                  display="block"
                >
                  <Text>팔로워</Text>
                  <Text fontSize="12px">{followers}</Text>
                </Tab>
                <Tab
                  borderTopRightRadius="var(--chakra-radii-md)"
                  display="block"
                >
                  <Text>팔로잉</Text>
                  <Text fontSize="12px">{following}</Text>
                </Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  {followers > 0 ? (
                    "d"
                  ) : (
                    <Center>{user.username}님은 아직 팔로워가 없습니다.</Center>
                  )}
                </TabPanel>
                <TabPanel>
                  {" "}
                  {following > 0 ? (
                    "d"
                  ) : (
                    <Center>
                      {user.username}님은 아직 아무도 팔로우하고 있지 않습니다.
                    </Center>
                  )}
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
        </ModalContent>
      )}
    </Modal>
  );
}
