import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout";
import Home from "../components/home";
import Search from "../components/search";
import Activity from "../components/activity";
import Direct from "../components/direct";
import Profile from "../components/profile";
import Login from "./../components/auth/Login";
import Register from "../components/auth/Register";
import ProtectedRoute from "../components/auth/ProtectedRoute";

import Replies from "../components/profile/Replies";
import RePosts from "../components/profile/RePosts";
import UserPostList from "../components/profile/UserPostList";
import NotFound from "../NotFound";

export const ROOT = "/";
export const SEARCH = "/search";
export const ACTIVITY = "/activity";
export const DIRECT = "/direct";
export const PROFILE = "/user/:userId";
export const NOTFOUND = "/*";

export const LOGIN = "/login";
export const REGISTER = "/register";

export const POSTS = "";
export const REPLIES = "replies";
export const REPOSTS = "reposts";

export const router = createBrowserRouter([
  {
    path: ROOT,
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: SEARCH,
        element: <Search />,
      },
      { path: ACTIVITY, element: <Activity /> },
      { path: DIRECT, element: <Direct /> },
      {
        path: PROFILE,
        element: <Profile />,
        children: [
          { index: true, element: <UserPostList /> },
          { path: REPLIES, element: <Replies /> },
          { path: REPOSTS, element: <RePosts /> },
        ],
      },
    ],
  },
  {
    path: LOGIN,
    element: (
      <ProtectedRoute>
        <Login />
      </ProtectedRoute>
    ),
  },
  {
    path: REGISTER,
    element: (
      <ProtectedRoute>
        <Register />
      </ProtectedRoute>
    ),
  },
]);
