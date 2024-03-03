import { configureStore } from '@reduxjs/toolkit';
import { blogsReducer } from './blogsSlice';

export const store = configureStore({
  reducer: {
    blog: blogsReducer,
  },
});
