import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1170px;
  margin-left: auto;
  margin-right: auto;
  min-height: 100vh;
`;

export const Content = styled.div`
  flex: 1;
  padding-left: 20px;
  padding-right: 20px;
`;

export const Navigation = styled.nav``;

export const Header = styled.header`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.5);
`;

export const Link = styled(NavLink)`
  display: inline-block;
  text-decoration: none;
  padding: 14px;
  font-weight: 600;
  font-size: 22px;
  color: #191d1e;

  &.active {
    color: rgba(31, 166, 224, 0.837);
  }

  &:hover {
    color: rgba(31, 166, 224, 0.837);
  }

  @media (max-width: 480px) {
    padding: 8px;
    font-weight: 400;
    font-size: 16px;
  }

  @media (min-width: 481px) and (max-width: 767px) {
    padding: 12px;

    font-size: 20px;
  }
`;

export const SearchLogo = styled.img`
  width: 40px;

  @media (max-width: 480px) {
    width: 26px;
  }

  @media (min-width: 481px) and (max-width: 767px) {
    width: 32px;
  }
`;

export const Logo = styled(NavLink)`
  margin: auto 10px;
`;
