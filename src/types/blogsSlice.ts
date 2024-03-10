import { PayloadAction, createSlice } from '@reduxjs/toolkit';
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
      .addCase(fetchBlogs.fulfilled, (state, action: PayloadAction<Blog[]>) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(
        fetchBlogs.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.isLoading = false;
          state.error = action.payload ?? 'Default error message';
        },
      )
      .addCase(fetchBlogById.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchBlogById.fulfilled,
        (state, action: PayloadAction<Blog>) => {
          state.isLoading = false;
        },
      )
      .addCase(
        fetchBlogById.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.isLoading = false;
          state.error = action.payload ?? 'Default error message';
        },
      )
      .addCase(addBlog.pending, state => {
        state.isLoading = true;
      })
      .addCase(addBlog.fulfilled, (state, action: PayloadAction<Blog>) => {
        state.isLoading = false;
        state.error = null;
        state.items.unshift(action.payload);
      })
      .addCase(
        addBlog.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.isLoading = false;
          state.error = action.payload ?? 'Default error message';
        },
      )
      .addCase(deleteBlog.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteBlog.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.error = null;
        const index = state.items.findIndex(blog => blog.id === action.payload);
        state.items = state.items.filter(blog => blog.id !== action.payload);
      })
      .addCase(
        deleteBlog.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.isLoading = false;
          state.error = action.payload ?? 'Default error message';
        },
      );
  },
});

export const blogsReducer = blogsSlice.reducer;
export { fetchBlogs, fetchBlogById, deleteBlog, addBlog };