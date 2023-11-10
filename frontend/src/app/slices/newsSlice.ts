import { createSlice } from "@reduxjs/toolkit"
import { News } from "../../types/News"
import { loadNews } from "../thunk/newsThunk"

type NewsState = {
  news: News[],
  isLoading: boolean,
  hasError: boolean,
}

const initialState: NewsState = {
  news: [],
  isLoading: false,
  hasError: false,
}

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadNews.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(loadNews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.news = action.payload;
      })
      .addCase(loadNews.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      })
  }
});

export const newsReducer = newsSlice.reducer;

export const newsActions = newsSlice.actions;