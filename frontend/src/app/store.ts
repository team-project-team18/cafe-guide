import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import { cafeReducer } from './slices/cafeSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { newsReducer } from './slices/newsSlice';
import { userReducer } from './slices/userSlice';
import { commentReducer } from './slices/commentsSlice';


const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducerCafe = persistReducer(persistConfig, cafeReducer);

const persistedReducerNews = persistReducer(persistConfig, newsReducer);

const persistedReducerUser = persistReducer(persistConfig, userReducer);

const persistedReducerComments = persistReducer(persistConfig, commentReducer);

export const store = configureStore({
  reducer: {
    cafes: persistedReducerCafe,
    news: persistedReducerNews,
    user: persistedReducerUser,
    comments: persistedReducerComments,
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
