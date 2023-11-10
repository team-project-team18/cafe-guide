import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import { cafeReducer } from './slices/cafeSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { newsReducer } from './slices/newsSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducerCafe = persistReducer(persistConfig, cafeReducer);

const persistedReducerNews = persistReducer(persistConfig, newsReducer);

export const store = configureStore({
  reducer: {
    cafes: persistedReducerCafe,
    news: persistedReducerNews,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const persistor = persistStore(store);
