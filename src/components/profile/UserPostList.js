import React from "react";
import { useParams } from "react-router-dom";
import { usePosts } from "../../hooks/posts";
import PostsList from "../post/PostList";
import { Box, Text } from "@chakra-ui/react";
import Post from "../post";

export default function UserPostList() {
  const { userId } = useParams();
  const { data: posts, isLoading } = usePosts(userId);
  console.log(posts);
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
