import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from 'types/hooks';
import { fetchBlogs } from 'types/operations';
import { Loader } from 'components/Loader/Loader';
import { BlogList } from 'components/BlogList/BlogList';
import { Container, TitlePage } from './PostsListStyles';

const PostsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector(state => state.blog);

  const blogListComponent = useMemo(() => <BlogList />, []);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  return (
    <Container>
      <TitlePage>Список постів</TitlePage>
      {isLoading && !error && <Loader />}
      {blogListComponent}
    </Container>
  );
};
export default PostsList;
