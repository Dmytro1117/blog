import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Loader } from 'components/Loader/Loader';
import Footer from 'components/Footer/Footer';
import {
  Container,
  Header,
  Link,
  Navigation,
  Content,
  Logo,
  SearchLogo,
} from './LayoutStyled';
import Logotip from 'images/ico.png';

const Layout: React.FC = () => {
  return (
    <Container>
      <Header>
        <Logo to="/">
          <SearchLogo src={Logotip} alt="logo" />
        </Logo>

        <Navigation>
          <Link to="/home">Додати запис</Link>
          <Link to="/list">Список постів</Link>
        </Navigation>
      </Header>

      <Content>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </Content>
      <Footer />
    </Container>
  );
};

export default Layout;
