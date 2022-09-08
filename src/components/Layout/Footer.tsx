import { getYear } from '@/utils/functions';
import React, { FC } from 'react';


interface FooterProps {}

const Footer: FC<FooterProps> = () => {
  const year = getYear();
  return (
    <div className="h-auto p-3 m-auto text-white bg-gray-600 ">
      <footer className="container flex justify-center mx-auto">&copy; Lebontest - {year}</footer>
    </div>
  );
};

export default Footer;
