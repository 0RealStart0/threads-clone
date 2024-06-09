import { Box, Flex, Grid, GridItem, Link, Text } from "@chakra-ui/react";
import PostMenu from "../commons/menus/PostMenu";
import { format, formatDistanceToNow } from "date-fns";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/userSlice";

export default function Header({ fullName, post }) {
  const fromNow = formatDistanceToNow(new Date(post.date.toDate()));
  const {
    currentUser: { user },
  } = useSelector(selectUser);
  const isMine = user.id === post.createdBy;
  // console.log("isMine", isMine, user);

  return (
    <>
      <Grid h="100%" templateColumns="1fr max-content">
        <Flex
          gridColumnStart="1"
          alignSelf="center"
          alignItems="baseline"
          columnGap="6px"
        >
          <Text whiteSpace="nowrap">{fullName}</Text>
          <Text
            w="100%"
            textAlign="left"
            wordBreak="break-word"
            color="gray.400"
          >
            <Link _hover={{ textDecoration: "none" }}>
              <span>{fromNow}</span>
            </Link>
          </Text>
        </Flex>

        <GridItem
          colStart="2"
          alignSelf="center"
          display="flex"
          alignItems="center"
        >
          <Box ml="10px" w="20px">
            <PostMenu isMine={isMine} postId={post.id} />
          </Box>
        </GridItem>
      </Grid>
    </>
  );
}
