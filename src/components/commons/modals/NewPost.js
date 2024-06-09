import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormErrorMessage,
  Grid,
  GridItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import reactTextareaAutosize from "react-textarea-autosize";

import { closeModal, selectModal } from "../../../store/modalSlice";
// import Post from "../../post";
import { selectUser } from "../../../store/userSlice";
import { postValidata } from "../../../utils/form-validate";
import ThreadLine from "./../../post/ThreadLine";
import { useAddPost } from "../../../hooks/posts";
import Header from "../../post/Header";
import { postAreaVariations } from "../../../utils/postAreaVariations";
import NewPostActions from "../../post/NewPostActions";
import DeleteAlertModal from "./DeleteAlertModal";
import { Link } from "react-router-dom";

export default function NewPost() {
  const [isOpen, setIsOpen] = useState(true);
  // const { data } = useSelector(selectModal);
  const {
    currentUser: { user },
  } = useSelector(selectUser);
  const { mutate: addPost, isPending: isAddingPost } = useAddPost();
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
    setValue,
    formState: { errors },
  } = useForm({ defaultValues: { text: "" }, mode: "onChange" });
  const text = watch("text", "");
  const formRef = useRef(null);

  useEffect(() => {
    if (errors.text) {
      let adjustedText = text
        .substring(0, 500)
        .split("\n")
        .slice(0, 20)
        .join("\n");
      setValue("text", adjustedText, { shouldValidate: true });
    }
  }, [errors.text, setValue, text]);

  async function handleEdit(data) {
    addPost(
      {
        createdBy: user.id,
        text: data.text,
      },
      {
        onSuccess: () => {
          onAlertClose();
          setIsOpen(false);
        },
      }
    );
  }

  function handleClick() {
    formRef.current.dispatchEvent(
      new Event("submit", { cancelable: true, bubbles: true })
    );
  }

  function handleCheckClose() {
    onAlertClose();
    setIsOpen(false);
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onCloseComplete={onCloseComplete}
      isCentered
      size={{ base: "full", sm: "" }}
    >
      <ModalOverlay />
      <ModalContent maxWidth="large_screen_max_width">
        <ModalHeader fontSize="18px" alignItems="center">
          <Grid templateColumns="minmax(64px, 100px) 1fr minmax(64px, 100px)">
            <GridItem
              colStart="1"
              display={{ base: "block", sm: "none" }}
              cursor="pointer"
              onClick={onClose}
            >
              취소
            </GridItem>
            <GridItem colStart="2" textAlign="center">
              새로운 스레드
            </GridItem>
            <GridItem
              colStart="3"
              justifySelf="end"
              display={{ base: "block", sm: "none" }}
            >
              <Button
                colorScheme="teal"
                mr={3}
                onClick={handleClick}
                isDisabled={!text || isAddingPost}
                m="0px"
              >
                게시
              </Button>
            </GridItem>
          </Grid>
        </ModalHeader>
        <ModalBody py="0px">
          <Post user={user} showThreadLine={true}>
            <form onSubmit={handleSubmit(handleEdit)} ref={formRef}>
              <FormControl isInvalid={errors.text}>
                <Textarea
                  as={reactTextareaAutosize}
                  resize="none"
                  rows="1"
                  p="0px"
                  m="0px"
                  maxRows="12"
                  outline="none"
                  border="none"
                  _focus={{ boxShadow: "none" }}
                  autoFocus={true}
                  placeholder="스레드를 시작하세요..."
                  // onHeightChange={(data) => console.log(data)}
                  // _focus={{ boxShadow: "none", border: "2px" }}
                  {...register("text", postValidata)}
                  mb="4px"
                />

                <FormErrorMessage>
                  {errors.text && errors.text.message}
                </FormErrorMessage>
              </FormControl>
            </form>
            {/* <Textarea
              as={reactTextareaAutosize}
              resize="none"
              rows="1"
              p="0px"
              outline="none"
              border="none"
              _focus={{ boxShadow: "none" }}
              placeholder="스레드를 시작하세요..."
              {...register("postText", { required: true })}
            /> */}
          </Post>
          {/* <DeleteAlertModal  onAlertClose={onAlertClose} isAlertOpen={isAlertOpen} handleCheckClose={handleCheckClose}/> */}
          <Modal
            onClose={onAlertClose}
            size="xs"
            isOpen={isAlertOpen}
            isCentered
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader textAlign="center">
                스레드를 삭제 하시겠어요?
              </ModalHeader>

              <ModalFooter p="0px">
                <ButtonGroup w="full" isAttached>
                  <Button
                    onClick={onAlertClose}
                    w="full"
                    variant="ghost"
                    colorScheme="teal"
                  >
                    취소
                  </Button>
                  <Button
                    w="full"
                    onClick={handleCheckClose}
                    variant="ghost"
                    colorScheme="red"
                  >
                    삭제
                  </Button>
                </ButtonGroup>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </ModalBody>
        <ModalFooter justifyContent="space-between" pt="0px">
          <Text
            textAlign="right"
            fontSize="xs"
            color={text.length >= 500 ? "red" : "gray.500"}
          >
            {text.length}/500
          </Text>
          <Button
            colorScheme="teal"
            mr={3}
            onClick={handleClick}
            isDisabled={!text || isAddingPost}
            m="0px"
          >
            게시
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

function Post({ user, showThreadLine = false, children }) {
  return (
    <Grid
      templateAreas={postAreaVariations.threadLine}
      templateColumns=" var(--chakra-sizes-threadline_column_width) minmax(0, 1fr)"
      templateRows="21px 19px max-content max-content"
      cursor="pointer"
    >
      <GridItem area="avatar" alignSelf="center">
        {user.avatar ? (
          <Avatar
            width="36px"
            height="36px"
            size="sm"
            src={user.avatar}
            borderWidth="0.5px"
            borderColor="gray.200"
          />
        ) : (
          <Avatar width="36px" height="36px" size="sm" />
        )}
      </GridItem>
      <GridItem area="header" alignSelf="flex-end" color="teal.500">
        <Grid h="100%" templateColumns="1fr max-content">
          <Flex
            gridColumnStart="1"
            alignSelf="center"
            alignItems="baseline"
            columnGap="6px"
          >
            <Text whiteSpace="nowrap">{user.fullName}</Text>
          </Flex>
        </Grid>
      </GridItem>
      <GridItem area="body">
        <Box>
          <Box
            mt="3px"
            overflowX="hidden"
            overflowY="hidden"
            overflowWrap="anywhere"
            lineHeight="140%"
            whiteSpace="pre-wrap"
          >
            {children}
          </Box>

          <Box mt="6px" ml="-7px">
            <NewPostActions />
          </Box>
        </Box>
      </GridItem>
      {showThreadLine && (
        <GridItem area="line" pr="12px">
          <ThreadLine />
        </GridItem>
      )}
    </Grid>
  );
}
