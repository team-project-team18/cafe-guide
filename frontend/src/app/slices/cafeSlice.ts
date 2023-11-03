import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Cafe } from "../../types/Cafe"
import { loadCafes } from "../thunk/cafeThunk";

type CafeState = {
  cafes: Cafe[],
  isLoading: boolean,
  hasError: boolean,
}

const initialState: CafeState = {
  cafes: [],
  isLoading: false,
  hasError: false,
}

const cafeSlice = createSlice({
  name: 'cafes',
  initialState,
  reducers: {
    setCafe: (state, action: PayloadAction<Cafe[]>) => {
      state.cafes = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCafes.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(loadCafes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cafes = action.payload;
      })
      .addCase(loadCafes.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      })
  }
  
});

export const cafeReducer = cafeSlice.reducer;

export const cafeActions = cafeSlice.actions;