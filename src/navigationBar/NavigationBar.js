import React from 'react';
import Header from './Header';
import Footer from './Footer';

const NavigationBar = ({ children }) => {
  return (
    <div className="navigation-bar">
      <Header />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default NavigationBar;
