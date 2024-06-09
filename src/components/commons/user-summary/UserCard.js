import { Box, Flex } from "@chakra-ui/react";
import FollowButton from "./FollowButton";

export default function UserCard({ user }) {
  return (
    <Flex>
      <Box>UserCard</Box>
      <FollowButton />
    </Flex>
  );
}
