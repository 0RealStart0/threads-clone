import { Flex } from "@chakra-ui/react";
import React from "react";

export default function MainContainer({ children }) {
  return (
    <Flex
      direction="column"
      width="100%"
      maxWidth={{
        base: "none",
        sm: "medium_screen_max_width",
        md: "large_screen_max_width",
      }}
      px={{ base: "", sm: "desktop_page_horizontal_padding" }}
      mb={{
        base: "calc(var(--chakra-space-small_screen_nav_height) + env(safe-area-inset-bottom) + 32px)",
        sm: "32px",
      }}
      mx="auto"
      flexGrow="1"
      zIndex="1"
    >
      {children}
    </Flex>
  );
}
