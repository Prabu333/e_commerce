import React, { useRef, useEffect, useCallback } from 'react';
import './Header.css';
import { motion } from 'framer-motion';
import logo from '../../assets/images/eco-logo.png';
import user_icon from '../../assets/images/user-icon.png';
import { Container, Row } from 'reactstrap';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useAuth from '../../custom-hooks/useAuth';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase.config';
import { toast } from 'react-toastify';

const nav__links = [
  { path: 'home', display: 'Home' },
  { path: 'shop', display: 'Shop' },
  { path: 'cart', display: 'Cart' }
];

const Header = () => {
  const headerRef = useRef(null);
  const profileActionRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const { currentUser, userRole } = useAuth();

  // Sticky header function with proper cleanup
  const stickyHeaderFunc = useCallback(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        headerRef.current.classList.add('sticky__header');
      } else {
        headerRef.current.classList.remove('sticky__header');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const cleanupScrollListener = stickyHeaderFunc();
    return cleanupScrollListener;
  }, [stickyHeaderFunc]);

  // Logout function
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

  // Toggle menu visibility
  const menuToggle = () => {
    menuRef.current.classList.toggle('active__menu');
  };

  // Navigate to cart
  const navigateTocart = () => {
    navigate('/cart');
  };

  // Toggle profile actions visibility
  const toggleProfileActions = () => {
    profileActionRef.current.classList.toggle('show__profileActions');
  };

  // Render profile actions based on user state
  const renderProfileActions = () => {
    if (!currentUser) {
      return (
        <div className='d-flex flex-column'>
          <Link to='/signup'>Signup</Link>
          <Link to='/login'>Login</Link>
        </div>
      );
    } else if (userRole == null) {
      return (
        <div>
          <span onClick={logout}>Logout</span>
        </div>
      );
    } else {
      return (
        <div>
          <span onClick={logout}>Logout</span><br />
          <Link to='/dashboard'>Dashboard</Link>
        </div>
      );
    }
  };

  return (
    <header className='header' ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper">
            <div className="logo">
              <img src={logo} alt='Logo' />
              <h1>Multimart</h1>
            </div>
            <div className="navigation" ref={menuRef} onClick={menuToggle}>
              <ul className="menu">
                {nav__links.map((item, index) => (
                  <li className='nav__item' key={index}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => (isActive ? 'nav__active' : '')}
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className='nav__icons'>
              <span className="fav__icon">
                <i className="ri-heart-line"></i>
                <span className="badge">2</span>
              </span>
              <span className="cart__icon" onClick={navigateTocart}>
                <i className="ri-shopping-bag-line"></i>
                <span className="badge">{totalQuantity}</span>
              </span>
              <div className='profile'>
                <motion.img
                  whileTap={{ scale: 1.2 }}
                  src={currentUser ? currentUser.photoURL : user_icon}
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
              <div className='mobile__menu'>
                <span onClick={menuToggle}><i className="ri-menu-line"></i></span>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
