import React from 'react'
import { Container, Row, Col } from 'reactstrap'

import useAuth from '../custom-hooks/useAuth'
import { useRef } from 'react'

import '../styles/admin-nav.css'

import { NavLink, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase.config';
import { toast } from 'react-toastify';

const admin__nav = [
  {
    display:'Dashboard',
    path: '/dashboard'
  },
  {
    display:'All-Products',
    path: '/dashboard/all-products'
  },
  {
    display:'Orders',
    path: '/dashboard/orders'
  },
  {
    display:'Users',
    path: '/dashboard/users'
  }
]

const AdminNav = () => {

const profileActionRef = useRef(null);


const { photoURL } = useAuth();
const navigate = useNavigate();

const toggleProfileActions = () => {
  profileActionRef.current.classList.toggle('show__profileActions');
};


// Render profile actions based on user state
const renderProfileActions = () => {
  return (
    <div className='d-flex align-items-center justify-content-center flex-column'>
      <span onClick={logout}>Logout</span>
      <Link to='/home'>Home</Link>
      <Link to='/dashboard/add-product'>Add Product</Link>
    </div>)
 
};

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
              <i class="ri-search-line"></i>
              </span>
            </div>
            <div className="admin__nav-top-right">
              <span>
              <i class="ri-notification-3-line"></i>
              </span>
              <span>
              <i class="ri-settings-2-line"></i>
              </span>
              {/* <img src={photoURL} alt="" /> */}
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
      <section className = "admin__menu p-0">
           <Container>
            <Row>
              <Col>
              <div className="admin__navigation">
                <ul className="admin__menu-list">
                  {
                   admin__nav.map((item, index) =>(
                    <li className="admin__menu-item" key={index}>
                      <NavLink to={item.path} className={navClass => 
                        navClass.isActive? 'active__admin-menu' : ''}>
                          {item.display}</NavLink>
                    </li>
                   ))
                  }
                </ul>
              </div>
              </Col>
            </Row>
            </Container>
      </section>
    </>
  )
}

export default AdminNav
