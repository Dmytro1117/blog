import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'types/hooks';
import { Section } from 'components/Section/Section';
import { fetchBlogs } from 'types/operations';
import { BlogForm } from 'components/BlogForm/BlogForm';
import { Loader } from 'components/Loader/Loader';
import { BlogList } from 'components/BlogList/BlogList';
import { Container, TitlePage } from './HomeStyles';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector(state => state.blog);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  return (
    <Container>
      <TitlePage>Блог</TitlePage>
      <Section title={'Додати новий пост:'}>
        <BlogForm />
      </Section>

      {isLoading && !error && <Loader />}
      <Section title={'Список постів:'}>
        <BlogList />
      </Section>
    </Container>
  );
};
export default Home;
