import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

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

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
