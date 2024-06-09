import { Avatar, AvatarGroup, Flex, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <>
      <Flex minH="28px" justifyContent="flex-start" alignItems="center">
        {/* <Flex
          justifyContent="center"
          alignItems="center"
          // maxWidth="48px"
          width="48px"
          pr="8px"
        >
          <AvatarGroup size="xs" max={2} spacing="-12px">
            <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" />
            <Avatar
              name="Segun Adebayo"
              src="https://bit.ly/sage-adebayo"
              size="2xs"
            />
            <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
            <Avatar
              name="Prosper Otemuyiwa"
              src="https://bit.ly/prosper-baba"
            />
            <Avatar name="Christian Nwamba" src="https://bit.ly/code-beast" />
          </AvatarGroup>
        </Flex> */}
        <Text color="gray.400">답글 27개 · 좋아요 97개</Text>
      </Flex>
    </>
  );
}
