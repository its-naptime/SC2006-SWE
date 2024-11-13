// components/Layout.js
import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Modal from 'react-bootstrap/Modal';
import Form from './Form';
import { useAuth } from '../AuthContext';
import { useRouter } from 'next/router';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';

const Layout = ({ children }) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const { isAuthenticated, user, logout } = useAuth();

  const handleModalClose = () => setShowModal(false);
  
  const handleLoginShow = () => {
    setActiveTab('login');
    setShowModal(true);
  };
  
  const handleRegisterShow = () => {
    setActiveTab('register');
    setShowModal(true);
  };
  
  const handleLogout = async () => {
    logout();
    localStorage.clear();
    await router.push('/');
  };

  return (
    <div className="min-h-screen d-flex flex-column">
      <Navbar bg="dark" variant="dark" expand="lg">
        <div className="container-fluid px-4">
          <Link href="/" passHref legacyBehavior>
            <Navbar.Brand>Kickstart</Navbar.Brand>
          </Link>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref legacyBehavior>
                <Nav.Link active={router.pathname === "/"}>Home</Nav.Link>
              </Link>
              <Link href="/search" passHref legacyBehavior>
                <Nav.Link active={router.pathname === "/search"}>Search</Nav.Link>
              </Link>

              {!isAuthenticated ? (
                <>
                  <Nav.Link onClick={handleLoginShow}>Login</Nav.Link>
                  <Nav.Link onClick={handleRegisterShow}>Register</Nav.Link>
                </>
              ) : (
                <>
                  <Link href="/profile" passHref legacyBehavior>
                    <Nav.Link active={router.pathname === "/profile"}>
                      Catalogue
                    </Nav.Link>
                  </Link>
                  <NavDropdown title={user?.username || 'Account'} id="basic-nav-dropdown">
                    <NavDropdown.Item onClick={handleLogout}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>

      {/* Content area - no wrapping */}
      <div className="flex-grow-1">
        {children}
      </div>

      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {activeTab === 'login' ? 'Login' : 'Register'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            onClose={handleModalClose} 
          />
        </Modal.Body>
      </Modal>

      <footer className="mt-auto py-3 bg-dark text-light">
        <div className="container-fluid text-center">
          <p className="mb-0">© 2024 Kickstart. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;