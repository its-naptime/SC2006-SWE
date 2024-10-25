import React from "react";
import Image from "next/image";
import styles from "../styles/Index.module.css";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";

const Index = () => {
  return (
    <div className={styles.pageContainer}>
      {/* Top Section: Site Name with Background */}
      <header className={styles.header}>
        <p className={`text-left ${styles.siteName}`}> KickStart </p>
      </header>

      <img
        src="/images/home.jpg" // Path to your image
        alt="Example Image"
        className={styles.imageClass} // Add the class here
      />
      {/* Middle Section: Main Content */}
      <main className={styles.mainContent}>
        <h2 className={styles.subheading}>Find the perfect</h2>
        <h1 className={styles.mainHeading}>
          HOME{" "}
          <span role="img" aria-label="home">
            🏠
          </span>
        </h1>
        <p className={styles.descriptionText}>
          Let us guide you to the ideal school for your children, ensuring they
          receive a strong educational foundation{" "}
          <span role="img" aria-label="graduation">
            🎓
          </span>
          . We also source homes that prioritize convenience, comfort, and
          affordability{" "}
          <span role="img" aria-label="house">
            🏡
          </span>
          , helping your family thrive in a nurturing environment{" "}
          <span role="img" aria-label="sun">
            🌟
          </span>
          .
        </p>
        <Link href="search">
          <button className={`rounded-pill ${styles.startButton}`}>
            Start Now{" "}
            <span role="img" aria-label="rocket">
              🚀
            </span>
          </button>
        </Link>
      </main>
{/*

      <footer className={styles.footer}>
        <Link href="/" className={styles.navItem}>
          <span role="img" aria-label="home" className={styles.navIcon}>
            🏠
          </span>
          <p className={styles.navText}>Home</p>
        </Link>
        <Link href="/search" className={styles.navItem}>
          <span role="img" aria-label="explore" className={styles.navIcon}>
            💻
          </span>
          <p className={styles.navText}>Explore</p>
        </Link>
      </footer>
      */}
    </div>
  );
};

export default Index;
