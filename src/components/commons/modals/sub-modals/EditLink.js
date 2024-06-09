import {
  FormControl,
  FormErrorMessage,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { linkValidate } from "../../../../utils/form-validate";

import EditModalHeader from "../EditModalHeader";

export default function EditLink({ onCloseComplete, formData, onSave }) {
  const [isOpen, setIsOpen] = useState(true);
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({ defaultValues: { link: formData.link }, mode: "onChange" });

  const formRef = useRef(null);

  function onClose() {
    setIsOpen(false);
  }

  async function handleEdit(data) {
    onSave({ link: data.link });
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
            title="링크 수정"
            formRef={formRef}
            onClose={onClose}
          />
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(handleEdit)} ref={formRef}>
            <FormControl isInvalid={errors.link} pb="16px">
              <Input
                color="blue.400"
                type="text"
                {...register("link", linkValidate)}
                autoFocus={true}
              />
              <FormErrorMessage>
                {errors.link && errors.link.message}
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
