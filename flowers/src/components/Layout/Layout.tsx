import React, { ReactNode } from 'react';
import logo from "../../assets/images/flowerLogo.svg"
import { Link } from '../Link/Link';

interface LayoutProps {
  children?: ReactNode; 
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layoutContainer">
      <div className="layoutContainer__leftSide">
        <img src={logo} alt="Logo" />
        <span>FlowerSport</span>
      </div>
      <div className="layoutContainer__rightSide">
        <Link name='Flowers' style="layoutContainer__rightSide__link" />
        <Link name='Login' style="layoutContainer__rightSide__link layoutContainer__rightSide__link--loginLink" />
      </div>
      {children} 
    </div>
  );
}

export default Layout;