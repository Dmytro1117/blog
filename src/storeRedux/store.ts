import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { takeEvery } from 'redux-saga/effects';
import {
  blogsReducer,
  fetchBlogsRequest,
  addBlogSuccess,
  fetchBlogByIdRequest,
  deleteBlogRequest,
  updatePostRequest,
} from './blogsSlice';
import {
  getPostsSaga,
  addBlogSaga,
  fetchBlogByIdSaga,
  deletePostSaga,
  updatePostSaga,
} from 'features/saga';

const sagaMiddleware = createSagaMiddleware();

function* sagas() {
  yield takeEvery(fetchBlogsRequest.type, getPostsSaga);
  yield takeEvery(addBlogSuccess.type, addBlogSaga);
  yield takeEvery(fetchBlogByIdRequest.type, fetchBlogByIdSaga);
  yield takeEvery(deleteBlogRequest.type, deletePostSaga);
  yield takeEvery(updatePostRequest.type, updatePostSaga);
}

export const store = configureStore({
  reducer: {
    blog: blogsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(sagas);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
