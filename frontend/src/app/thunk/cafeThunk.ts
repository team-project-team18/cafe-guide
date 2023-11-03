import { createAsyncThunk } from "@reduxjs/toolkit";
import * as cafesApi from '../../api/cafe';

export const loadCafes = createAsyncThunk(
  'cafe/fetch', () => {
    return cafesApi.getAllCafes();
  },
);

export const loadCafeById = createAsyncThunk(
  'cafe/fetchById',
  async (id: string) => {
    return cafesApi.getCafeById(id);
  },
);
