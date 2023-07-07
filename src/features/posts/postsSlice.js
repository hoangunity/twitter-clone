import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const BASE_URL = `https://auth-back-end-hoangunity.sigma-school-full-stack.repl.co`;

export const fetchPostsByUser = createAsyncThunk(
  `posts/fetchByUser`,
  async (userId) => {
    const response = await fetch(`${BASE_URL}/posts/user/${userId}`);
    return response.json();
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: { posts: [], loading: true },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPostsByUser.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    });
  },
});

export default postsSlice.reducer;
