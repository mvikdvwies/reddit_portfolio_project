import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import hackerNewsApi from "../../api/hackerNews.js";

const initialState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchTopStories = createAsyncThunk(
  "posts/fetchTopStories",
  async () => {
    return await hackerNewsApi.getTopStories();
  },
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTopStories.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchTopStories.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.items = action.payload;
    });
    builder.addCase(fetchTopStories.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const selectPosts = (state) => state.posts.items;
export const selectPostsStatus = (state) => state.posts.status;
export const selectPostsError = (state) => state.posts.error;

export default postsSlice.reducer;
