import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const MainLayer: React.FC = () => {
  return (
    <div className="wrapper">
      <Header />
      <Outlet />
    </div>
  );
};

export default MainLayer;
