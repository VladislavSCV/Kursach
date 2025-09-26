import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../assets/photo/logo.png'; 

const Logo = () => {
  return (
    <Link to="/">
      <img 
        src={logoImg} 
        alt="Логотип Северяночка" 
        style={{ width: '40px', height: '32px' }} 
      />
    </Link>
  );
};

export default Logo;
