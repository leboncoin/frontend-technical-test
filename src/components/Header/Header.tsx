import React from "react";
import {
  Logo,
  Nav,
  NavLinkWrapper,
  StyledHeader,
} from "./headerStyledComponents";
import Link from "next/link";
import Lbc from "../../assets/lbc-logo-white.webp";

function Header() {
  return (
    <StyledHeader>
      <Link href="/" passHref>
        <Logo src={Lbc} />
      </Link>
      <Nav>
        <Link href="/">
          <NavLinkWrapper>Accueil</NavLinkWrapper>
        </Link>
      </Nav>
    </StyledHeader>
  );
}

export default Header;
