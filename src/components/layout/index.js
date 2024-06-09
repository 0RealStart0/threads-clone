import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { Flex, Show, useDisclosure } from "@chakra-ui/react";
import Footer from "./Footer";

import { useSelector } from "react-redux";
import { selectUser } from "../../store/userSlice";
import { LOGIN } from "../../lib/routes";
import GlobalModal from "../commons/modals/GlobalModal";

export default function Layout() {
  const { isOpen } = useDisclosure();
  const navigate = useNavigate();

  const { currentUser, isLoading } = useSelector(selectUser);

  if (isLoading) {
    return "Loading auth user...";
  }

  if (!isLoading && !currentUser.uid) {
    navigate(LOGIN);
  }

  return (
    <>
      <Navbar isOpen={isOpen} />
      <Flex
        pos="relative"
        top={{ base: "mobile_header_height", sm: "desktop_header_height" }}
        minHeight={{
          base: "calc(100vh - var(--chakra-space-mobile_header_height));",
          sm: "calc(100vh - var(--chakra-space-desktop_header_height));",
        }}
        direction="column"
        zIndex="0"
      >
        <Outlet />
        {/* <Button onClick={onToggle}>Click Me</Button> */}
      </Flex>
      <Show below="sm">
        <Footer />
      </Show>
      <GlobalModal />
    </>
  );
}
