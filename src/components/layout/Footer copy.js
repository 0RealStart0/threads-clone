import { Flex } from "@chakra-ui/react";
import React from "react";
import { NavIcons } from "./Navbar";

export default function Footer() {
  return (
    <Flex
      borderTop="2px solid"
      borderTopColor="blackAlpha.100"
      //   borderBottom="6px solid"
      //   borderBottomColor="teal.400"
      pos="fixed"
      width="full"
      bottom="0"
      height="14"
      zIndex="3"
      justify="space"
      bg="white"
      align="center"
    >
      <NavIcons w="full" spacing="0" justify="space-around" />
    </Flex>
  );
}
