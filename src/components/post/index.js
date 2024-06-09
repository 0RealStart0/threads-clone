import React from "react";
import {
  Avatar,
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  Spinner,
  Text,
  Textarea,
} from "@chakra-ui/react";
import Header from "./Header";
import PostActions from "./PostActions";
import Footer from "./Footer";
import ThreadLine from "./ThreadLine";

import { postAreaVariations } from "./../../utils/postAreaVariations";

import { useUser, useUsers } from "./../../hooks/users";

function Post({ post, showThreadLine = false }) {
  const { data: user, isPending: isLoading } = useUser(post.createdBy);

  if (isLoading)
    return (
      <>
        <Spinner></Spinner>
      </>
    );
  return (
    <>
      <Grid
        templateAreas={postAreaVariations.default}
        templateColumns=" var(--chakra-sizes-threadline_column_width) minmax(0, 1fr)"
        templateRows="21px 19px max-content max-content"
        cursor="pointer"
        py="12px"
      >
        <GridItem area="avatar" alignSelf="center">
          {user.avatar ? (
            <Avatar
              width="36px"
              height="36px"
              size="sm"
              src={user.avatar}
              borderWidth="0.5px"
              borderColor="gray.200"
            />
          ) : (
            <Avatar width="36px" height="36px" size="sm" />
          )}
        </GridItem>
        <GridItem area="header" alignSelf="flex-end" color="teal.500">
          <Header fullName={user.fullName} post={post} />
        </GridItem>
        <GridItem area="body">
          <Box>
            <Box
              mt="3px"
              overflowX="hidden"
              overflowY="hidden"
              overflowWrap="anywhere"
              lineHeight="140%"
              whiteSpace="pre-wrap"
            >
              <Text textAlign="left">{post.text}</Text>
            </Box>

            <Box mt="6px" ml="-7px">
              <PostActions />
            </Box>
          </Box>
        </GridItem>
        {showThreadLine && (
          <GridItem area="line" pr="12px">
            <ThreadLine />
          </GridItem>
        )}
        {post && (
          <GridItem area="footer" display="flex" alignItems="end" h="100%">
            <Footer
              likeCount={post.likeCount}
              commentCount={post.commentCount}
            />
          </GridItem>
        )}
      </Grid>
      <Divider opacity="1" borderBottomWidth="0.5px" color="gray.200" />
    </>
  );
}

export default Post;
