import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  SlideFade,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { VscChromeClose, VscSearch } from "react-icons/vsc";
import UserSummary from "./UserSummary";
import { useEffect, useRef, useState } from "react";
import { useSearchUsers } from "../../hooks/users";

function SearchBlock({
  isFocus,
  setIsFocus,
  searchTerm,
  setSearchTerm,
  uid,
  followingArr,
}) {
  const searchRef = useRef(null);
  const resultRef = useRef(null);
  const lastChange = useRef(null);

  const [search, setSearch] = useState("");
  const { data, isLoading } = useSearchUsers(search);

  function handleFocus() {
    setIsFocus(true);
  }

  function handleBlur() {
    // 여기서는 특별한 작업 없이 handleClickOutside에서 처리
  }

  function handleSearchChange(e) {
    const value = e.target.value;
    setSearchTerm(value);
    if (lastChange.current) {
      clearTimeout(lastChange.current);
    }

    lastChange.current = setTimeout(() => {
      lastChange.current = null;
      setSearch(value);
    }, 500);
  }

  function clearSearchTerm(e) {
    e.preventDefault();
    if (searchRef.current) {
      searchRef.current.focus();
    }
    setSearchTerm("");
  }

  function cancelSearch(e) {
    setSearchTerm("");
  }

  function setFocus() {
    if (searchRef.current) {
      searchRef.current.focus();
    }
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        resultRef.current &&
        !resultRef.current.contains(event.target)
      ) {
        setIsFocus(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsFocus]);

  return (
    <>
      <Flex
        width="full"
        mt="6px"
        px={{
          base: "user_list_item_padding",
          sm: isFocus && searchTerm ? "0px" : "user_list_item_padding",
        }}
        transition="padding 0.2s"
        alignItems="center"
        gap="4px"
      >
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            cursor="default"
            alignItems="center"
            top="4px"
            left="8px"
          >
            <VscSearch />
          </InputLeftElement>
          <Input
            placeholder="검색"
            size="lg"
            fontSize="16px"
            _focus={{
              boxShadow: {
                base: "none",
                sm: "xl",
              },
            }}
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            ref={searchRef}
          />
          {searchTerm && (
            <InputRightElement alignItems="center" top="4px" right="8px">
              <VscChromeClose cursor="pointer" onMouseDown={clearSearchTerm} />
            </InputRightElement>
          )}
        </InputGroup>
        <Button
          colorScheme="white"
          variant="ghost"
          display={{ base: isFocus ? "block" : "none", sm: "none" }}
          onMouseDown={cancelSearch}
        >
          취소
        </Button>
      </Flex>
      <Box
        position="absolute"
        top="54px"
        left="0px"
        display={isFocus && searchTerm ? "block" : "none"}
        zIndex="10"
        ref={resultRef}
      >
        <Flex
          direction="column"
          width={{
            base: "full",
            sm: "calc(var(--chakra-space-search_page_width) + 34px)",
          }}
          alignItems="center"
          border="1px"
          borderColor="teal.100"
          boxShadow="xl"
          backgroundColor="white"
          rounded="md"
          minHeight="50px"
          maxHeight="600px"
          overflowY="auto"
        >
          <Flex
            direction="column"
            flexGrow="1"
            width={{ base: "full", sm: "search_page_width" }}
            mt="12px"
          >
            {searchTerm.trim() && isLoading && !data && (
              <Flex
                justify="center"
                align="center"
                flex="1"
                height="36px"
                mb="8px"
              >
                <Spinner />
              </Flex>
            )}
            {!isLoading &&
              data &&
              (data.length > 0 ? (
                data.map((user) => (
                  <UserSummary
                    key={user.id}
                    username={user.username}
                    fullName={user.fullName}
                    avatar={user.avatar}
                    id={user.id}
                    uid={uid}
                    isFollowing={followingArr.includes(user.id)}
                    onClick={() => {
                      setIsFocus(true);
                      // 기타 클릭 시 동작
                    }}
                    tabIndex={0}
                  />
                ))
              ) : (
                <Flex
                  justify="center"
                  align="center"
                  flex="1"
                  height="36px"
                  mb="8px"
                >
                  <Text>검색된 유저가 없습니다. </Text>
                </Flex>
              ))}
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

export default SearchBlock;
