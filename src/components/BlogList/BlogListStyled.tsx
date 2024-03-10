import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export const Container = styled.section`
  width: 300px;
  padding: 20px;
  box-shadow: 4px 4px 8px #8888888e;
  margin: 24px auto;
  border-radius: 2px;
  display: flex;
  // flex-direction: column;
  // align-items: center;

  @media (max-width: 480px) {
    width: 250px;
    padding: 8px;
    margin: 12px auto;
  }

  @media (min-width: 481px) and (max-width: 767px) {
    width: 300px;
    padding: 16px;
    box-shadow: 4px 4px 8px #8888888e;
    margin: 18px auto;
  }
`;

export const BlogLink = styled(Link)`
  text-decoration: none;
  color: #191d1e;

  &:hover {
    color: rgba(31, 166, 224, 0.837);
  }
`;

export const List = styled.ul`
  display: flex;
  // flex-direction: column;
  list-style: none;
  padding: 0;
  flex-wrap: wrap;
  justify-content: space-around;
`;

export const Text = styled.p`
  display: block;
  width: 300px;
  overflow: hidden;
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 8px;
  margin-top: 8px;

  @media (max-width: 480px) {
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 4px;
    margin-top: 4px;
  }

  @media (min-width: 481px) and (max-width: 767px) {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 6px;
    margin-top: 6px;
  }
`;
