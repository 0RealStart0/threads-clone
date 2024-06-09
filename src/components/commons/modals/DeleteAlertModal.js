import {
  Button,
  ButtonGroup,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";

function DeleteAlertModal(handleCheckClose, onAlertClose, isAlertOpen) {
  return (
    <Modal onClose={onAlertClose} size="xs" isOpen={isAlertOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">스레드를 삭제 하시겠어요?</ModalHeader>

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
  );
}

export default DeleteAlertModal;
