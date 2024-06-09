import { Button } from "@chakra-ui/react";
import { useToggleFollow } from "../../hooks/users";

function FollowButton({ config, isFull = false }) {
  const { isFollowing } = config;
  const { mutate: toggleFollow, isPending: isFollowLoading } =
    useToggleFollow(config);

  const handleButtonClick = (event) => {
    event.stopPropagation();

    toggleFollow();
    // console.log("Button clicked!", isFollowing);
  };

  const styles = isFull
    ? { w: "full" }
    : { minWidth: "104px", maxWidth: "100%", height: "34px" };

  return (
    <Button
      colorScheme="teal"
      variant={isFollowing ? "solid" : "outline"}
      isLoading={isFollowLoading}
      onClick={handleButtonClick}
      {...styles}
    >
      {isFollowing ? "팔로잉" : "팔로우"}
    </Button>
  );
}

export default FollowButton;
