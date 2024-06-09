import { RouterProvider } from "react-router-dom";
import { router } from "./lib/routes";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db, getCollectionData } from "./lib/firebase";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { clearUser, setIsLoading, setUser } from "./store/userSlice";
import { useQueryClient } from "@tanstack/react-query";
import { fetchFollowers, fetchFollowing, commonOptions } from "./hooks/users";
import { queryClient } from "./index";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    let userDocUnsub;
    const authUnsub = onAuthStateChanged(auth, (user) => {
      dispatch(setIsLoading(true));
      if (userDocUnsub) {
        userDocUnsub();
      }

      if (user) {
        // Pre-fetch followers and following

        queryClient.prefetchQuery({
          queryKey: ["followers", user.uid],
          queryFn: () => fetchFollowers(user.uid),
          ...commonOptions,
        });
        queryClient.prefetchQuery({
          queryKey: ["following", user.uid],
          queryFn: () => fetchFollowing(user.uid),
          staleTime: 5 * 60 * 1000,
        });

        const ref = doc(db, "users", user.uid);
        userDocUnsub = onSnapshot(ref, (doc) => {
          // if (doc.metadata.hasPendingWrites) return;

          if (doc.exists()) {
            const currentUser = {
              uid: user.uid,
              user: {
                ...doc.data(),
                createdAt: doc.data().createdAt?.toDate().toString(),
              },
            };

            dispatch(setUser(currentUser));
          } else {
            // 회원가입은 되었으나 문서에 저장되지 않는 경우
            // 에러, 소셜 로그인, 나중에 이메일 인증용?
          }
          dispatch(setIsLoading(false));
        });
      } else {
        dispatch(clearUser());
        //로그아웃시에 모든 캐시가 사라지게 하는게 괜찮은지 생각해볼것
        queryClient.removeQueries({ queryKey: ["followers"] });
        queryClient.removeQueries({ queryKey: ["following"] });
        dispatch(setIsLoading(false));
      }
    });

    return () => {
      if (userDocUnsub) {
        userDocUnsub();
      }
      authUnsub();
    };
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
