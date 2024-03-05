import { createAsyncThunk } from '@reduxjs/toolkit';
import { collection, addDoc, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { Blog } from '../redux/blogsSlice';
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

export const fetchBlogs = createAsyncThunk<
  Blog[],
  void,
  { rejectValue: string }
>('blog/FetchAll', async (_, { rejectWithValue }) => {
  const blogsCollection = collection(db, 'blog');

  const queryForSorting = query(blogsCollection, orderBy('name', 'asc'));

  const snapshot = await getDocs(queryForSorting);

  if (!snapshot) {
    return rejectWithValue('Серверна помилка');
  }

  const blogsData = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Blog[];

  return blogsData;
});

type AddBlogArguments = Omit<Blog, 'id'>;

export const addBlog = createAsyncThunk<
  Blog,
  AddBlogArguments,
  { rejectValue: string }
>('blog/addBlog', async (newBlog, { rejectWithValue }) => {
  const blogsCollection = collection(db, 'blog');
  const docRef = await addDoc(blogsCollection, newBlog);

  if (!docRef) {
    return rejectWithValue('Серверна помилка');
  }

  return { id: docRef.id, ...newBlog };
});

export const fetchBlogById = createAsyncThunk<
  Blog,
  string,
  { rejectValue: string }
>('blog/FetchById', async (id, { rejectWithValue }) => {
  const blogDocRef = doc(db, 'blog', id);

  const blogDocSnapshot = await getDoc(blogDocRef);

  if (blogDocSnapshot.exists()) {
    const blogData: Blog = {
      id: blogDocSnapshot.id,
      ...(blogDocSnapshot.data() as Omit<Blog, 'id'>),
    };

    return blogData;
  } else {
    console.log('Blog not found');
    return rejectWithValue('Blog not found');
  }
});

export const deleteBlog = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('blog/deleteBlog', async (id, { rejectWithValue }) => {
  const blogDocRef = doc(db, 'blog', id);
  await deleteDoc(blogDocRef);

  if (!blogDocRef) {
    return rejectWithValue('Помилка');
  }

  return id;
});

export const updateBlog = createAsyncThunk<Blog, Blog, { rejectValue: string }>(
  'blog/updateBlog',
  async (updatedBlog, { rejectWithValue }) => {
    const blogDocRef = doc(db, 'blog', updatedBlog.id);
    await setDoc(blogDocRef, updatedBlog, { merge: true });

    if (!blogDocRef) {
      return rejectWithValue('Помилка');
    }

    return updatedBlog;
  },
);
