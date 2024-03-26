import { createSlice } from '@reduxjs/toolkit';
import { BlogsState } from 'helpers/interface';

const initialState: BlogsState = {
  items: [],
  isLoading: false,
  error: null,
};

const blogsSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    fetchBlogsRequest: state => {
      state.isLoading = true;
      state.error = null;
    },
    fetchBlogsSuccess: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    },
    fetchBlogsError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload ?? 'Щось не так';
    },
    addBlogRequest: state => {
      state.isLoading = true;
      state.error = null;
    },
    addBlogSuccess: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.items.unshift(action.payload);
    },
    addBlogError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload ?? 'Не пройдена валідація';
    },

    fetchBlogByIdRequest: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchBlogByIdSuccess: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.items = [action.payload];
    },
    fetchBlogByIdError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload ?? 'Щось не так';
    },
    deleteBlogRequest: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    deleteBlogSuccess: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.items = state.items.filter(blog => blog.id !== action.payload);
    },
    deleteBlogError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload ?? 'Щось не так';
    },
    updatePostRequest: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    updatePostSuccess: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.items = [action.payload];
    },
    updatePostError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload ?? 'Не пройдена валідація';
    },
  },
});

export const blogsReducer = blogsSlice.reducer;
export const {
  fetchBlogsRequest,
  fetchBlogsSuccess,
  fetchBlogsError,
  addBlogError,
  addBlogRequest,
  addBlogSuccess,
  fetchBlogByIdError,
  fetchBlogByIdSuccess,
  fetchBlogByIdRequest,
  deleteBlogRequest,
  deleteBlogSuccess,
  deleteBlogError,
  updatePostRequest,
  updatePostSuccess,
  updatePostError,
} = blogsSlice.actions;
