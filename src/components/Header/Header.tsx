import React from "react";
import { Logo, Nav, StyledHeader } from "./headerStyledComponents";
import Link from "next/link";
import Lbc from "../../assets/lbc-logo-white.webp";

function Header() {
  return (
    <StyledHeader>
      <Link href="/" passHref>
        <Logo src={Lbc} alt="logo-leboncoin-frontend-orange-white" />
      </Link>
      <Nav>
        <Link href="/">Accueil</Link>
      </Nav>
    </StyledHeader>
  );
}

export default Header;
