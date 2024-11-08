import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import Map from "../components/Map";
import styles from "../styles/Search.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../components/Layout";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ITEMS_PER_PAGE = 4;

const Search = () => {
  const [properties, setProperties] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const mapRef = useRef(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/hdb_data/")
      .then((response) => {
        setProperties(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching properties:", err);
        setError(err);
        setLoading(false);
      });
  }, []);

  const handleShowModal = (property) => {
    setSelectedProperty(property);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProperty(null);
  };

  const moveToTown = async (townName) => {
    try {
      const apiKey = "AIzaSyAyzmdHfqi4yBCQJmX1OT3rkXaam6Q5X7g";
      const formattedTownName = `${townName}, Singapore`; // Add context to the town name
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json`,
        {
          params: {
            address: formattedTownName,
            key: apiKey,
          },
        }
      );
  
      if (response.data.results.length > 0) {
        const { lat, lng } = response.data.results[0].geometry.location;
        console.log(`Coordinates found for ${formattedTownName}: ${lat}, ${lng}`);
        if (mapRef.current) {
          mapRef.current.panTo({ lat, lng });
          mapRef.current.setZoom(15); // Adjust the zoom level as needed
        }
      } else {
        console.error(`Location not found for the given town name: ${formattedTownName}`);
        alert(`Location not found for the given town name: ${formattedTownName}`);
      }
    } catch (error) {
      console.error("Error fetching location data:", error);
      alert("Error fetching location data. Please try again later.");
    }
  };
  
  

  const totalPages = Math.ceil(properties.length / ITEMS_PER_PAGE);
  const currentProperties = properties.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className={styles.container}>
      <Layout />
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

      <main className={styles.main}>
        <section className={styles.housingList}>
          <h1>Housing near Jurong West</h1>
          <div className={styles.sortOptions}>
            <div
              className={"btn btn-primary rounded-pill col-2 mx-2 my-3 z-0"}
              disabled
            >
              Sort By:
            </div>
            <button className="btn btn-outline-primary rounded-pill col-3 mx-2 my-3">
              Price
            </button>
            <button
              className={"btn btn-outline-primary rounded-pill col-3 mx-2 my-3"}
            >
              Room Size
            </button>
          </div>
          <div className={styles.propertyList}>
            {currentProperties.map((property) => (
              <div className={`rounded-4 ${styles.propertyCard}`} key={property.id} style={{ position: 'relative' }}>
                <Image
                  src={property.image || "/images/property.jpg"}
                  alt="Property Image"
                  width={300}
                  height={200}
                  className={`img-fluid rounded-5 ${styles.propertyImage}`}
                  onClick={() => handleShowModal(property)} // Open modal on image click
                  style={{ cursor: "pointer" }}
                />
                <div className={styles.propertyDetails}>
                  <h4>{property.street_name || "No Title"}</h4>
                  <p>{property.resale_price || "No Price Info"}</p>
                  <p>
                    {property.floor_area_sqm || "Size not specified"} | Nearest
                    MRT: {property.nearestMRT || "N/A"}
                  </p>
                  <p>{property.town || "No Address"}</p>
                </div>
                {/* Move to Town Button at the bottom right of the card */}
                <Button
                  variant="primary"
                  onClick={() => moveToTown(property.street_name)}
                  style={{ position: 'absolute', bottom: '10px', right: '10px' }}
                >
                  Move Map to {property.town}
                </Button>
              </div>
            ))}
          </div>

          <div className={styles.pagination}>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`btn ${
                  currentPage === index + 1 ? "btn-primary" : "btn-outline-primary"
                } mx-1`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </section>

        <section className={styles.mapSection}>
          <Map ref={mapRef} googleMapsApiKey="AIzaSyAyzmdHfqi4yBCQJmX1OT3rkXaam6Q5X7g" />
        </section>
      </main>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedProperty?.street_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProperty && (
            <>
              <Image
                src={selectedProperty.image || "/images/property.jpg"}
                alt="Property Image"
                width={500}
                height={300}
                className="img-fluid mb-3"
              />
              <p>
                <strong>town:</strong> {selectedProperty.town}
              </p>
              <p>
                <strong>flat_type:</strong> {selectedProperty.flat_type}
              </p>
              <p>
                <strong>street_name:</strong> {selectedProperty.street_name}
              </p>
              <p>
                <strong>storey_range:</strong> {selectedProperty.storey_range}
              </p>
              <p>
                <strong>floor_area_sqm:</strong>{" "}
                {selectedProperty.floor_area_sqm}
              </p>
              <p>
                <strong>flat_model:</strong> {selectedProperty.flat_model}
              </p>
              <p>
                <strong>lease_commence_date:</strong>{" "}
                {selectedProperty.lease_commence_date}
              </p>
              <p>
                <strong>remaining_lease:</strong>{" "}
                {selectedProperty.remaining_lease}
              </p>
              <p>
                <strong>resale_price:</strong> {selectedProperty.resale_price}
              </p>
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
