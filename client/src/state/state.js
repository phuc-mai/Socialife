import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light"
    },
    setLogout: (state) => {
      state.user = null
      state.token = null
    },
  }
})

export const { setMode, setLogout } = authSlice.actions

export default authSlice.reducer