// pages/index.js
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Map from "../components/Map"; // Assuming you have a map component
import styles from "../styles/Search.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../components/Layout";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const Search = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const handleShowModal = (property) => {
    setSelectedProperty(property);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProperty(null);
  };

  // Mock data for properties
  const properties = [
    {
      id: 1,
      title: "4-Room HDB flat",
      price: "$510,000",
      size: "1109 sqft",
      address: "916 Jurong West Street 91",
      nearestMRT: "Pioneer EW28",
      image: "/images/property.jpg",
      description: "A spacious 4-room HDB flat located near Pioneer MRT, ideal for families."
    },
    {
      id: 2,
      title: "3-Room HDB flat",
      price: "$400,000",
      size: "900 sqft",
      address: "123 Jurong East Street 32",
      nearestMRT: "Jurong East EW24",
      image: "/images/property.jpg",
      description: "A cozy 3-room flat located in Jurong East with easy access to amenities."
    },
    {
      id: 3,
      title: "5-Room HDB flat",
      price: "$650,000",
      size: "1300 sqft",
      address: "789 Jurong West Avenue 5",
      nearestMRT: "Boon Lay EW27",
      image: "/images/property.jpg",
      description: "A luxurious 5-room HDB flat with spacious living areas and modern fittings."
    }
  ];

  return (
    <div className={styles.container}>
      <Layout />
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
      </header>

      {/* Main Section */}
      <main className={styles.main}>
        {/* Housing List Section */}
        <section className={styles.housingList}>
          <h1>Housing near Jurong West</h1>
          <div className={styles.sortOptions}>
            <div className={"btn btn-primary rounded-pill col-2 mx-2 my-3 z-0"} disabled>
              Sort By:
            </div>
            <button className="btn btn-outline-primary rounded-pill col-3 mx-2 my-3">
              Price
            </button>
            <button className={"btn btn-outline-primary rounded-pill col-3 mx-2 my-3"}>
              Room Size
            </button>
          </div>

          {/* List of Properties */}
          <div className={styles.propertyList}>
            {properties.map((property) => (
              <div
                className={`rounded-4 ${styles.propertyCard}`}
                key={property.id}
                onClick={() => handleShowModal(property)}
                style={{ cursor: 'pointer' }}
              >
                <Image
                  src={property.image}
                  alt="Property Image"
                  width={300}
                  height={200}
                  className={`img-fluid rounded-5 ${styles.propertyImage}`}
                />
                <div className={styles.propertyDetails}>
                  <h4>{property.title}</h4>
                  <p>{property.price}</p>
                  <p>{property.size} | Nearest MRT: {property.nearestMRT}</p>
                  <p>{property.address}</p>
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

      {/* Property Details Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedProperty?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProperty && (
            <>
              <Image
                src={selectedProperty.image}
                alt="Property Image"
                width={500}
                height={300}
                className="img-fluid mb-3"
              />
              <p><strong>Price:</strong> {selectedProperty.price}</p>
              <p><strong>Size:</strong> {selectedProperty.size}</p>
              <p><strong>Address:</strong> {selectedProperty.address}</p>
              <p><strong>Nearest MRT:</strong> {selectedProperty.nearestMRT}</p>
              <p>{selectedProperty.description}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Search;
