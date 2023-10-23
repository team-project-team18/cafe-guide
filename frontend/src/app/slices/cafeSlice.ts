import { createSlice } from "@reduxjs/toolkit"
import { Cafe } from "../../types/Cafe"

type CafeState = {
  cafe: Cafe[],
  isLoading: boolean,
  hasError: boolean,
}

const initialState: CafeState = {
  cafe: [],
  isLoading: false,
  hasError: false,
}

const cafeSlice = createSlice({
  name: 'cafe',
  initialState,
  reducers: {
    setCafe: (state, action) => {
      state.cafe = action.payload;
    },
  },
});

export const cafeReducer = cafeSlice.reducer;