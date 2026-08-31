import { configureStore } from '@reduxjs/toolkit';
import { usersSlice } from './Users';
import { postsSlice } from './Posts';
import { commentsSlice } from './Comments';

export const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
    posts: postsSlice.reducer,
    comments: commentsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
/* eslint-enable @typescript-eslint/indent */
