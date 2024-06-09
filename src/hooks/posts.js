import { useToast } from "@chakra-ui/react";
import { db, getCollectionData } from "../lib/firebase";
import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useLocation, useNavigate } from "react-router-dom";

import { queryClient } from "./../index";
import { commonOptions } from "./users";

export function useAddPost() {
  const toast = useToast();

  async function addPost(post) {
    const newPostRef = doc(collection(db, "posts"));
    await setDoc(newPostRef, {
      ...post,
      id: newPostRef.id,
      date: serverTimestamp(),
      likesCount: 0,
    });
  }

  const addPostMutate = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast({
        title: "Post added successfully!",
        status: "success",
        isClosable: true,

        duration: 5000,
      });
    },
    onError: (error) => {
      toast({
        title: "Post added failed",
        description: error.message,
        status: "error",
        isClosable: true,
        duration: 5000,
      });
    },
  });

  return addPostMutate;
}

export function useToggleLike({ id, isLiked, uid }) {
  async function toggleLike() {
    const docRef = doc(db, "posts", id);
    await updateDoc(docRef, {
      likes: isLiked ? arrayRemove(uid) : arrayUnion(uid),
    });
  }

  const toggleLikeMutate = useMutation({
    mutationFn: toggleLike,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", id] });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return toggleLikeMutate;
}

export function useDeletePost(id) {
  const toast = useToast();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  async function deletePost() {
    const res = window.confirm("Are you sure you want to delete this post?");

    if (res) {
      // Delete post document
      await deleteDoc(doc(db, "posts", id));

      // Delete comments
      const q = query(collection(db, "comments"), where("postID", "==", id));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => deleteDoc(doc.ref));
    }
  }

  const deletePostMutate = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      // queryClient.invalidateQueries({ queryKey: ["post", id] });
      if (pathname.includes("comments")) navigate(-1);
      toast({
        title: "Post deleted!",
        status: "info",
        isClosable: true,
        duration: 5000,
      });
    },
    onError: (error) => {
      toast({
        title: "Post delete failed!",
        description: error.message,
        status: "error",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
    },
  });

  return deletePostMutate;
}

// export function usePost(id) {
//   const q = doc(db, "posts", id);

//   const postQuery = useQuery({
//     queryKey: ["post", id],
//     // eslint-disable-next-line react-hooks/rules-of-hooks
//     queryFn: () => useDocumentData(q),
//   });

//   return postQuery;
// }

export function usePosts(uid = null) {
  const q = uid
    ? query(collection(db, "posts"), where("createdBy", "==", uid))
    : query(collection(db, "posts"), orderBy("date", "desc"));
  const postsQuery = useQuery({
    queryKey: uid ? ["posts", uid] : ["posts"],
    // eslint-disable-next-line react-hooks/rules-of-hooks
    queryFn: () => getCollectionData(q),
    onError: (e) => console.log(e),
    ...commonOptions,
  });
  // if (error) throw error;
  return postsQuery;
}

export function useLikes(posts) {
  let sum = 0;
  if (posts?.length > 0) {
    sum = posts.reduce((acc, post) => acc + post.likes.length, 0);
  }
  return sum;
}
