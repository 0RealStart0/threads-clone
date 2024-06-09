import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React from "react";
import { VscEllipsis } from "react-icons/vsc";
import { useDeletePost } from "../../../hooks/posts";

export default function PostMenu({ isMine, postId }) {
  const { mutate: deletePost, isPending: deleteLoading } =
    useDeletePost(postId);
  return (
    <>
      <Menu autoSelect={false} direction={"rtl"} placement="bottom-end">
        <MenuButton
          isRound={true}
          as={IconButton}
          aria-label="Options"
          icon={<VscEllipsis size={20} />}
          variant="ghost"
          colorScheme="teal"
          size="xs"
        />
        {/* <MenuButton
                  aria-label="더보기"
                  transition="all 0.2s"
                  _hover={{ bg: "teal.50" }}
                >
                  <VscEllipsis strokeWidth="0.5" size={20} />
                </MenuButton> */}
        <MenuList minWidth="190px">
          <MenuItem>저장</MenuItem>

          {isMine && <MenuItem onClick={deletePost}>삭제</MenuItem>}
        </MenuList>
      </Menu>
    </>
  );
}
