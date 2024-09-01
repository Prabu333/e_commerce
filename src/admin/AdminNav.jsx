import React, { useRef } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase.config';
import { toast } from 'react-toastify';
import useAuth from '../custom-hooks/useAuth';
import '../styles/admin-nav.css';

const adminNav = [
  { display: 'Dashboard', path: '/dashboard' },
  { display: 'All Products', path: '/dashboard/all-products' },
  { display: 'Orders', path: '/dashboard/orders' },
  { display: 'Users', path: '/dashboard/users' }
];

const AdminNav = () => {
  const profileActionRef = useRef(null);
  const { photoURL } = useAuth();
  const navigate = useNavigate();

  const toggleProfileActions = () => {
    profileActionRef.current.classList.toggle('show__profileActions');
  };

  const renderProfileActions = () => (
    <div className='d-flex flex-column'>
      <span onClick={logout}>Logout</span>
      <Link to='/home'>Home</Link>
      <Link to='/dashboard/add-product'>Add Product</Link>
    </div>
  );

  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success('Logged out');
        navigate('/home');
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <>
      <header className='admin__header'>
        <div className="admin__nav-top">
          <Container>
            <div className='admin__nav-wrapper-top'>
              <div className="logo">
                <h2>Multimart</h2>
              </div>
              <div className="search__box">
                <input type="text" placeholder='Search....' />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>
              <div className="admin__nav-top-right">
                <span>
                  <i className="ri-notification-3-line"></i>
                </span>
                <span>
                  <i className="ri-settings-2-line"></i>
                </span>
                <div className='profile'>
                  <motion.img
                    whileTap={{ scale: 1.2 }}
                    src={photoURL}
                    alt="User profile"
                    onClick={toggleProfileActions}
                  />
                  <div
                    className="profile__actions"
                    ref={profileActionRef}
                  >
                    {renderProfileActions()}
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </header>
      <section className="admin__menu p-0">
        <Container>
          <Row>
            <Col>
              <div className="admin__navigation">
                <ul className="admin__menu-list">
                  {adminNav.map((item, index) => (
                    <li className="admin__menu-item" key={index}>
                      <NavLink to={item.path} className={({ isActive }) => 
                        isActive ? 'active__admin-menu' : ''}>
                        {item.display}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default AdminNav;
