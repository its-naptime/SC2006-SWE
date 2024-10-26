import React, { useState } from 'react';
import styles from '../styles/Sidebar.module.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.sidebarContainer}>
      {/* Sidebar */}
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        {/* Close button inside the sidebar */}
        <button onClick={toggleSidebar} className={styles.closeBtn}>
          x
        </button>
        <nav className={styles.sidebarContent}>
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#clients">Clients</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>

      {/* Toggle button (always visible) */}
      <button onClick={toggleSidebar} className={styles.toggleBtn}>
        {isOpen ? 'x' : '☰'}
      </button>
    </div>
  );
};

export default Sidebar;
