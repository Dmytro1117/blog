import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { blogsReducer } from './blogsSlice';
import watchBlogs from './saga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    blog: blogsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(watchBlogs);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
