import { PayloadAction } from '@reduxjs/toolkit';
import { put, call } from 'redux-saga/effects';
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  setDoc,
  QueryDocumentSnapshot,
  DocumentSnapshot,
  DocumentData,
} from 'firebase/firestore';
import { getDocs, getDoc, orderBy, query } from 'firebase/firestore';
import { db } from 'api/firebase';
import {
  fetchBlogsSuccess,
  fetchBlogsError,
  addBlogError,
  fetchBlogByIdSuccess,
  fetchBlogByIdError,
  deleteBlogSuccess,
  deleteBlogError,
  updatePostSuccess,
  updatePostError,
} from 'storeRedux/blogsSlice';
import { Blog, AddBlogArguments } from 'helpers/interface';

export function* getPostsSaga(): any {
  try {
    const blogsCollection = collection(db, 'blog');

    const queryForSorting = query(blogsCollection, orderBy('name', 'asc'));

    const snapshot = yield getDocs(queryForSorting);
    const blogsData = snapshot.docs.map((doc: QueryDocumentSnapshot) => ({
      id: doc.id,
      ...doc.data(),
    })) as Blog[];

    yield put(fetchBlogsSuccess(blogsData));
  } catch (error) {
    yield put(fetchBlogsError(error));
  }
}

export function* addBlogSaga(action: PayloadAction<AddBlogArguments>) {
  try {
    const newBlog = action.payload;
    const blogsCollection = collection(db, 'blog');
    yield call(addDoc, blogsCollection, newBlog);
  } catch (error) {
    yield put(addBlogError(error));
  }
}

export function* fetchBlogByIdSaga(action: PayloadAction<string>) {
  try {
    const id = action.payload;

    const blogDocRef = doc(db, 'blog', id);

    const blogDocSnapshot: DocumentSnapshot<Blog, DocumentData> = yield call(
      getDoc,
      blogDocRef,
    );

    if (blogDocSnapshot.exists()) {
      const blogData: Blog = {
        id: blogDocSnapshot.id,
        ...(blogDocSnapshot.data() as Omit<Blog, 'id'>),
      };

      yield put(fetchBlogByIdSuccess(blogData));
    }
  } catch (error) {
    yield put(fetchBlogByIdError(error));
  }
}

export function* deletePostSaga(action: PayloadAction<string>) {
  try {
    const id: string = action.payload;
    const blogDocRef = doc(db, 'blog', id);
    yield call(deleteDoc, blogDocRef);
    yield put(deleteBlogSuccess(id));
  } catch (error) {
    yield put(deleteBlogError('Помилка видалення'));
  }
}

export function* updatePostSaga(action: PayloadAction<Blog>) {
  try {
    const updatedBlog: Blog = action.payload;
    const blogDocRef = doc(db, 'blog', updatedBlog.id);
    yield call(setDoc, blogDocRef, updatedBlog, { merge: true });

    yield put(updatePostSuccess(updatedBlog));
  } catch (error) {
    yield put(updatePostError(error));
  }
}
