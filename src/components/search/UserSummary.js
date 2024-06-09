import { Avatar, Box, Button, Center, Flex, Text } from "@chakra-ui/react";
import UserCard from "./../commons/user-summary/UserCard";

import { useCounts, useToggleFollow } from "../../hooks/users";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FollowButton from "./FollowButton";

export default function UserSummary({
  username,
  fullName,
  avatar = null,
  id,
  uid,
  isFollowing,
}) {
  const { data: counts, isLoading: isCountsLoading } = useCounts(id);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  const config = { id, uid, isFollowing };

  const handleNavigate = (e) => {
    navigate(`/user/${id}`);
  };

  useEffect(() => {
    if (avatar) {
      const img = new Image();
      img.src = avatar;
      img.onload = () => setIsLoaded(true);
      img.onerror = () => setIsLoaded(false);
    } else {
      setIsLoaded(false);
    }
  }, [avatar]);

  return (
    <Flex
      cursor="pointer"
      pt="user_list_item_padding"
      pl={{ base: "user_list_item_padding", sm: "0px" }}
      onClick={handleNavigate}
    >
      <Box pr="12px" pt="6px">
        {isLoaded ? (
          <Avatar
            width="36px"
            height="36px"
            size="sm"
            src={avatar}
            borderWidth="0.5px"
            borderColor="gray.200"
          />
        ) : (
          <Avatar width="36px" height="36px" size="sm" />
        )}
      </Box>
      <Flex
        direction="column"
        flexGrow="1"
        borderBottom="0.5px solid"
        borderBottomColor="teal.100"
        pr={{ base: "user_list_item_padding", sm: "0px" }}
      >
        <Flex
          justifyContent="space-between"
          alignItems="center"
          pb="8px"
          flexGrow="1"
        >
          <Flex
            direction="column"
            justifyContent="center"
            height="42px"
            pr="8px"
            minWidth="0px"
          >
            <Text height="21px" _hover={{ textDecoration: "underline" }}>
              {username}
            </Text>
            <Text color="blackAlpha.500" height="21px" minWidth="128px">
              {fullName}
            </Text>
          </Flex>
          <FollowButton config={config} />
        </Flex>
        <Box pb="12px" color="blackAlpha.700" fontSize="15px">
          팔로워 {isCountsLoading ? 0 : counts.followers} 명
        </Box>
      </Flex>
    </Flex>
  );
}
