import { createSlice } from '@reduxjs/toolkit';
import { fetchBlogs, addBlog, deleteBlog, fetchBlogById } from './operations';

export type Blog = {
  id: string;
  name: string;
  about: string;
  phone: string;
};

type BlogsState = {
  items: Blog[];
  isLoading: boolean;
  error: string | null;
};

const blogsInitialState: BlogsState = {
  items: [],
  isLoading: false,
  error: null,
};

const blogsSlice = createSlice({
  name: 'blog',
  initialState: blogsInitialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchBlogs.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })

      .addCase(fetchBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? null;
      })
      .addCase(fetchBlogById.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBlogById.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(fetchBlogById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? null;
      })
      .addCase(addBlog.pending, state => {
        state.isLoading = true;
      })
      .addCase(addBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items.unshift(action.payload);
      })
      .addCase(addBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? null;
      })
      .addCase(deleteBlog.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.items.findIndex(task => task.id === action.payload);
        state.items = state.items.filter(blog => blog.id !== action.payload);
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? null;
      });
  },
});

export const blogsReducer = blogsSlice.reducer;
