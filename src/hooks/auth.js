import { useToast } from "@chakra-ui/react";
import {
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { LOGIN, ROOT } from "../lib/routes";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, db, storage } from "../lib/firebase";
import { useMutation } from "@tanstack/react-query";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

import { queryClient } from "./../index";

export async function isUsernameExists(username) {
  const q = query(collection(db, "users"), where("username", "==", username));
  const querySnapshot = await getDocs(q);
  return querySnapshot.size > 0;
}

export async function isFullNameExists(fullName) {
  const q = query(collection(db, "users"), where("fullName", "==", fullName));
  const querySnapshot = await getDocs(q);
  return querySnapshot.size > 0;
}

export function useLogin() {
  const toast = useToast();
  const navigate = useNavigate();

  async function loginMutate({ email, password, redirectTo = ROOT }) {
    await signInWithEmailAndPassword(auth, email, password);
    return redirectTo;
  }

  const { mutate: login, ...args } = useMutation({
    mutationFn: loginMutate,
    onSuccess: (redirectTo) => {
      toast({
        title: "You are logged in",
        status: "success",
        isClosable: true,
        duration: 3000,
      });
      navigate(redirectTo);
    },
    onError: (error) => {
      toast({
        title: "Logging in failed",
        description: error.message,
        status: "error",
        isClosable: true,
        duration: 3000,
      });
    },
  });

  return { login, ...args };
}

export function useLogout() {
  const toast = useToast();
  const navigate = useNavigate();

  async function logoutMutate() {
    await signOut(auth);
    return LOGIN;
  }

  const { mutate: logout, ...args } = useMutation({
    mutationFn: logoutMutate,
    onSuccess: (redirectTo) => {
      toast({
        title: "Successfully logged out",
        status: "success",
        isClosable: true,
        duration: 3000,
      });

      navigate(redirectTo);
    },
    onError: (error) => {
      toast({
        title: error.message,
        status: "error",
        isClosable: true,
        duration: 3000,
      });
    },
  });

  return { logout, ...args };
}

const initialcounts = {
  followers: 0,
  following: 0,
  likes: 0,
  savedPosts: 0,
  posts: 0,
  comments: 0,
};

export function useRegister() {
  const toast = useToast();
  const navigate = useNavigate();
  async function register({
    fullName,
    username,
    email,
    password,
    redirectTo = ROOT,
  }) {
    const usernameExists = await isUsernameExists(username);
    const fullNameExists = await isFullNameExists(fullName);

    if (usernameExists) {
      throw new Error("Username already exists");
    } else if (fullNameExists) {
      throw new Error("Full-Name already exists");
    } else {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;

      const batch = writeBatch(db);

      const usersRef = doc(db, "users", user.uid);
      batch.set(usersRef, {
        id: user.uid,
        username: username,
        fullName: fullName,
        avatar: "",
        bio: "",
        link: "",
        createdAt: serverTimestamp(),
      });

      const countRef = doc(db, "users", user.uid, "stats", "counts");
      batch.set(countRef, initialcounts);

      const infoRef = doc(db, "users", user.uid, "stats", "userInfo");
      batch.set(infoRef, { email: user.email });

      await batch.commit();

      return redirectTo;
    }
  }

  const { mutate: signup, ...args } = useMutation({
    mutationFn: register,
    onSuccess: (redirectTo) => {
      toast({
        title: "Account created",
        description: "You are logged in",
        status: "success",
        isClosable: true,
        duration: 3000,
      });

      navigate(redirectTo);
    },
    onError: (error) => {
      toast({
        title: "Signing Up failed",
        description: error.message,
        status: "error",
        isClosable: true,
        duration: 3000,
      });
    },
  });

  return { signup, ...args };
}

export function useFakerRegister() {
  const toast = useToast();
  const navigate = useNavigate();
  async function register(data) {
    const usernameExists = await isUsernameExists(data.username);
    const fullNameExists = await isFullNameExists(data.fullName);

    if (usernameExists) {
      throw new Error("Username already exists");
    } else if (fullNameExists) {
      throw new Error("Full-Name already exists");
    } else {
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = res.user;

      const batch = writeBatch(db);

      const usersRef = doc(db, "users", user.uid);
      batch.set(usersRef, {
        id: user.uid,
        username: data.username,
        fullName: data.fullName,
        avatar: "",
        bio: data.bio,
        link: data.link,
        createdAt: serverTimestamp(),
      });

      const countRef = doc(db, "users", user.uid, "stats", "counts");
      batch.set(countRef, initialcounts);

      const infoRef = doc(db, "users", user.uid, "stats", "userInfo");
      batch.set(infoRef, { email: user.email });

      await batch.commit();
    }
  }

  const { mutate: signup, ...args } = useMutation({
    mutationFn: register,
    onSuccess: () => {
      toast({
        title: "Account created",
        description: "You are logged in",
        status: "success",
        isClosable: true,
        duration: 3000,
      });
    },
    onError: (error) => {
      toast({
        title: "Signing Up failed",
        description: error.message,
        status: "error",
        isClosable: true,
        duration: 3000,
      });
    },
  });

  return { signup, ...args };
}

export function useGoogleAuth() {
  const toast = useToast();
  const navigate = useNavigate();
  async function register({ redirectTo = ROOT }) {
    const provider = new GoogleAuthProvider();

    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const isNewUser = getAdditionalUserInfo(result).isNewUser;
    if (isNewUser) {
      const batch = writeBatch(db);

      const usersRef = doc(db, "users", user.uid);
      batch.set(usersRef, {
        id: user.uid,
        username: user.email.split("@")[0],
        fullName: user.displayName,
        avatar: user.photoURL,

        bio: "",
        link: "",
        createdAt: serverTimestamp(),
      });

      const countRef = doc(db, "users", user.uid, "stats", "counts");
      batch.set(countRef, initialcounts);

      const infoRef = doc(db, "users", user.uid, "stats", "userInfo");
      batch.set(infoRef, { email: user.email });

      await batch.commit();
    }

    return { redirectTo, isNewUser };
  }

  const { mutate: signupWithGoogle, ...args } = useMutation({
    mutationFn: register,
    onSuccess: ({ redirectTo, isNewUser }) => {
      if (isNewUser) {
        toast({
          title: "Account created",
          description: "You are logged in",
          status: "success",
          isClosable: true,
          duration: 3000,
        });
      } else {
        toast({
          title: "You are logged in",
          status: "success",
          isClosable: true,
          duration: 3000,
        });
      }

      navigate(redirectTo);
    },
    onError: (error) => {
      toast({
        title: "Signing Up failed",
        description: error.message,
        status: "error",
        isClosable: true,
        duration: 3000,
      });
    },
  });

  return { signupWithGoogle, ...args };
}

export function useEditProfile(uid) {
  const toast = useToast();

  async function editMutate({ updatedFields, file }) {
    const fileRef = ref(storage, "avatars/" + uid);
    let imageExist;
    try {
      // 이미지 URL을 시도하여 가져옵니다. 성공하면 이미지가 존재하는 것입니다.
      await getDownloadURL(fileRef);
      imageExist = true;
    } catch (error) {
      // 실패하면 이미지가 존재하지 않는 것으로 간주합니다.
      imageExist = false;
    }

    if (imageExist && !file && updatedFields.avatar === "") {
      //파일 삭제 이후 avatar값 ""

      await deleteObject(fileRef);
    } else if (file) {
      //파일 업로드 이후 avatar에 url저장

      await uploadBytes(fileRef, file);
      const avatarURL = await getDownloadURL(fileRef);
      updatedFields.avatar = avatarURL;
    }

    //formdata로 유저 정보 업데이트
    const docRef = doc(db, "users", uid);
    await updateDoc(docRef, { ...updatedFields });
  }

  const { mutate: editProfile, ...args } = useMutation({
    mutationFn: editMutate,
    // onMutate: async (data) => {
    //   const newEvent = data.updatedFields;
    //   await queryClient.cancelQueries({ queryKey: ["user", uid] });
    //   const previousEvent = queryClient.getQueryData(["user", uid]);

    //   console.log(previousEvent);
    //   queryClient.setQueryData(["user", uid], {
    //     ...previousEvent,
    //     ...newEvent,
    //   });
    //   console.log({
    //     ...previousEvent,
    //     ...newEvent,
    //   });
    //   return { previousEvent };
    // },
    onError: (error, data, context) => {
      // queryClient.setQueryData(["user", uid], context.previousEvent);
      console.error(error);
      toast({
        title: "Edit Profile failed",
        description: error.message,
        status: "error",
        isClosable: true,
        duration: 3000,
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries(["user", uid]);
    },
  });

  return { editProfile, ...args };
}
