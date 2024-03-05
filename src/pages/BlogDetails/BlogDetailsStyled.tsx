import styled from '@emotion/styled';
import { CiTrash } from 'react-icons/ci';
import { FaEdit } from 'react-icons/fa';

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;
`;

export const IconDelete = styled(CiTrash)`
  cursor: pointer;
  color: rgba(104, 105, 107, 0.877);
  margin-top: 16px;

  &:hover {
    cursor: pointer;
    color: rgba(219, 39, 15, 0.781);
  }
`;

export const IconEdit = styled(FaEdit)`
  cursor: pointer;
  color: rgba(104, 105, 107, 0.877);
  margin-top: 16px;

  &:hover {
    cursor: pointer;
    color: rgba(219, 39, 15, 0.781);
  }
`;

export const Item = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
`;

export const Text = styled.p`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
  max-width: 600px;
  overflow-wrap: break-word;

  @media (max-width: 480px) {
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 12px;
    max-width: 300px;
  }

  @media (min-width: 481px) and (max-width: 767px) {
    font-size: 18px;
    margin-bottom: 14px;
    max-width: 450px;
  }
`;

export const Button = styled.button`
  border: none;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 2px;
  text-decoration: none;
  color: black;
  font-weight: 500;
  color: white;
  margin-top: 18px;
  background-color: rgba(19, 116, 206, 0.781);
  &:hover {
    color: white;
    background-color: grey;
  }
`;
