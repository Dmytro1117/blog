import { createAsyncThunk } from '@reduxjs/toolkit';
import { collection, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getDocs, getDoc, orderBy, query } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCqNoQovi8EGtCl5oa7phFawWQIVj8pmIk',
  authDomain: 'blog-firebase-93e16.firebaseapp.com',
  databaseURL:
    'https://blog-firebase-93e16-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'blog-firebase-93e16',
  storageBucket: 'blog-firebase-93e16.appspot.com',
  messagingSenderId: '684749352586',
  appId: '1:684749352586:web:5b506fb1d15498cd5f8773',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const fetchBlogs = createAsyncThunk(
  'blog/FetchAll',
  async (_, thunkAPI) => {
    try {
      const blogsCollection = collection(db, 'blog');

      const queryForSorting = query(blogsCollection, orderBy('name', 'asc'));
      const snapshot = await getDocs(queryForSorting);

      const blogsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      return blogsData;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const fetchBlogById = createAsyncThunk(
  'blog/FetchById',
  async (id, thunkAPI) => {
    try {
      const blogtDocRef = doc(db, 'blog', id);

      const blogDocSnapshot = await getDoc(blogtDocRef);

      if (blogDocSnapshot.exists()) {
        const blogData = {
          id: blogDocSnapshot.id,
          ...blogDocSnapshot.data(),
        };

        return blogData;
      } else {
        console.log('Blog not found');
        return thunkAPI.rejectWithValue('Blog not found');
      }
    } catch (e) {
      console.error('Error fetching blog by ID:', e);
      throw e;
    }
  },
);

export const addBlog = createAsyncThunk(
  'blog/addBlog',
  async (newBlog, thunkAPI) => {
    try {
      const blogsCollection = collection(db, 'blog');
      const docRef = await addDoc(blogsCollection, newBlog);
      return { id: docRef.id, ...newBlog };
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const deleteBlog = createAsyncThunk(
  'blog/deleteBlog',
  async (id, thunkAPI) => {
    try {
      const blogtDocRef = doc(db, 'blog', id);
      await deleteDoc(blogtDocRef);
      return id;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);
