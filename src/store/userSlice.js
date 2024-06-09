import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: {
    uid: "",
    user: null,
  },
  isLoading: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
    clearUser: (state) => {
      state.currentUser = initialState.currentUser;
    },
  },
});

export const { setIsLoading, setUser, clearUser } = userSlice.actions;
export const selectUser = (state) => state.user;

export default userSlice.reducer;
