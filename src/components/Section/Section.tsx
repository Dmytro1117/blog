import { ReactNode } from 'react';
import { Container, Title } from './SectionStyled';

type SectionProps = {
  title?: string;
  children: ReactNode;
};

export const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <Container>
      {title && <Title>{title}</Title>}
      {children}
    </Container>
  );
};
