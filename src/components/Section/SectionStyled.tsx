import styled from '@emotion/styled';

export const Container = styled.section`
  width: 650px;
  padding: 20px;
  box-shadow: 4px 4px 8px #8888888e;
  margin: 24px auto;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 480px) {
    width: 400px;
    padding: 8px;
    margin: 12px auto;
  }

  @media (min-width: 481px) and (max-width: 767px) {
    width: 500px;
    padding: 16px;
    box-shadow: 4px 4px 8px #8888888e;
    margin: 18px auto;
  }
`;

export const Title = styled.h2`
  max-width: 500px;
  margin: 0;
  font-size: 28px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 16px;
  color: rgba(104, 105, 107, 0.877);
  overflow-wrap: break-word;

  @media (max-width: 480px) {
    font-size: 20px;
    font-weight: 400;
    max-width: 300px;
    overflow-wrap: break-word;
    margin-bottom: 8px;
  }

  @media (min-width: 481px) and (max-width: 767px) {
    font-size: 24px;
    font-weight: 500;
    max-width: 400px;
    margin-bottom: 14px;
  }
`;
