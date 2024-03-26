import { SectionProps } from 'helpers/interface';
import { Container, Title } from './SectionStyled';

export const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <Container>
      {title && <Title>{title}</Title>}
      {children}
    </Container>
  );
};
