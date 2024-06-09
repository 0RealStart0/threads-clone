import { configureStore } from "@reduxjs/toolkit";
import modal from "./modalSlice";
import user from "./userSlice";

export const store = configureStore({
  reducer: { modal, user },
});
