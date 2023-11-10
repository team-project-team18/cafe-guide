import { createAsyncThunk } from "@reduxjs/toolkit";
import * as newsApi from '../../api/news';

export const loadNews = createAsyncThunk(
  'news/fetch', () => {
    return newsApi.getAllNews();
  }
)