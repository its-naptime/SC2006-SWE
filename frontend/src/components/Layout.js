// src/components/Layout.js
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
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
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-3">
        <Container>
          <Link href="/" passHref legacyBehavior>
            <Navbar.Brand className='px-4'>Kickstart</Navbar.Brand>
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
                  <Nav.Link 
                    onClick={handleLoginShow} 
                    style={{ cursor: 'pointer' }}
                  >
                    Login
                  </Nav.Link>
                  <Nav.Link 
                    onClick={handleRegisterShow} 
                    style={{ cursor: 'pointer' }}
                  >
                    Register
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Link href="/favourites" passHref legacyBehavior>
                    <Nav.Link active={router.pathname === "/favourites"}>
                      Favourites
                    </Nav.Link>
                  </Link>
                  <NavDropdown 
                    title={user?.username || 'Account'} 
                    id="basic-nav-dropdown"
                  >
                    <Link href="/profile" passHref legacyBehavior>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </Link>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleLogout}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

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

      <main className="container flex-grow-1 mt-4">
        {children}
      </main>

      <footer className="mt-auto py-3 bg-dark text-light">
        <Container className="text-center">
          <p className="mb-0">© 2024 Kickstart. All rights reserved.</p>
        </Container>
      </footer>
    </div>
  );
};

export default Layout;