import styled from '@emotion/styled';

export const Label = styled.label`
  font-size: 24px;

  @media (max-width: 480px) {
    font-size: 16px;
  }

  @media (min-width: 481px) and (max-width: 767px) {
    width: 320px;
    margin-bottom: 12px;
    font-size: 14px;
    padding: 8px 14px;
  }
`;

export const Input = styled.input`
  width: 500px;
  margin-bottom: 16px;
  font-size: 16px;
  padding: 8px 16px;
  border: none;
  border-bottom: 1px solid #000;
  display: block;

  &:hover,
  &:focus {
    outline: none;
    border: none;
    border-bottom: 1px solid rgba(19, 116, 206, 0.781);
  }

  @media (max-width: 480px) {
    width: 250px;
    margin-bottom: 8px;
    font-size: 12px;
    padding: 6px 12px;
  }

  @media (min-width: 481px) and (max-width: 767px) {
    width: 360px;
    margin-bottom: 12px;
    font-size: 14px;
    padding: 8px 14px;
  }
`;

export const ButtonSubmit = styled.button`
  font-size: 18px;
  font-weight: 600;
  margin-top: 30px;
  padding: 8px;
  border: none;
  cursor: pointer;
  background-color: transparent;
  color: rgba(104, 105, 107, 0.877);
  border-radius: 2px;
  display: block;
  margin-left: auto;
  margin-right: auto;

  &:hover,
  &:focus {
    background-color: rgba(104, 105, 107, 0.877);
    color: rgb(255, 255, 255);
  }

  @media (max-width: 480px) {
   
      font-size: 12px;
      font-weight: 500;
      margin-top: 20px;
      padding: 6px;
      color: white;
      background-color: rgba(19, 116, 206, 0.781);
    }

    @media (min-width: 481px) and (max-width: 767px) {
      font-size: 16px;
      font-weight: 600;
      margin-top: 24px;
      padding: 8px 24px;
      color: white;
      background-color: rgba(19, 116, 206, 0.781);
    }
  }
`;
