import {
  AbsoluteCenter,
  Box,
  Button,
  Center,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";
// import { useLogin } from "../../hooks/auth";
import { useForm } from "react-hook-form";
import { REGISTER, ROOT } from "../../lib/routes";
import { emailValidate, passwordValidate } from "../../utils/form-validate";
import { Link as RouterLink } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import SocialAuth from "./SocialAuth";
import { useLogin } from "../../hooks/auth";

export default function Login() {
  const { login, isPending } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function handleLogin(data) {
    login({
      email: data.email,
      password: data.password,
      redirectTo: ROOT,
    });
  }

  return (
    <Center w="100%" h="100vh">
      <Box
        mx="1"
        maxW="md"
        p="9"
        borderWidth={{ base: "0", sm: "1px" }}
        borderRadius="lg"
      >
        <Heading mb="4" size="lg" textAlign="center">
          Log In
        </Heading>

        <form onSubmit={handleSubmit(handleLogin)}>
          <FormControl isInvalid={errors.email} py="2">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="user@email.com"
              {...register("email", emailValidate)}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.password} py="2">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="password123"
              {...register("password", passwordValidate)}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            mt="4"
            type="submit"
            colorScheme="teal"
            size="md"
            w="full"
            isLoading={isPending}
            loadingText="Logging In"
          >
            Log In
          </Button>
        </form>
        <Box position="relative" py="6">
          <Divider />
          <AbsoluteCenter bg="white" px="4">
            또는
          </AbsoluteCenter>
        </Box>
        <SocialAuth />
        <Text fontSize="xlg" align="center" mt="6">
          Don't have an account?{" "}
          <Link
            as={RouterLink}
            to={REGISTER}
            color="teal.800"
            fontWeight="medium"
            textDecor="underline"
            _hover={{ background: "teal.100" }}
          >
            Register
          </Link>{" "}
          instead!
        </Text>
      </Box>
    </Center>
  );
}
