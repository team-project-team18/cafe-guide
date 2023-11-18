import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../../types/User";
import { setAuth, setError, setLoading, setUser } from "../slices/userSlice";
import { client } from "../../utils/fetchClient";

export const loginAsync = createAsyncThunk<
  User | undefined,
  { email: string; password: string },
  { rejectValue: string }
>('user/login', async (credentials, { dispatch, rejectWithValue }) => {
  try {
    dispatch(setLoading(true));

    const response = await client.post<User>('/auth/login', credentials);


    console.log('response',response.token);
    
    if (response) {
      const user = response;

      
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('isAuth', JSON.stringify(true));
      
      dispatch(setAuth(true));
      dispatch(setUser(user));
      dispatch(setLoading(false));

      return user;
    } else {
      throw new Error('Invalid email or password');
    }
  } catch (error) {
    dispatch(setError('Failed to log in'));
    dispatch(setLoading(false));
    return rejectWithValue(error as string);
  }
});

export const logoutAsync = createAsyncThunk(
  'user/logout',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      setTimeout(() => {
        localStorage.removeItem('auth');
        localStorage.removeItem('email');
        localStorage.removeItem('authToken');
        dispatch(setAuth(false));
        dispatch(setUser({} as User));
        dispatch(setLoading(false));
      }, 500);
    } catch (error) {
      dispatch(setError('Failed to log out'));
      return rejectWithValue(error as string);
    }
  }
);

export const registerAsync = createAsyncThunk<
  User | undefined,
  { email: string; password: string; name: string; repeatPassword: string },
  { rejectValue: string }
>('user/register', async (credentials, { dispatch, rejectWithValue }) => {
  try {
    dispatch(setLoading(true));
    const response = await client.post<User>('/auth/register', credentials);
    console.log(response);

    if (response) {
      const user = response;

      dispatch(setAuth(true));
      dispatch(setUser(user));
      dispatch(setLoading(false));

      return user;
    } else {
      throw new Error('Failed to register');
    }
  } catch (error) {
    dispatch(setError('Failed to register'));
    dispatch(setLoading(false));
    return rejectWithValue(error as string);
  }
});
