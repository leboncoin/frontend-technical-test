import React, { FC } from 'react';
import Footer from './Footer';
import Header from './Header';

interface LayoutProps {
  children: JSX.Element;
}

export const Layout: FC<LayoutProps> = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
