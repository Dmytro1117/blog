import { takeLatest, call, put } from 'redux-saga/effects';
import { fetchBlogs, fetchBlogById, addBlog, deleteBlog } from './operations';
import {
  fetchBlogs as fetchBlogsAction,
  fetchBlogById as fetchBlogByIdAction,
  addBlog as addBlogAction,
  deleteBlog as deleteBlogAction,
} from './blogsSlice';

function* handleFetchBlogs(): Generator<any, void, any> {
  try {
    yield call(fetchBlogs);
  } catch (error) {
    const errorAsError = error as Error;
    yield put(
      fetchBlogsAction.rejected(errorAsError, '', undefined, '', {
        requestId: '',
        aborted: false,
        condition: true,
      }),
    );
  }
}

function* handleFetchBlogById(action: any): Generator<any, void, any> {
  try {
    yield call(fetchBlogById, action.payload);
    // console.log('Saga');
  } catch (error) {
    // console.error('Saga:', error);
    const errorAsError = error as Error;
    yield put(
      fetchBlogsAction.rejected(errorAsError, '', undefined, '', {
        requestId: '',
        aborted: false,
        condition: true,
      }),
    );
  }
}

function* handleAddBlog(action: any): Generator<any, void, any> {
  try {
    yield call(addBlog, action.payload);
  } catch (error) {
    const errorAsError = error as Error;
    yield put(
      fetchBlogsAction.rejected(errorAsError, '', undefined, '', {
        requestId: '',
        aborted: false,
        condition: true,
      }),
    );
  }
}

function* handleDeleteBlog(action: any): Generator<any, void, any> {
  try {
    yield call(deleteBlog, action.payload);
  } catch (error) {
    const errorAsError = error as Error;
    yield put(
      fetchBlogsAction.rejected(errorAsError, '', undefined, '', {
        requestId: '',
        aborted: false,
        condition: true,
      }),
    );
  }
}

function* watchBlogs() {
  yield takeLatest(fetchBlogsAction.pending.type, handleFetchBlogs);
  yield takeLatest(fetchBlogByIdAction.pending.type, handleFetchBlogById);
  yield takeLatest(addBlogAction.pending.type, handleAddBlog);
  yield takeLatest(deleteBlogAction.pending.type, handleDeleteBlog);
}

export default watchBlogs;
