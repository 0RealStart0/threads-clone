import { Box } from "@chakra-ui/react";

export default function ThreadLine() {
  return (
    <>
      <Box pt="10px" pb="4px" h="100%" pos="relative">
        <Box pos="absolute" bottom="4px" top="10px" left="calc(50% - 1px)">
          <Box
            w="2px"
            h="100%"
            backgroundColor="teal.100"
            pos="absolute"
            borderTopLeftRadius="2px"
            borderTopRightRadius="2px"
            borderBottomLeftRadius="2px"
            borderBottomRightRadius="2px"
          ></Box>
        </Box>
      </Box>
    </>
  );
}
