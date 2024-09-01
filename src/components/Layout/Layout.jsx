// Layout.js
import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Routers from '../../routers/Routers'; // Ensure this path is correct
import AdminNav from '../../admin/AdminNav';
import { useLocation } from 'react-router-dom';
import ScrollToTop from '../../routers/ScrollTop'; // Adjust the path as necessary

const Layout = () => {
  const location = useLocation();

  return (
    <>
      {/* Show AdminNav if on dashboard paths, otherwise show Header */}
      {location.pathname.startsWith('/dashboard') ? <AdminNav /> : <Header />}
      
      {/* Scroll to top on route change */}
      <ScrollToTop />

      <div>
        <Routers />
      </div>

      <Footer />
    </>
  );
};

export default Layout;
