import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Link,
  Spinner,
  Text,
} from "@chakra-ui/react";

import { useDispatch } from "react-redux";
import { openModal } from "../../store/modalSlice";
import MainContainer from "../layout/MainContainer";
import { usePosts } from "./../../hooks/posts";
import PostsList from "../post/PostList";

function NewPost() {
  const dispatch = useDispatch();

  function handleOpenNewPostModal() {
    dispatch(openModal({ modalType: "newPost" }));
  }

  return (
    <Box>
      <Flex py="16px" onClick={handleOpenNewPostModal}>
        <Link>
          <Avatar size="sm"></Avatar>
        </Link>
        <Flex flexGrow="1" alignItems="center" cursor="text">
          <Text mx="8px" px="4px" color="gray.400">
            스레드를 시작하세요...
          </Text>
        </Flex>
        <Box flexShrink="0">
          <Button colorScheme="teal" size="sm">
            게시
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}

export default function Home() {
  const { data: posts, isLoading } = usePosts();
  // console.log(posts);
  if (isLoading)
    return (
      <Flex justify="center" align="center" flex="1">
        <Spinner />
      </Flex>
    );
  return (
    <MainContainer>
      <Box>
        <NewPost />
        <Divider opacity="1" borderBottomWidth="0.5px" color="gray.200" />
        <PostsList posts={posts} />
        {/* <Post /> <Post /> */}
      </Box>
    </MainContainer>
  );
}
