import React from 'react';
import { useAppSelector } from 'hooks/hooks';
import { Loader } from 'components/Loader/Loader';
import { Text, Img, Container } from './StartingPageStyled';
import hero from 'images/pngegg.png';

const StartingPage: React.FC = () => {
  const { isLoading, error } = useAppSelector(state => state.blog);

  return (
    <Container>
      {isLoading && !error && <Loader />}
      <Text>Записник</Text>
      <Img src={hero} alt="Mr.Hero" />
    </Container>
  );
};

export default StartingPage;
