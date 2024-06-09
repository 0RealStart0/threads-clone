import {
  collection,
  doc,
  getDocs,
  increment,
  limit,
  query,
  runTransaction,
  serverTimestamp,
  startAfter,
  updateDoc,
  where,
} from "firebase/firestore";
import { db, getCollectionData, getDocumentData } from "../lib/firebase";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";

export const commonOptions = {
  staleTime: 5 * 60 * 1000,
};

export function useUser(id) {
  const q = query(doc(db, "users", id));

  // console.log("useUser", id);
  const userQuery = useQuery({
    queryKey: ["user", id],
    // eslint-disable-next-line react-hooks/rules-of-hooks
    queryFn: () => getDocumentData(q),
    ...commonOptions,
  });

  return userQuery;
}
export function useUsers() {
  const q = collection(db, "users");

  const usersQuery = useQuery({
    queryKey: ["users"],
    // eslint-disable-next-line react-hooks/rules-of-hooks
    queryFn: () => getCollectionData(q),
  });
  return usersQuery;
}

export function useInfiniteUsers(currentUserId) {
  const fetchUsers = async ({ pageParam = null }) => {
    const usersCollection = collection(db, "users");
    let q;

    if (pageParam) {
      q = query(
        usersCollection,

        where("id", "!=", currentUserId),
        startAfter(pageParam),
        limit(10)
      );
    } else {
      q = query(usersCollection, where("id", "!=", currentUserId), limit(10));
    }

    const documentSnapshots = await getDocs(q);
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];

    const users = documentSnapshots.docs.map((doc) => ({
      ...doc.data(),
    }));

    return { users, lastVisible };
  };

  const infiniteUsersQuery = useInfiniteQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    getNextPageParam: (lastPage) => lastPage.lastVisible || undefined,
    ...commonOptions,
  });

  return infiniteUsersQuery;
}

export function useCounts(id) {
  const q = doc(db, "users", id, "stats", "counts");

  const countsQuery = useQuery({
    queryKey: ["counts", id],
    // eslint-disable-next-line react-hooks/rules-of-hooks
    queryFn: () => getDocumentData(q),
    ...commonOptions,
  });

  return countsQuery;
}

export async function fetchFollowers(id) {
  const q = collection(db, "users", id, "followers");
  const result = await getCollectionData(q);
  return result;
}

export async function fetchFollowing(id) {
  const q = collection(db, "users", id, "following");
  const result = await getCollectionData(q);
  return result;
}

export function useFollowers(id) {
  const followersQuery = useQuery({
    queryKey: ["followers", id],
    // eslint-disable-next-line react-hooks/rules-of-hooks
    queryFn: () => fetchFollowers(id),
    ...commonOptions,
  });

  return followersQuery;
}
export function useFollowing(id) {
  const followingQuery = useQuery({
    queryKey: ["following", id],
    // eslint-disable-next-line react-hooks/rules-of-hooks
    queryFn: () => fetchFollowing(id),
    ...commonOptions,
  });
  return followingQuery;
}

export function useToggleFollow({ id, uid, isFollowing }) {
  const toast = useToast();
  const queryClient = useQueryClient();

  const myFollowingDocRef = doc(db, "users", uid, "following", id);
  const targetFollowerDocRef = doc(db, "users", id, "followers", uid);
  const myStatsDocRef = doc(db, "users", uid, "stats", "counts");
  const targetStatsDocRef = doc(db, "users", id, "stats", "counts");

  async function toggleFollow() {
    if (isFollowing) {
      await runTransaction(db, async (transaction) => {
        // Remove target from my following collection and update following count
        transaction.delete(myFollowingDocRef);
        transaction.update(myStatsDocRef, { following: increment(-1) });

        // Remove me from target's followers collection and update followers count
        transaction.delete(targetFollowerDocRef);
        transaction.update(targetStatsDocRef, {
          followers: increment(-1),
        });
      });
      return false;
    } else {
      await runTransaction(db, async (transaction) => {
        // Add target to my following collection and update following count
        transaction.set(myFollowingDocRef, { followedAt: serverTimestamp() });
        transaction.update(myStatsDocRef, { following: increment(1) });

        // Add me to target's followers collection and update followers count
        transaction.set(targetFollowerDocRef, {
          followedAt: serverTimestamp(),
        });
        transaction.update(targetStatsDocRef, { followers: increment(1) });
      });
      return true;
    }
  }

  const toggleFollowMutate = useMutation({
    mutationFn: toggleFollow,
    onSuccess: (newIsFollowing) => {
      //토스트가 제대로 실행되지 않는 문제로 보류
      // toast({
      //   title: newIsFollowing
      //     ? "팔로우 되었습니다."
      //     : "팔로우가 취소되었습니다.",
      //   status: "success",
      //   isClosable: true,
      //   duration: 3000,
      // });
      queryClient.invalidateQueries(["followers", uid]);
      queryClient.invalidateQueries(["following", uid]);
      queryClient.invalidateQueries(["followers", id]);
      queryClient.invalidateQueries(["following", id]);
      queryClient.invalidateQueries(["counts", uid]);
      queryClient.invalidateQueries(["counts", id]);
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

  return toggleFollowMutate;
}

function toLowerCaseVersion(searchTerm) {
  return searchTerm.toLowerCase();
}

// 각 단어의 첫 글자나 구분자(띄어쓰기, 마침표) 다음 글자를 대문자로 변환한 버전
function toCapitalizedVersion(searchTerm) {
  return searchTerm
    .toLowerCase()
    .replace(/(?:^|\s|\.)([a-z])/g, (match, p1) =>
      match.replace(p1, p1.toUpperCase())
    );
}

export function useSearchUsers(searchTerm) {
  const usersRef = collection(db, "users");
  searchTerm = searchTerm.trim();
  const lowerCaseVersion = toLowerCaseVersion(searchTerm);
  const capitalizedVersion = toCapitalizedVersion(searchTerm);

  async function fetchSearchResults() {
    const usernameQuery = query(
      usersRef,
      where("username", ">=", lowerCaseVersion),
      where("username", "<=", lowerCaseVersion + "\uf8ff")
    );

    const capitalizedUsernameQuery = query(
      usersRef,
      where("username", ">=", capitalizedVersion),
      where("username", "<=", capitalizedVersion + "\uf8ff")
    );

    // fullName 쿼리
    const fullNameQuery = query(
      usersRef,
      where("fullName", ">=", lowerCaseVersion),
      where("fullName", "<=", lowerCaseVersion + "\uf8ff")
    );

    const capitalizedFullNameQuery = query(
      usersRef,
      where("fullName", ">=", capitalizedVersion),
      where("fullName", "<=", capitalizedVersion + "\uf8ff")
    );

    const [
      usernameResults,
      capitalizedUsernameResults,
      fullNameResults,
      capitalizedFullNameResults,
    ] = await Promise.all([
      getCollectionData(usernameQuery),
      getCollectionData(fullNameQuery),
      getCollectionData(capitalizedUsernameQuery),
      getCollectionData(capitalizedFullNameQuery),
    ]);

    // 병합된 결과에서 중복 제거
    const combinedResults = mergeAndRemoveDuplicates([
      ...usernameResults,
      ...capitalizedUsernameResults,
      ...fullNameResults,
      ...capitalizedFullNameResults,
    ]);

    return combinedResults;
  }

  const searchUsersQuery = useQuery({
    queryKey: ["searchResults", searchTerm],
    queryFn: () => fetchSearchResults(searchTerm),
    enabled: !!searchTerm,
    ...commonOptions,
  });

  return searchUsersQuery;
}
// 병합된 결과에서 중복을 제거하고 순서를 유지하는 함수
const mergeAndRemoveDuplicates = (results) => {
  const map = new Map();
  results.forEach((item) => {
    if (!map.has(item.docId)) {
      map.set(item.docId, item);
    }
  });
  return Array.from(map.values());
};
