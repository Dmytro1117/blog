import { configureStore } from '@reduxjs/toolkit';
import { blogsReducer } from './blogsSlice';

export const store = configureStore({
  reducer: {
    blog: blogsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
