import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Section } from '../../components/Section/Section';
import { BlogForm } from '../../components/BlogForm/BlogForm';
import { BlogList } from '../../components/BlogList/BlogList';
import { Loader } from '../../components/Loader/Loader';
import { fetchBlogs } from '../../redux/operations';
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
