import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Loader } from './Loader/Loader';

const Home = lazy(() => import('../pages/Home/Home'));
const BlogDetails = lazy(() => import('../pages/BlogDetails/BlogDetails'));

const App = () => {
  return (
    <Routes>
      <Route
        path="/home"
        element={
          <React.Suspense fallback={<Loader />}>
            <Home />
          </React.Suspense>
        }
      />
      <Route
        path="/details/:blogId"
        element={
          <React.Suspense fallback={<Loader />}>
            <BlogDetails />
          </React.Suspense>
        }
      />

      <Route path="*" element={<Home />} />
    </Routes>
  );
};

export default App;
