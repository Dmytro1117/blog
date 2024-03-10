import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const StartingPage = lazy(() => import('pages/StarttngPage/StartingPage'));
const Layout = lazy(() => import('./Layout/Layout'));
const Home = lazy(() => import('pages/Home/Home'));
const PostsList = lazy(() => import('pages/PostsList/PostsList'));
const BlogDetails = lazy(() => import('pages/BlogDetails/BlogDetails'));

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<StartingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/list" element={<PostsList />} />
        <Route path="/list/details/:blogId" element={<BlogDetails />} />
        <Route path="*" element={<StartingPage />} />
      </Route>
    </Routes>
  );
};

export default App;
