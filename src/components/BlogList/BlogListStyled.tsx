import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export const BlogLink = styled(Link)`
  text-decoration: none;
  color: #191d1e;

  &:hover {
    color: rgba(31, 166, 224, 0.837);
  }
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;
`;

export const Text = styled.p`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 16px;

  @media (max-width: 480px) {
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 8px;
  }

  @media (min-width: 481px) and (max-width: 767px) {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 10px;
  }
`;
