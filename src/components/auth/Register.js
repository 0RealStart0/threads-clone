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
import { useForm } from "react-hook-form";
import { LOGIN, ROOT } from "../../lib/routes";
import {
  emailValidate,
  fullNameValidate,
  passwordConfirmValidate,
  passwordValidate,
  usernameValidate,
} from "../../utils/form-validate";
import { Link as RouterLink } from "react-router-dom";
import SocialAuth from "./SocialAuth";
import { useFakerRegister, useRegister } from "../../hooks/auth";
import { useState } from "react";
import { makeRandomUser } from "../../utils/fakeData";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { faker } from "@faker-js/faker";

export default function Register() {
  const { signup, isPending } = useRegister();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  let pwd = watch("password", "");

  // const { signup: fakeSignup, isPending: fackeLoading } = useFakerRegister();

  async function handleRegister(data) {
    signup({
      username: data.username,
      email: data.email,
      password: data.password,
      fullName: data.fullName,
      redirectTo: ROOT,
    });
  }

  // async function handleFake() {
  //   // 랜덤 유저 가입시키기
  //   // let data = makeRandomUser();
  //   // data = { ...data, password: "123456" };
  //   // console.log(data);
  //   // fakeSignup(data);

  //   //아바타 전부 추가
  //   async function updateUsersWithDefaultAvatar() {
  //     const usersRef = collection(db, "users");
  //     // const q = query(usersRef, where("avatar", "==", "")); // 'link'가 비어 있는 문서만 쿼리
  //     const querySnapshot = await getDocs(usersRef);

  //     for (const docSnapshot of querySnapshot.docs) {
  //       const userData = docSnapshot.data();
  //       const username = userData.username;
  //       const newLink = `https://api.dicebear.com/8.x/adventurer/svg?seed=${username}`;

  //       // link 필드 업데이트
  //       await updateDoc(docSnapshot.ref, {
  //         avatar: newLink,
  //         link: faker.internet.url(),
  //       });

  //       console.log(`Updated user ${username} with new link: ${newLink}`);
  //     }

  //     console.log("Completed updating users.");
  //   }
  //   updateUsersWithDefaultAvatar();
  // }

  return (
    <Center w="100%" h="100vh">
      <Box mx="1" maxW="md" p="9" borderWidth="1px" borderRadius="lg">
        <Heading mb="4" size="lg" textAlign="center">
          Register
        </Heading>

        {/* <Button onClick={handleFake}>생성</Button> */}

        <form onSubmit={handleSubmit(handleRegister)}>
          <FormControl isInvalid={errors.username} py="2">
            <FormLabel>Username</FormLabel>
            <Input
              placeholder="username"
              {...register("username", usernameValidate)}
            />
            <FormErrorMessage>
              {errors.username && errors.username.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.fullName} py="2">
            <FormLabel>Full Name</FormLabel>
            <Input
              placeholder="full name"
              {...register("fullName", fullNameValidate)}
            />
            <FormErrorMessage>
              {errors.fullName && errors.fullName.message}
            </FormErrorMessage>
          </FormControl>
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
          <FormControl isInvalid={errors.passwordConfirm} py="2">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="password123"
              {...register("passwordConfirm", {
                ...passwordConfirmValidate,
                validate: (value) =>
                  value === pwd || "The passwords do not match",
              })}
            />
            <FormErrorMessage>
              {errors.passwordConfirm && errors.passwordConfirm.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            mt="4"
            type="submit"
            colorScheme="teal"
            size="md"
            w="full"
            isLoading={isPending}
            loadingText="Signing Up"
          >
            Register
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
          Already have an account?{" "}
          <Link
            as={RouterLink}
            to={LOGIN}
            color="teal.800"
            fontWeight="medium"
            textDecor="underline"
            _hover={{ background: "teal.100" }}
          >
            Log In
          </Link>{" "}
          instead!
        </Text>
      </Box>
    </Center>
  );
}
