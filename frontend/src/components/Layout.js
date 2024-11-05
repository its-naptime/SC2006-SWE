// components/Layout.js
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from '../components/Form'; // Import the Form component
import 'bootstrap/dist/css/bootstrap.min.css';

const Layout = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'register'

  const handleModalClose = () => setShowModal(false);
  const handleLoginShow = () => {
    setActiveTab('login');
    setShowModal(true);
  };
  const handleRegisterShow = () => {
    setActiveTab('register');
    setShowModal(true);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container className='mx-4'>
          <Navbar.Brand className='px-4' href="/">Kickstart</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/search">Search</Nav.Link>
              <Nav.Link onClick={handleLoginShow}>Login</Nav.Link>
              <Nav.Link onClick={handleRegisterShow}>Register</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Modal for Login and Register */}
      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{activeTab === 'login' ? 'Login' : 'Register'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form activeTab={activeTab} setActiveTab={setActiveTab} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Layout;
