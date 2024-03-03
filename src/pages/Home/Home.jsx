import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Section } from '../../components/Section/Section';
import { BlogForm } from '../../components/BlogForm/BlogForm';
import { BlogList } from '../../components/BlogList/BlogList';
import { Loader } from '../../components/Loader/Loader';
import { fetchBlogs } from '../../redux/operations';
import { selectError, selectIsLoading } from '../../redux/selectors';
import css from './Home.module.css';

const Home = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  return (
    <div className={css.container}>
      <h1 className={css.titlePage}>Блог</h1>
      <Section title={'Додати новий пост:'}>
        <BlogForm />
      </Section>

      {isLoading && !error && <Loader />}
      <Section title={'Список постів:'}>
        <BlogList />
      </Section>
    </div>
  );
};
export default Home;
