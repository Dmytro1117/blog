import { Section } from 'components/Section/Section';
import { BlogForm } from 'components/BlogForm/BlogForm';
import { Container, TitlePage } from './HomeStyles';

const Home: React.FC = () => {
  return (
    <Container>
      <TitlePage>Додати запис</TitlePage>
      <Section title={'Створити новий:'}>
        <BlogForm />
      </Section>
    </Container>
  );
};
export default Home;
