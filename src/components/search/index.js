import React, { useState } from "react";
import { Box, Center, Collapse, Flex, Spinner } from "@chakra-ui/react";

import UserSummary from "./UserSummary";

import SearchBlock from "./SearchBlock";
import {
  useFollowers,
  useFollowing,
  useInfiniteUsers,
} from "../../hooks/users";
import InfiniteScroll from "react-infinite-scroller";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/userSlice";

export default function Search() {
  const {
    currentUser: { uid },
    isLoading: isUserLoading,
  } = useSelector(selectUser);
  const [isFocus, setIsFocus] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // const{data:followers,isLoading:isFollwersLoading} = useFollowers(uid);
  const { data: following, isLoading: isFollowingLoading } = useFollowing(uid);
  const followingArr = following ? following.map((el) => el.docId) : [];

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    isLoading,
  } = useInfiniteUsers(uid);

  // if (isLoading) return <div className="loading">Loading...</div>;
  return (
    <Flex
      direction="column"
      width="100%"
      maxWidth={{
        base: "none",
        sm: "large_screen_max_width",
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
      <Flex
        direction="column"
        alignSelf="center"
        alignItems="center"
        position="relative"
        // flexGrow="1"
        width={{
          base: "full",
          sm: "calc(var(--chakra-space-search_page_width) + 34px)",
        }}
      >
        <SearchBlock
          isFocus={isFocus}
          setIsFocus={setIsFocus}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          uid={uid}
          followingArr={followingArr}
        />

        <Flex
          direction="column"
          width={{ base: "full", sm: "search_page_width" }}
          opacity={isFocus && searchTerm ? "0.2" : "1"}
        >
          <Flex
            direction="column"
            flexGrow="1"
            width="full"
            mt="12px"
            minHeight="100%"
          >
            {/* {isFetching && <div className="loading">Loading...</div>} */}

            {!isLoading && !isFollowingLoading && (
              <InfiniteScroll
                loadMore={() => {
                  if (!isFetching) fetchNextPage();
                }}
                hasMore={hasNextPage}
                // Note: add `initialLoad={false}` to avoid double-load of page 2.
                // See this Q&A thread for more details:
                //    https://www.udemy.com/course/learn-react-query/learn/#questions/21523180/
                initialLoad={false}
              >
                {data.pages.map((page) => {
                  return page.users.map((user) => {
                    return (
                      <UserSummary
                        key={user.id}
                        username={user.username}
                        fullName={user.fullName}
                        avatar={user.avatar}
                        id={user.id}
                        uid={uid}
                        isFollowing={followingArr.includes(user.id)}
                      />
                    );
                  });
                })}
              </InfiniteScroll>
            )}
          </Flex>
        </Flex>
      </Flex>
      {isLoading && isFollowingLoading && (
        <Flex justify="center" align="center" flex="1">
          <Spinner />
        </Flex>
      )}
      {isFetching && isFollowingLoading && (
        <Flex justify="center" align="center" mt="20px">
          <Spinner />
        </Flex>
      )}
    </Flex>
  );
}
