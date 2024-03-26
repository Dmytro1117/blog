import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { fetchBlogsRequest } from 'storeRedux/blogsSlice';
import { Loader } from 'components/Loader/Loader';
import { BlogList } from 'components/BlogList/BlogList';
import { Container, TitlePage } from './PostsListStyles';

const PostsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector(state => state.blog);

  useEffect(() => {
    dispatch(fetchBlogsRequest());
  }, [dispatch]);

  return (
    <Container>
      <TitlePage>Список постів</TitlePage>
      {isLoading && !error && <Loader />}
      <BlogList />
    </Container>
  );
};
export default PostsList;
