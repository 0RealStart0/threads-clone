import { Button, Center, Text } from "@chakra-ui/react";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useGoogleAuth } from "../../hooks/auth";
import { ROOT } from "../../lib/routes";

export default function SocialAuth() {
  const { signupWithGoogle, isPending } = useGoogleAuth();

  function handleGoogleAuth() {
    signupWithGoogle({ redirectTo: ROOT });
  }
  return (
    <>
      <Button
        w={"full"}
        colorScheme="gray"
        leftIcon={<FcGoogle />}
        onClick={handleGoogleAuth}
        isLoading={isPending}
      >
        <Center>
          <Text>Sign in with Google</Text>
        </Center>
      </Button>
    </>
  );
}
