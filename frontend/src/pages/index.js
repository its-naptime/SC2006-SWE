<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../styles/Index.module.css";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
//import NavList from "../components/NavList";
import Sidebar from "../components/Sidebar";
import { checkHealth } from "../Api";
import Layout from "../components/Layout";

const Index = () => {
  const [connectionStatus, setConnectionStatus] = useState(null);

  useEffect(() => {
    checkHealth()
      .then((data) => {
        console.log("Backend health status:", data);
        setConnectionStatus(
          data.database === "connected" && data.status === "ok"
            ? "success"
            : "error",
        );
      })
      .catch((error) => {
        console.error("Health check failed:", error);
        setConnectionStatus("error");
      });
  }, []);
  return (
    <div className={styles.pageContainer}>
      <Layout>
      </Layout>
      {/* temporary health check, REMOVE LATER */}
      {connectionStatus && (
        <div
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            padding: "8px 12px",
            borderRadius: "4px",
            fontSize: "14px",
            backgroundColor:
              connectionStatus === "success" ? "#4CAF50" : "#f44336",
            color: "white",
            opacity: 0.9,
            zIndex: 1000,
            transition: "opacity 0.3s",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: "white",
            }}
          />
          {connectionStatus === "success"
            ? "Connected to backend"
            : "Backend connection failed"}
        </div>
      )}
      {/* Top Section: Site Name with Background */}
      {/*<header className={styles.header}>
        <p className={`text-left ${styles.siteName}`}> KickStart </p>
      </header>*/}

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
=======
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../styles/Index.module.css";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
//import NavList from "../components/NavList";
import Sidebar from "../components/Sidebar";
import { checkHealth } from "../Api";
import Layout from "../components/Layout";

const Index = () => {
  const [connectionStatus, setConnectionStatus] = useState(null);

  useEffect(() => {
    checkHealth()
      .then((data) => {
        console.log("Backend health status:", data);
        setConnectionStatus(
          data.database === "connected" && data.status === "ok"
            ? "success"
            : "error",
        );
      })
      .catch((error) => {
        console.error("Health check failed:", error);
        setConnectionStatus("error");
      });
  }, []);
  return (
    <div className={styles.pageContainer}>
      <Layout>
      </Layout>
      {/* temporary health check, REMOVE LATER */}
      {connectionStatus && (
        <div
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            padding: "8px 12px",
            borderRadius: "4px",
            fontSize: "14px",
            backgroundColor:
              connectionStatus === "success" ? "#4CAF50" : "#f44336",
            color: "white",
            opacity: 0.9,
            zIndex: 1000,
            transition: "opacity 0.3s",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: "white",
            }}
          />
          {connectionStatus === "success"
            ? "Connected to backend"
            : "Backend connection failed"}
        </div>
      )}
      {/* Top Section: Site Name with Background */}
      {/*<header className={styles.header}>
        <p className={`text-left ${styles.siteName}`}> KickStart </p>
      </header>*/}

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
>>>>>>> c71d5301df4f7c94d0bbce39e481e3fefb734cd2
