import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.friends = action.payload.friends;
      } else {
        console.error("User friends non-existent :(");
      }
    },
  },
});

export const { setMode, setLogin, setLogout, setPosts, setFriends } = authSlice.actions;

export default authSlice.reducer;
