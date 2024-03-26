import styled from '@emotion/styled';

export const Text = styled.p`
  color: orange;
  padding: 10px;
  font-size: 44px;
  margin: 0;

  @media (max-width: 480px) {
    font-size: 28px;
    color: rgba(104, 105, 107, 0.877);
  }

  @media (min-width: 481px) and (max-width: 767px) {
    font-size: 34px;
    color: rgba(31, 166, 224, 0.837);
  }
`;

export const Img = styled.img`
  width: 700px;

  object-fit: contain;
  object-position: center;
  display: flex;
  margin: 0 auto;

  @media (max-width: 480px) {
    width: 300px;
  }

  @media (min-width: 481px) and (max-width: 767px) {
    width: 450px;
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: calc(100vh - 140px);
`;
