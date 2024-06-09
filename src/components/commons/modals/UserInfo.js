import {
  Avatar,
  Box,
  Divider,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, selectModal } from "../../../store/modalSlice";
import { format } from "date-fns";

export default function UserInfo() {
  const [isOpen, setIsOpen] = useState(true);
  const { data } = useSelector(selectModal);
  const dispatch = useDispatch();

  function onClose() {
    setIsOpen(false);
  }

  function onCloseComplete() {
    dispatch(closeModal());
  }
  return (
    <Modal
      onClose={onClose}
      onCloseComplete={onCloseComplete}
      isOpen={isOpen}
      isCentered
    >
      <ModalOverlay />
      <ModalContent maxWidth="400px">
        <ModalBody py="8px" px="16px" cursor="default">
          <Stack px="16px" gap="0px">
            <Flex gap="16px" alignItems="center">
              <Box flexGrow="1" pt="12px">
                <Text>이름</Text>
                <Text color="blackAlpha.700" cursor="text" mb="12px">
                  {data.fullName} (@{data.username})
                </Text>
                <Divider borderBottomWidth="2px" />
              </Box>

              {data.avatar ? (
                <Avatar
                  size="lg"
                  key="with-src"
                  mx="6px"
                  src={data.avatar}
                  alignSelf="flex-end"
                />
              ) : (
                <Avatar
                  size="lg"
                  key="without-src"
                  mx="6px"
                  alignSelf="flex-end"
                />
              )}
            </Flex>

            <Box py="12px">
              <Text>가입 날짜</Text>
              <Text color="blackAlpha.700">
                {format(new Date(data.createdAt.toDate()), "yyyy년 M월")}
              </Text>
            </Box>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
