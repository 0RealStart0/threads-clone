import {
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Show,
  Hide,
  SlideFade,
  Portal,
  Box,
} from "@chakra-ui/react";
import { NavLink as RouterLink } from "react-router-dom";
import { ACTIVITY, DIRECT, PROFILE, ROOT, SEARCH } from "../../lib/routes";
import {
  VscChip,
  VscHome,
  VscSearch,
  VscNewFile,
  VscBell,
  VscAccount,
  VscCommentDiscussion,
  VscMenu,
  VscArrowLeft,
} from "react-icons/vsc";

export function NavIcons(props) {
  return (
    <HStack {...props}>
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

      <IconButton
        colorScheme="teal"
        variant="ghost"
        size="lg"
        color="teal.300"
        icon={<VscNewFile size="30" />}
      />
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
      <Link as={RouterLink} to={PROFILE}>
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
    </HStack>
  );
}

export default function Navbar({ isOpen }) {
  return (
    <Flex
      borderBottom="2px solid"
      borderBottomColor="blackAlpha.100"
      pos="fixed"
      width="full"
      borderTop="6px solid"
      borderTopColor="teal.400"
      height={{ base: "14", sm: "74px" }}
      zIndex="3"
      justify="center"
      bg="white"
    >
      <Flex
        px="4"
        w="full"
        align="center"
        maxW="1200px"
        justify="space-between"
      >
        {/* <Icon as={VscArrowLeft} boxSize="30" /> */}
        <IconButton
          colorScheme="teal"
          variant="link"
          size="lg"
          icon={<VscArrowLeft size="30" />}
          display={{ base: "block", sm: "none" }}
          visibility={{ base: "hidden" }}
        />
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
        <Show above="sm">
          {/* <NavIcons
            w={{ base: "520px", md: "620px" }}
            px="70px"
            justify="space-between"
          /> */}
          <Box w={{ base: "520px", md: "620px" }} px="70px" pos="relative">
            <HStack justify="space-between">
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

              <IconButton
                colorScheme="teal"
                variant="ghost"
                size="lg"
                color="teal.300"
                icon={<VscNewFile size="30" />}
              />
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
              <Link as={RouterLink} to={PROFILE}>
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
            </HStack>

            <Box pos="absolute" top={0} left={0}>
              <SlideFade in={isOpen} offsetX="-20px" offsetY="0">
                <IconButton
                  colorScheme="teal"
                  variant="ghost"
                  isRound={true}
                  size="lg"
                  icon={<VscArrowLeft size="30" />}
                />
              </SlideFade>
            </Box>
          </Box>
        </Show>
        {/* <Link color="teal" as={RouterLink} to={ROOT}>
          <VscMenu size="28" />
        </Link> */}
        <Menu>
          <MenuButton
            transition="all 0.2s"
            color="teal.300"
            _hover={{ color: "teal.600" }}
            _expanded={{ color: "teal.600" }}
          >
            <VscMenu size="28" />
          </MenuButton>
          <MenuList w="6px">
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
            <MenuItem fontWeight="bold" color="teal.600">
              로그 아웃
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
}
