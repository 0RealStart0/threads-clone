import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { isFullNameExists, isUsernameExists } from "../../../../hooks/auth";
import {
  fullNameValidate,
  usernameValidate,
} from "../../../../utils/form-validate";

import EditModalHeader from "../EditModalHeader";

export default function EditName({ onCloseComplete, formData, onSave }) {
  const [isOpen, setIsOpen] = useState(true);
  const {
    register,
    handleSubmit,

    formState: { errors, dirtyFields, isDirty },
  } = useForm({
    defaultValues: { fullName: formData.fullName, username: formData.username },
    mode: "onChange",
  });

  const formRef = useRef(null);
  const toast = useToast();

  function showError(msg) {
    toast({
      title: msg,
      status: "error",
      isClosable: true,
      duration: 3000,
    });
  }

  function onClose() {
    setIsOpen(false);
  }

  async function handleEdit(data) {
    let updateAllowed = true;

    let newData = {};
    if (dirtyFields.fullName) {
      const result = await isFullNameExists(data.fullName);
      if (result) {
        showError("중복된 이름입니다");
        updateAllowed = false;
      } else {
        newData.fullName = data.fullName;
      }
    }

    if (dirtyFields.username) {
      const result = await isUsernameExists(data.username);
      if (result) {
        showError("중복된 아이디입니다");
        updateAllowed = false;
      } else {
        newData.username = data.username;
      }
    }

    if (updateAllowed && isDirty) {
      onSave(newData);
      onClose();
    }
  }

  return (
    <Modal
      onClose={onClose}
      onCloseComplete={onCloseComplete}
      isOpen={isOpen}
      isCentered
    >
      <ModalOverlay />
      <ModalContent maxWidth="large_screen_max_width">
        <ModalHeader>
          <EditModalHeader
            title="이름 수정"
            formRef={formRef}
            onClose={onClose}
          />
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(handleEdit)} ref={formRef}>
            <Flex gap="16px">
              <FormControl isInvalid={errors.fullName} pb="16px">
                <FormLabel>이름</FormLabel>
                <Input
                  type="text"
                  autoFocus={true}
                  {...register("fullName", fullNameValidate)}
                />
                <FormErrorMessage>
                  {errors.fullName && errors.fullName.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.username}>
                <FormLabel>아이디</FormLabel>
                <Input
                  type="text"
                  {...register("username", usernameValidate)}
                />
                <FormErrorMessage>
                  {errors.username && errors.username.message}
                </FormErrorMessage>
              </FormControl>
            </Flex>
          </form>
        </ModalBody>
        {/* <ModalFooter p="0px">
          <ButtonGroup w="full" isAttached>
            <Button onClick={onClose} w="full" variant="ghost">
              취소
            </Button>
            <Button
              w="full"
              onClick={() => {
                formRef.current.dispatchEvent(
                  new Event("submit", { cancelable: true, bubbles: true })
                );
              }}
              variant="ghost"
              colorScheme="teal"
            >
              완료
            </Button>
          </ButtonGroup>
        </ModalFooter> */}
      </ModalContent>
    </Modal>
  );
}
