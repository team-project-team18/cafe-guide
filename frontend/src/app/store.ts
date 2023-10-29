import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'
import { cafeReducer } from './slices/cafeSlice';

export const store = configureStore({
  reducer: {
    cafes: cafeReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;