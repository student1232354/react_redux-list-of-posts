import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';
/*eslint-disable*/
export interface PostsState {
  items: Post[];
  loading: boolean;
  error: boolean;
  selectedUserId: number;
  selectedPostId: number;
}

const initialState: PostsState = {
  items: [],
  loading: false,
  error: false,
  selectedUserId: 0,
  selectedPostId: 0,
};

export const fetchPostsByUser = createAsyncThunk(
  'posts/fetchByUser',
  (userId: number) => {
    return client.get<Post[]>(`/posts?userId=${userId}`);
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setSelectedUserId: (state, action: PayloadAction<number>) => {
      state.selectedUserId = action.payload;
      state.selectedPostId = 0;
      state.items = [];
    },
    togglePostId: (state, action: PayloadAction<number>) => {
      state.selectedPostId =
        state.selectedPostId === action.payload ? 0 : action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPostsByUser.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchPostsByUser.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchPostsByUser.rejected, state => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { setSelectedUserId, togglePostId } = postsSlice.actions;
