import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { loginAsync } from '../thunk/usersThunk';

interface UserState {
  isAuth: boolean;
  user: User;
  isLoading: boolean;
  error: string;
}

const initialState: UserState = {
  isAuth: false,
  user: {} as User,
  isLoading: false,
  error: '',
};


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.isLoading = false;
          state.isAuth = true;
          state.user = action.payload;
        }
      })
      .addCase(loginAsync.rejected, (state, action) => {
        const rejectionValue: string | undefined = action.payload;
      
        state.isLoading = false;
        state.error = rejectionValue || 'Failed to log in';
      });
  },
});

export const { setAuth, setUser, setLoading, setError } = userSlice.actions;

export const userReducer = userSlice.reducer;
