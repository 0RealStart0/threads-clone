import {
  Icon,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  SlideFade,
  Box,
  Grid,
  GridItem,
  Center,
} from "@chakra-ui/react";
import { NavLink as RouterLink } from "react-router-dom";
import { ACTIVITY, ROOT, SEARCH } from "../../lib/routes";
import {
  VscChip,
  VscHome,
  VscSearch,
  VscNewFile,
  VscBell,
  VscAccount,
  VscMenu,
  VscArrowLeft,
} from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../store/modalSlice";
import { useLogout } from "../../hooks/auth";
import { selectUser } from "../../store/userSlice";

export function NavIcons(props) {
  const dispatch = useDispatch();
  const {
    currentUser: { uid },
  } = useSelector(selectUser);

  function handleOpenNewPostModal() {
    dispatch(openModal({ modalType: "newPost" }));
  }
  return (
    <Grid
      w="full"
      templateColumns="repeat(5, 20%)"
      templateRows="1fr"
      mx="auto"
      justifyItems="center"
      alignItems="center"
      {...props}
    >
      <GridItem>
        {" "}
        <Link as={RouterLink} to={ROOT}>
          {({ isActive }) => (
            <IconButton
              colorScheme="teal"
              variant="ghost"
              size="lg"
              color={isActive ? "teal.600" : "teal.300"}
              isActive={isActive}
              icon={<VscHome size="30" />}
            />
          )}
        </Link>
      </GridItem>
      <GridItem>
        {" "}
        <Link as={RouterLink} to={SEARCH} wi>
          {({ isActive }) => (
            <IconButton
              colorScheme="teal"
              variant="ghost"
              size="lg"
              color={isActive ? "teal.600" : "teal.300"}
              isActive={isActive}
              icon={<VscSearch size="30" />}
            />
          )}
        </Link>
      </GridItem>
      <GridItem>
        <IconButton
          colorScheme="teal"
          variant="ghost"
          size="lg"
          color="teal.300"
          icon={<VscNewFile size="30" />}
          onClick={handleOpenNewPostModal}
        />
      </GridItem>
      <GridItem>
        <Link as={RouterLink} to={ACTIVITY}>
          {({ isActive }) => (
            <IconButton
              colorScheme="teal"
              variant="ghost"
              size="lg"
              color={isActive ? "teal.600" : "teal.300"}
              isActive={isActive}
              icon={<VscBell size="30" />}
            />
          )}
        </Link>
      </GridItem>
      <GridItem alignItems="center">
        <Link as={RouterLink} to={`/user/${uid}`}>
          {({ isActive }) => (
            <IconButton
              colorScheme="teal"
              variant="ghost"
              size="lg"
              color={isActive ? "teal.600" : "teal.300"}
              isActive={isActive}
              icon={<VscAccount size="30" />}
            />
          )}
        </Link>
      </GridItem>

      {/* <Link as={RouterLink} to={DIRECT}>
  {({ isActive }) => (
    <IconButton
      colorScheme="teal"
      variant="ghost"
      size="lg"
      color={isActive ? "teal.600" : "teal.300"}
      isActive={isActive}
      icon={<VscCommentDiscussion size="30" />}
    />
  )}
</Link> */}
    </Grid>
  );
}

export default function Navbar({ isOpen }) {
  const { logout, isPending } = useLogout();

  return (
    <Center
      top="0"
      right="0"
      left="0"
      zIndex="1"
      pos="fixed"
      borderTop="6px solid"
      borderTopColor="teal.400"
      // borderBottom="2px solid"
      // borderBottomColor="blackAlpha.100"
      height={{ base: "mobile_header_height", sm: "desktop_header_height" }}
      boxSizing="border-box"
    >
      <Grid
        mx="auto"
        my="auto"
        maxWidth="large_screen_max_page_width"
        w="100%"
        h="100%"
        gridTemplateColumns={{
          base: "1fr 50vw 1fr",
          sm: "1fr max-content 1fr",
        }}
        gridTemplateRows="1fr"
        alignItems="center"
        bg="white"
      >
        <GridItem
          ml={{ base: "auto", sm: "19px" }}
          mr={{ base: "auto", sm: "0" }}
          pt="4px"
          gridColumnStart={{ base: "2", sm: "1" }}
        >
          <Link
            color="teal.600"
            as={RouterLink}
            to={ROOT}
            pt={{ base: "1", sm: "2" }}
            m={{ base: "auto", sm: "0" }}
            //   position={{ base: "absolute", sm: "static" }}
            //   top={{ base: "50%", sm: "auto" }}
            //   left={{ base: "50%", sm: "auto" }}
            //   transform={{ base: "translate(-50%, -50%)", sm: "none" }}
          >
            <Icon
              as={VscChip}
              boxSize={10}
              transition="transform 0.2s ease"
              _hover={{
                transform: "scale(1.1)",
              }}
            />
          </Link>
        </GridItem>
        <GridItem
          pos="relative"
          px="70px"
          maxWidth={{
            sm: "medium_screen_max_width",
            md: "large_screen_max_width",
          }}
          w={{ sm: "100vw", md: "100vw" }}
          // gridRowStart={{ base: "1" }}
          gridColumnStart="2"
          display={{ base: "none", sm: "block" }}
        >
          <NavIcons />
          <Box
            pos="absolute"
            zIndex="1"
            left="0"
            top="0"
            display="block"
            height="100%"
          >
            <SlideFade
              in={isOpen}
              unmountOnExit={true}
              offsetX="-42px"
              offsetY="0"
            >
              <IconButton
                colorScheme="teal"
                variant="ghost"
                isRound={true}
                size="lg"
                icon={<VscArrowLeft size="26" />}
              />
            </SlideFade>
          </Box>
        </GridItem>
        <GridItem ml="auto" mr="13px" gridColumnStart="3">
          <Menu>
            <MenuButton
              transition="all 0.2s"
              color="teal.300"
              _hover={{ color: "teal.600" }}
              _expanded={{ color: "teal.600" }}
            >
              <VscMenu size="28" />
            </MenuButton>
            <MenuList minWidth="174px">
              <MenuItem fontWeight="bold" color="teal.600">
                디자인
              </MenuItem>
              <MenuItem fontWeight="bold" color="teal.600">
                설정
              </MenuItem>
              <MenuItem fontWeight="bold" color="teal.600">
                저장됨
              </MenuItem>
              <MenuItem fontWeight="bold" color="teal.600">
                좋아요
              </MenuItem>
              <MenuItem
                fontWeight="bold"
                color="teal.600"
                onClick={() => logout()}
              >
                로그 아웃
              </MenuItem>
            </MenuList>
          </Menu>
        </GridItem>
        <GridItem
          display={{ base: "block", sm: "none" }}
          colStart="1"
          rowStart="1"
        >
          <SlideFade
            in={isOpen}
            unmountOnExit={true}
            offsetX="-42px"
            offsetY="0"
          >
            <IconButton
              colorScheme="teal"
              variant="ghost"
              isRound={true}
              size="lg"
              icon={<VscArrowLeft size="26" />}
            />
          </SlideFade>
        </GridItem>
      </Grid>
    </Center>
  );
}
