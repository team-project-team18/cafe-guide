import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../../utils/fetchClient';
import { AddComment } from '../../types/AddComment';

interface CommentsState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CommentsState = {
  status: 'idle',
  error: null,
};

export const addCommentThunk = createAsyncThunk(
  'comments/addComment',
  async (commentData: AddComment) => {
    try {

      const authToken: string | undefined = localStorage.getItem('authToken') ?? undefined;

      console.log(authToken)


      const response = await client.post<AddComment>('/comments', commentData, authToken);

      console.log(response)

    } catch (error) {
      console.error('Error in addCommentThunk:', error);
      throw error;
    }
  }
);


const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCommentThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addCommentThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(addCommentThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'An error occurred';

      });
  },
});

export const commentReducer = commentsSlice.reducer;
