import { createAsyncThunk } from "@reduxjs/toolkit";
import * as cafesApi from '../../api/cafe';

export const loadCafes = createAsyncThunk(
  'cafes/fetch', () => {
    return cafesApi.getAllCafes();
  },
);