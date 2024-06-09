import { Box, Text } from "@chakra-ui/react";
import Post from ".";

export default function PostsList({ posts }) {
  return (
    <Box>
      {posts?.length === 0 ? (
        <Text textAlign="center" fontSize="xl">
          아직 작성된 포스트가 없습니다...
        </Text>
      ) : (
        posts?.map((post) => <Post key={post.id} post={post} />)
      )}
    </Box>
  );
}
