import React from 'react';
import { useAppSelector } from 'types/hooks';
import { Loader } from 'components/Loader/Loader';
import { Tex, Img, Container } from './StartingPageStyled';
import hero from 'images/pngegg.png';

const StartingPage: React.FC = () => {
  const { isLoading, error } = useAppSelector(state => state.blog);

  return (
    <Container>
      {isLoading && !error && <Loader />}
      <Tex>Записник</Tex>
      <Img src={hero} alt="Mr.Hero" />
    </Container>
  );
};

export default StartingPage;
