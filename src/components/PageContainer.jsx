import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const PageContainer = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="page-container">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default PageContainer; 