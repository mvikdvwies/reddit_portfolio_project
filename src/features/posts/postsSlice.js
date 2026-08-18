import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import hackerNewsApi from "../../api/hackerNews.js";

const initialState = {
  items: [], //array of stories
  status: "idle", //loading, succeeded, failed
  error: null,
  feedType: "top", //top, new, best
};

//action creator, выбираем какие данные мы хотим получить
export const fetchStories = createAsyncThunk(
  "posts/fetchStories",
  async (feedType) => {
    return await hackerNewsApi.getStories(feedType); //returns array of stories
  },
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStories.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchStories.fulfilled, (state, action) => {
      state.feedType = action.meta.arg; //top, new, best
      state.status = "succeeded"; //succeeded
      state.items = action.payload; //array of stories
    });
    builder.addCase(fetchStories.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const selectFeedType = (state) => state.posts.feedType;
export const selectPosts = (state) => state.posts.items;
export const selectPostsStatus = (state) => state.posts.status;
export const selectPostsError = (state) => state.posts.error;

export default postsSlice.reducer;
