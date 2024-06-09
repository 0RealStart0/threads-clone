import { useSelector } from "react-redux";

import { selectModal } from "../../../store/modalSlice";
import NewPost from "./NewPost";
import EditProfile from "./EditProfile";
import UserInfo from "./UserInfo";
import FollowersFollowing from "./FollowersFollowing";

const MODAL_TYPES = {
  newPost: "newPost",
  editProfile: "editProfile",
  userInfo: "userInfo",
  followersFollowing: "followersFollowing",
};

const MODAL_COMPONENTS = [
  { type: MODAL_TYPES.newPost, component: <NewPost /> },
  { type: MODAL_TYPES.editProfile, component: <EditProfile /> },
  { type: MODAL_TYPES.userInfo, component: <UserInfo /> },
  { type: MODAL_TYPES.followersFollowing, component: <FollowersFollowing /> },
];

export default function GlobalModal() {
  // modal type을 string 형태로 받습니다.
  const { modalType, isOpen } = useSelector(selectModal);

  if (!isOpen) return;

  const findModal = MODAL_COMPONENTS.find((modal) => {
    return modal.type === modalType;
  });

  const renderModal = () => {
    return findModal.component;
  };
  return (
    <>
      {/* <Overlay onClick={() => dispatch(closeModal())} /> */}
      {renderModal()}
    </>
  );
}
