// pages/index.js
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Map from "../components/Map"; // Assuming you have a map component
import styles from "../styles/search.module.css";
import Sidebar from '../components/Sidebar';
import "bootstrap/dist/css/bootstrap.min.css";

const Search = () => {
  return (
    <div className={styles.container}>
     { /*<Sidebar/>*/}
      {/* Header Section */}
      <header className={styles.header}>
        <div className={styles.searchBar}>
          <Link href={"/"}>
            <button className="btn">
              <Image
                src="/images/home_btn.png"
                href="/"
                alt="Search"
                width={24}
                height={24}
              />
            </button>
          </Link>
          <input
            type="text"
            placeholder="Type to search"
            className={`col-6 ${styles.input}`}
          />
          <button className="btn btn-outline-primary">
            <Image
              src="/images/search_btn.png"
              alt="Search"
              width={24}
              height={24}
            />
          </button>
        </div>
        <div className={styles.user}>
          <a href="tel:+18006578976" className={`mx-2 ${styles.phoneNumber}`}>
            +1 (800) 657 8976
          </a>
          <Image
              src="/images/jon.jpg"
              alt="Search"
              width={50}
              height={50}
              className="mx-2 rounded-5"
            />
          <span className={`mx-2 ${styles.userName}`}>Jon Doe</span>
        </div>
      </header>

      {/* Main Section */}
      <main className={styles.main}>
        {/* Housing List Section */}
        <section className={styles.housingList}>
          <h1>Housing near Jurong West</h1>
          <div className={styles.sortOptions}>
            <div className={'btn btn-primary rounded-pill col-2 mx-2 my-3 z-0'} disabled>Sort By:</div>
            <button className="btn btn-outline-primary rounded-pill col-3 mx-2 my-3">Price</button>
            <button className={'btn btn-outline-primary rounded-pill col-3 mx-2 my-3'}>Room Size</button>
          </div>

          {/* List of Properties */}
          <div className={styles.propertyList}>
            {[1, 2, 3].map((item) => (
              <div className={`rounded-4 ${styles.propertyCard}`} key={item}>
                <Image
                  src="/images/property.jpg" // Replace with actual images
                  alt="Property Image"
                  width={300}
                  height={200}
                  className={`img-fluid rounded-5 ${styles.propertyImage}`}
                />
                <div className={styles.propertyDetails}>
                  <h4>4-Room HDB flat</h4>
                  <p>$510,000</p>
                  <p>1109 sqft | Nearest MRT: Pioneer EW28</p>
                  <p>916 Jurong West Street 91</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Map Section */}
        <section className={styles.mapSection}>
          <Map />
        </section>
      </main>
    </div>
  );
};

export default Search;
