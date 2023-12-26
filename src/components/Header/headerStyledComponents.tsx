import Image from "next/image";
import styled from "styled-components";

export const StyledHeader = styled.header`
  background: rgba(26, 26, 27, 1);
  color: #fff;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Logo = styled(Image)`
  width: 80px;
  height: auto;
`;

export const Nav = styled.nav`
  display: flex;
  gap: 1rem;
`;

export const NavLinkWrapper = styled.a`
  color: white;
  text-decoration: none;
  font-size: 0.8rem;
  transition: color 0.3s ease;
  cursor: pointer;

  &:hover {
    color: #ff6633;
    text-decoration: none;
  }
`;
