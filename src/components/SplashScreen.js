// src/components/SplashScreen.js
import React, { useEffect } from 'react';
import Logo from '../assets/florista.png';

const SplashScreen = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="splash-screen">
      <img src={Logo} alt="Logo" />
    </div>
  );
};

export default SplashScreen;
