import {
  FormControl,
  FormErrorMessage,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { bioValidata } from "../../../../utils/form-validate";
import reactTextareaAutosize from "react-textarea-autosize";

import EditModalHeader from "../EditModalHeader";

export default function EditBio({ onCloseComplete, formData, onSave }) {
  const [isOpen, setIsOpen] = useState(true);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues: { bio: formData.bio }, mode: "onChange" });
  const bio = watch("bio");
  const formRef = useRef(null);

  useEffect(() => {
    if (errors.bio) {
      let adjustedText = bio
        .substring(0, 150)
        .split("\n")
        .slice(0, 12)
        .join("\n");
      setValue("bio", adjustedText, { shouldValidate: true });
    }
  }, [errors.bio, setValue, bio]);

  function onClose() {
    setIsOpen(false);
  }

  async function handleEdit(data) {
    onSave({ bio: data.bio });
    onClose();
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
        {/* <ModalHeader textAlign="center">소개 수정</ModalHeader> */}
        <ModalHeader>
          <EditModalHeader
            title="소개 수정"
            formRef={formRef}
            onClose={onClose}
          />
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(handleEdit)} ref={formRef}>
            <FormControl isInvalid={errors.bio} pb="16px">
              <Textarea
                as={reactTextareaAutosize}
                resize="none"
                rows="1"
                maxRows="12"
                outline="none"
                autoFocus={true}
                // onHeightChange={(data) => console.log(data)}
                // _focus={{ boxShadow: "none", border: "2px" }}
                {...register("bio", bioValidata)}
                mb="4px"
              />
              <Text
                textAlign="right"
                fontSize="xs"
                color={bio.length >= 150 ? "red" : "gray.500"}
              >
                {bio.length}/150
              </Text>
              <FormErrorMessage>
                {errors.bio && errors.bio.message}
              </FormErrorMessage>
            </FormControl>
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
