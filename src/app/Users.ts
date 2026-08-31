import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';
/*eslint-disable*/
export interface UsersState {
  items: User[];
}

const initialState: UsersState = {
  items: [],
};

export const fetchUsers = createAsyncThunk('users/fetchAll', () => {
  return client.get<User[]>('/users');
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});
