import styled from '@emotion/styled';

export const Container = styled.div`
  color: rgba(31, 166, 224, 0.837);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TitlePage = styled.h1`
  font-size: 42px;
  font-weight: 600;
  margin-top: 16px;
  margin-bottom: 8px;

  @media (max-width: 480px) {
    font-size: 32px;
    font-weight: 500;
    margin-top: 8px;
    margin-bottom: 4px;
  }

  @media (min-width: 481px) and (max-width: 767px) {
    font-size: 38px;
    margin-top: 12px;
    margin-bottom: 6px;
  }
`;
