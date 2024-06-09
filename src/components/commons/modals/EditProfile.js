import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../store/modalSlice";
import { selectUser } from "../../../store/userSlice";

import EditName from "./sub-modals/EditName";
import EditBio from "./sub-modals/EditBio";
import EditLink from "./sub-modals/EditLink";
import EditModalHeader from "./EditModalHeader";
import { useEditProfile } from "../../../hooks/auth";

export default function EditProfile() {
  const [isOpen, setIsOpen] = useState(true);
  const [openModalId, setOpenModalId] = useState("");
  const dispatch = useDispatch();
  const {
    currentUser: { user },
  } = useSelector(selectUser);
  const formRef = useRef(null);

  const [file, setFile] = useState(null);

  const [formData, setFormData] = useState({
    fullName: user.fullName,
    username: user.username,
    bio: user.bio,
    link: user.link,
    avatar: user.avatar,
  });

  const { editProfile, isPending } = useEditProfile(user.id);

  const toast = useToast();

  function handleFileChange(e) {
    const newfile = e.target.files[0];
    const fileSize = newfile / (1024 * 1024);
    const MAX_FILE_SIZE = 10;
    if (fileSize > MAX_FILE_SIZE) {
      toast({
        title: "Max file size 10mb",
        status: "error",
        isClosable: true,
        duration: 3000,
      });
      return;
    }
    setFile(newfile);
    setFormData({ ...formData, avatar: URL.createObjectURL(newfile) });
    e.target.value = null;
  }

  function handleFileDelete() {
    setFile(null);
    setFormData({ ...formData, avatar: "" });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const updatedFields = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== user[key]) {
        updatedFields[key] = formData[key];
      }
    });
    if (Object.keys(updatedFields).length === 0) {
      onClose();
      return;
    }
    // console.log(updatedFields, file);
    editProfile(
      { updatedFields, file },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  }

  function onClose() {
    setIsOpen(false);
  }
  function onCloseComplete() {
    dispatch(closeModal());
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onCloseComplete={onCloseComplete}
      isCentered
      size={{ base: "full", sm: "lg" }}
    >
      {openModalId === "EditName" && (
        <EditName
          onCloseComplete={() => setOpenModalId("")}
          onSave={(newData) => {
            setFormData((prev) => ({ ...prev, ...newData }));
          }}
          formData={formData}
        />
      )}
      {openModalId === "EditBio" && (
        <EditBio
          onCloseComplete={() => setOpenModalId("")}
          onSave={(newData) => {
            setFormData((prev) => ({ ...prev, ...newData }));
          }}
          formData={formData}
        />
      )}
      {openModalId === "EditLink" && (
        <EditLink
          onCloseComplete={() => setOpenModalId("")}
          onSave={(newData) => {
            setFormData((prev) => ({ ...prev, ...newData }));
          }}
          formData={formData}
        />
      )}

      <ModalOverlay />
      <ModalContent>
        <ModalHeader display={{ base: "block", sm: "none" }}>
          <EditModalHeader
            title="프로필 편집"
            formRef={formRef}
            onClose={onClose}
            isLoading={isPending}
          />
        </ModalHeader>
        <ModalBody
          p="24px"
          pt={{ base: "0.5", sm: "24px" }}
          display={{ base: "flex", sm: "block" }}
          alignItems="center"
          justifyContent="center"
        >
          <form style={{ width: "100%" }} onSubmit={handleSubmit} ref={formRef}>
            <Stack spacing="16px" mb="16px">
              <Flex gap="16px">
                <Box flexGrow="1">
                  <Text>이름</Text>
                  <Text
                    pt="4px"
                    pb="14px"
                    // color="gray.500"
                    cursor="pointer"
                    onClick={() => setOpenModalId("EditName")}
                  >
                    {formData.fullName} (@{formData.username})
                  </Text>
                  <Divider borderBottomWidth="2px" />
                </Box>
                <Menu
                  autoSelect={false}
                  direction={"rtl"}
                  placement="bottom-end"
                  gutter={-4}
                >
                  <MenuButton aria-label="Options" type="button">
                    {/* {formData.avatar ? (
                      <Avatar mx="6px" src={formData.avatar} />
                    ) : (
                      <IconButton
                        isRound={true}
                        variant="ghost"
                        colorScheme="teal"
                        icon={<PiUserCirclePlusLight size="60" />}
                      />
                    )} */}
                    {formData.avatar ? (
                      <Avatar key="with-src" mx="6px" src={formData.avatar} />
                    ) : (
                      <Avatar key="without-src" mx="6px" />
                    )}
                  </MenuButton>

                  <MenuList minWidth="190px">
                    <MenuItem as="label" htmlFor="file" cursor="pointer">
                      사진 업로드
                    </MenuItem>
                    <MenuItem
                      isDisabled={!(user.avatar || formData.avatar)}
                      color="red"
                      onClick={handleFileDelete}
                    >
                      현재 사진 삭제
                    </MenuItem>
                    <Input
                      id="file"
                      type="file"
                      accept="image/*"
                      display="none"
                      onChange={handleFileChange}
                    />
                  </MenuList>
                </Menu>
              </Flex>
              <Box>
                <Text>소개</Text>
                <Text
                  pt="4px"
                  pb="14px"
                  color={formData.bio ? "" : "gray.400"}
                  cursor="pointer"
                  onClick={() => setOpenModalId("EditBio")}
                >
                  {formData.bio || "+ 소개 작성"}
                </Text>
                <Divider borderBottomWidth="2px" />
              </Box>
              <Box flexGrow="1">
                <Text>링크</Text>
                <Text
                  pt="4px"
                  pb="14px"
                  color={formData.link ? "blue.400" : "gray.400"}
                  minH="42px"
                  cursor="pointer"
                  onClick={() => setOpenModalId("EditLink")}
                >
                  {formData.link || "+ 링크 추가"}
                </Text>
                <Divider borderBottomWidth="2px" />
              </Box>
            </Stack>
            <Button
              type="submit"
              colorScheme="teal"
              size="lg"
              w="full"
              isLoading={isPending}
              display={{ base: "none", sm: "flex" }}
              justifyContent="center"
              alignItems="center"
            >
              완료
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
