import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Cafe } from "../../types/Cafe";
import { loadCafes } from "../thunk/cafeThunk";

type CafeState = {
  cafes: Cafe[],
  isLoading: boolean,
  hasError: boolean,
};

const initialState: CafeState = {
  cafes: [],
  isLoading: false,
  hasError: false,
};

const cafeSlice = createSlice({
  name: 'cafes',
  initialState,
  reducers: {
    setCafe: (state, action: PayloadAction<Cafe[]>) => {
      return {
        ...state,
        cafes: action.payload.map((cafe) => ({
          ...cafe,
          comments: [...cafe.comments],
        })),
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCafes.pending, (state) => {
        return {
          ...state,
          isLoading: true,
          hasError: false,
        };
      })
      .addCase(loadCafes.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          cafes: action.payload.map((cafe) => ({
            ...cafe,
            comments: [...cafe.comments],
          })),
        };
      })
      .addCase(loadCafes.rejected, (state) => {
        return {
          ...state,
          isLoading: false,
          hasError: true,
        };
      });
  },
});

export const cafeReducer = cafeSlice.reducer;
export const { setCafe } = cafeSlice.actions;

