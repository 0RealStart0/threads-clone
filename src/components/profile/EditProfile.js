import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "../../../store/modalSlice";
import { useForm } from "react-hook-form";

export default function EditProfile() {
  const [isOpen, setIsOpen] = useState(true);
  const dispatch = useDispatch();

  const {
    isOpen: isAlertOpen,
    onOpen: onAlertOpen,
    onClose: onAlertClose,
  } = useDisclosure();

  function onClose() {
    if (!text) {
      setIsOpen(false);
    } else {
      onAlertOpen();
    }
  }
  function onCloseComplete() {
    dispatch(closeModal());
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const text = watch("postText", "");

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onCloseComplete={onCloseComplete}
      isCentered
      size={{ base: "full", sm: "lg" }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          fontSize="18px"
          alignItems="center"
          display={{ base: "block", sm: "none" }}
        >
          <Grid templateColumns="minmax(64px, 100px) 1fr minmax(64px, 100px)">
            <GridItem colStart="1">취소</GridItem>
            <GridItem colStart="2" textAlign="center">
              프로필 편집
            </GridItem>
            <GridItem colStart="3">완료</GridItem>
          </Grid>
        </ModalHeader>
        <ModalBody
          p="24px"
          pt={{ base: "0.5", sm: "24px" }}
          display={{ base: "flex", sm: "block" }}
          alignItems="center"
          justifyContent="center"
        >
          <form onSubmit={handleSubmit()}>
            <Flex gap="16px">
              <FormControl isInvalid={errors.fullName} pb="16px">
                <FormLabel>이름</FormLabel>
                <Input
                  type="text"
                  placeholder="user@email.com"
                  variant="flushed"
                  {...register("fullName")}
                />
                <FormErrorMessage>
                  {errors.fullName && errors.fullName.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.username} pb="16px">
                <FormLabel>아이디</FormLabel>
                <Input
                  type="text"
                  placeholder="password123"
                  variant="flushed"
                  {...register("username")}
                />
                <FormErrorMessage>
                  {errors.username && errors.username.message}
                </FormErrorMessage>
              </FormControl>
              <Avatar></Avatar>
            </Flex>
            <FormControl isInvalid={errors.bio} pb="16px">
              <FormLabel>소개</FormLabel>
              <Input
                type="text"
                placeholder="password123"
                variant="flushed"
                {...register("bio")}
              />
              <FormErrorMessage>
                {errors.bio && errors.bio.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.link} pb="16px">
              <FormLabel>링크</FormLabel>
              <Input
                type="text"
                placeholder="password123"
                variant="flushed"
                {...register("link")}
              />
              <FormErrorMessage>
                {errors.link && errors.link.message}
              </FormErrorMessage>
            </FormControl>
            <Button
              type="submit"
              colorScheme="teal"
              size="lg"
              w="full"
              loadingText="Logging In"
            >
              완료
            </Button>
          </form>

          <AlertDialog isOpen={isAlertOpen} onClose={onAlertClose} isCentered>
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg">
                  스레드를 삭제 하시겠어요?
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <Button onClick={onAlertClose} colorScheme="teal">
                    취소
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={() => {
                      onAlertClose();
                      setIsOpen(false);
                    }}
                    ml={3}
                  >
                    삭제
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </ModalBody>
        {/* <ModalFooter>
          <Button
            colorScheme="teal"
            mr={3}
            onClick={onClose}
            isDisabled={!text}
          >
            게시
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter> */}
      </ModalContent>
    </Modal>
  );
}
