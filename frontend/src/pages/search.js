import React, { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/router';
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import Map from "../components/Map";
import styles from "../styles/Search.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../components/Layout";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { X } from 'lucide-react';
import { Marker, InfoWindow } from '@react-google-maps/api';

const ITEMS_PER_PAGE = 8;

const Search = () => {
  const router = useRouter();
  const mapRef = useRef(null);
  
  // State Management
  const [properties, setProperties] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  // Search and Filter States
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    minArea: "",
    maxArea: "",
    flatTypes: [],
    towns: [],
    sortBy: "price_desc"
  });
  const handleMarkerClick = (propertyId) => {
    const propertyElement = document.getElementById(`property-${propertyId}`);
    if (propertyElement) {
      console.log(`Property card with ID ${propertyId} clicked`); 
      propertyElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      propertyElement.classList.add('highlight'); // Optional: Add a highlight class to visually indicate
      setTimeout(() => {
        propertyElement.classList.remove('highlight'); // Remove highlight after a delay
      }, 2000);
    }
  };
  // Loading state for individual actions
  const [isSearching, setIsSearching] = useState(false);
  const [isMovingMap, setIsMovingMap] = useState(false);
  const [currentMapLocation, setCurrentMapLocation] = useState(null);

  useEffect(() => {
    // Initialize states from URL params
    const { query } = router;
    setSearchQuery(query.search || "");
    setCurrentPage(parseInt(query.page) || 1);
    setFilters(prev => ({
      ...prev,
      minPrice: query.minPrice || "",
      maxPrice: query.maxPrice || "",
      minArea: query.minArea || "",
      maxArea: query.maxArea || "",
      flatTypes: query.flatTypes ? 
        (Array.isArray(query.flatTypes) ? query.flatTypes : [query.flatTypes]) : 
        [],
      towns: query.towns ? 
        (Array.isArray(query.towns) ? query.towns : [query.towns]) : 
        [],
      sortBy: query.sortBy || "price_desc"
    }));
  }, [router.isReady]);


  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setIsSearching(true);
        const searchParams = {
          query_type: "hdb",
          page: currentPage,
          page_size: ITEMS_PER_PAGE,
          search: searchQuery,
          ...filters
        };
  
        const response = await axios.post('http://localhost:8000/api/search/', searchParams);
  
        if (response.data.results) {
          // Geocode properties and store coordinates
          const geocodedProperties = await Promise.all(response.data.results.map(async (property) => {
            if (!property.coordinates) {
              try {
                const geocodeResponse = await axios.get(
                  `https://maps.googleapis.com/maps/api/geocode/json`,
                  {
                    params: {
                      address: `${property.street_name}, Singapore`,
                      key: 'AIzaSyDMr6Hck0M4zUmc-lwWcGDE1pdze6DU_sI',
                    },
                  }
                );
  
                if (geocodeResponse.data.results.length > 0) {
                  const { lat, lng } = geocodeResponse.data.results[0].geometry.location;
                  return {
                    ...property,
                    coordinates: { lat, lng }
                  };
                }
              } catch (error) {
                console.error(`Error geocoding property at ${property.street_name}:`, error);
              }
            }
            return property;
          }));
  
          setProperties(geocodedProperties);
          setTotalPages(Math.ceil(response.data.total / ITEMS_PER_PAGE));
          setTotal(response.data.total);
  
          // Move map to first result if exists
          if (geocodedProperties.length > 0) {
            setCurrentMapLocation(geocodedProperties[0].coordinates);
            if (mapRef.current) {
              mapRef.current.panTo(geocodedProperties[0].coordinates);
              mapRef.current.setZoom(15);
            }
          }
        }
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError("Failed to fetch properties. Please try again.");
      } finally {
        setIsSearching(false);
        setLoading(false);
      }
    };
  
    if (router.isReady) {
      fetchProperties();
    }
  }, [router.query, currentPage, searchQuery, filters]);
  

  // Update URL with current search params
  const updateSearchParams = (newParams) => {
    const updatedQuery = {
      ...router.query,
      ...newParams
    };

    // Remove empty params
    Object.keys(updatedQuery).forEach(key => {
      if (!updatedQuery[key] || 
          (Array.isArray(updatedQuery[key]) && updatedQuery[key].length === 0)) {
        delete updatedQuery[key];
      }
    });

    router.push({
      pathname: router.pathname,
      query: updatedQuery
    }, undefined, { shallow: true });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page
    updateSearchParams({ 
      search: searchQuery,
      page: 1
    });
  };

  const handleFilterChange = (filterName, value) => {
    const updatedFilters = {
      ...filters,
      [filterName]: value
    };
    setFilters(updatedFilters);
    setCurrentPage(1);
    updateSearchParams({ 
      ...updatedFilters,
      page: 1
    });
  };

  const handleRemoveFilter = (filterName, value) => {
    let updatedValues;
    if (Array.isArray(filters[filterName])) {
      updatedValues = filters[filterName].filter(v => v !== value);
    } else {
      updatedValues = "";
    }
    handleFilterChange(filterName, updatedValues);
  };
  

  const moveToLocation = async (location) => {
    try {
      setIsMovingMap(true);
      console.log(location);
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json`,
        {
          params: {
            address: `${location}, Singapore`,
            key: 'AIzaSyDMr6Hck0M4zUmc-lwWcGDE1pdze6DU_sI',
          },
        }
      );

      if (response.data.results.length > 0) {
        const { lat, lng } = response.data.results[0].geometry.location;
        setCurrentMapLocation({ lat, lng });
        if (mapRef.current) {
          mapRef.current.panTo({ lat, lng });
          mapRef.current.setZoom(15);
        }
      }
    } catch (error) {
      console.error("Error moving map:", error);
    } finally {
      setIsMovingMap(false);
    }
  };

  const handleShowModal = (property) => {
    setSelectedProperty(property);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProperty(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    updateSearchParams({ page });
    window.scrollTo(0, 0);
  };

  return (
    <div className={styles.container}>
      <Layout />
      
      {/* Header with Search */}
      <header className={styles.header}>
        <div className={styles.searchBar}>
          <Link href="/">
            <button className="btn">
              <Image src="/images/home_btn.png" alt="Home" width={24} height={24} />
            </button>
          </Link>
          
          <form onSubmit={handleSearch} className="d-flex col-6">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by location, street name..."
              className={styles.input}
            />
            <button type="submit" className="btn btn-outline-primary" disabled={isSearching}>
              {isSearching ? (
                <span className="spinner-border spinner-border-sm" />
              ) : (
                <Image src="/images/search_btn.png" alt="Search" width={24} height={24} />
              )}
            </button>
          </form>
          
          <Button 
            variant={showFilters ? "primary" : "outline-primary"}
            onClick={() => setShowFilters(!showFilters)}
          >
            Filters {filters.flatTypes.length + (filters.towns.length ? 1 : 0) + 
              (filters.minPrice || filters.maxPrice ? 1 : 0) + 
              (filters.minArea || filters.maxArea ? 1 : 0) > 0 && 
              `(${filters.flatTypes.length + (filters.towns.length ? 1 : 0) + 
                (filters.minPrice || filters.maxPrice ? 1 : 0) + 
                (filters.minArea || filters.maxArea ? 1 : 0)})`
            }
          </Button>
        </div>

        {/* Active Filters Tags */}
        {(filters.flatTypes.length > 0 || filters.towns.length > 0 || 
          filters.minPrice || filters.maxPrice || filters.minArea || filters.maxArea) && (
          <div className={styles.filterTags}>
            {filters.minPrice || filters.maxPrice ? (
              <span className={styles.filterTag}>
                Price: ${filters.minPrice || '0'} - ${filters.maxPrice || '∞'}
                <button onClick={() => {
                  handleFilterChange('minPrice', '');
                  handleFilterChange('maxPrice', '');
                }}>
                  <X size={16} />
                </button>
              </span>
            ) : null}

            {filters.minArea || filters.maxArea ? (
              <span className={styles.filterTag}>
                Area: {filters.minArea || '0'} - {filters.maxArea || '∞'} sqm
                <button onClick={() => {
                  handleFilterChange('minArea', '');
                  handleFilterChange('maxArea', '');
                }}>
                  <X size={16} />
                </button>
              </span>
            ) : null}

            {filters.flatTypes.map(type => (
              <span key={type} className={styles.filterTag}>
                {type}
                <button onClick={() => handleRemoveFilter('flatTypes', type)}>
                  <X size={16} />
                </button>
              </span>
            ))}

            {filters.towns.map(town => (
              <span key={town} className={styles.filterTag}>
                {town}
                <button onClick={() => handleRemoveFilter('towns', town)}>
                  <X size={16} />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Filters Panel */}
        {showFilters && (
          <div className={styles.filtersPanel}>
            <Form className="row g-3">
              <Form.Group className="col-md-6">
                <Form.Label>Price Range</Form.Label>
                <div className="d-flex gap-2">
                  <Form.Control
                    type="number"
                    placeholder="Min Price"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  />
                  <Form.Control
                    type="number"
                    placeholder="Max Price"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  />
                </div>
              </Form.Group>

              <Form.Group className="col-md-6">
                <Form.Label>Area (sqm)</Form.Label>
                <div className="d-flex gap-2">
                  <Form.Control
                    type="number"
                    placeholder="Min Area"
                    value={filters.minArea}
                    onChange={(e) => handleFilterChange('minArea', e.target.value)}
                  />
                  <Form.Control
                    type="number"
                    placeholder="Max Area"
                    value={filters.maxArea}
                    onChange={(e) => handleFilterChange('maxArea', e.target.value)}
                  />
                </div>
              </Form.Group>

              <Form.Group className="col-md-6">
                <Form.Label>Flat Type</Form.Label>
                <Form.Select
                  multiple
                  value={filters.flatTypes}
                  onChange={(e) => handleFilterChange('flatTypes', 
                    Array.from(e.target.selectedOptions, option => option.value)
                  )}
                >
                  <option value="2 ROOM">2 ROOM</option>
                  <option value="3 ROOM">3 ROOM</option>
                  <option value="4 ROOM">4 ROOM</option>
                  <option value="5 ROOM">5 ROOM</option>
                  <option value="EXECUTIVE">EXECUTIVE</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="col-md-6">
                <Form.Label>Town</Form.Label>
                <Form.Select
                  multiple
                  value={filters.towns}
                  onChange={(e) => handleFilterChange('towns', 
                    Array.from(e.target.selectedOptions, option => option.value)
                  )}
                >
                  <option value="ANG MO KIO">ANG MO KIO</option>
                  <option value="BEDOK">BEDOK</option>
                  <option value="BISHAN">BISHAN</option>
                  <option value="BUKIT BATOK">BUKIT BATOK</option>
                  <option value="BUKIT MERAH">BUKIT MERAH</option>
                  <option value="BUKIT PANJANG">BUKIT PANJANG</option>
                  <option value="BUKIT TIMAH">BUKIT TIMAH</option>
                  <option value="CENTRAL AREA">CENTRAL AREA</option>
                  <option value="CHOA CHU KANG">CHOA CHU KANG</option>
                  <option value="CLEMENTI">CLEMENTI</option>
                  <option value="GEYLANG">GEYLANG</option>
                  <option value="HOUGANG">HOUGANG</option>
                  <option value="JURONG EAST">JURONG EAST</option>
                  <option value="JURONG WEST">JURONG WEST</option>
                  <option value="KALLANG/WHAMPOA">KALLANG/WHAMPOA</option>
                  <option value="MARINE PARADE">MARINE PARADE</option>
                  <option value="PASIR RIS">PASIR RIS</option>
                  <option value="PUNGGOL">PUNGGOL</option>
                  <option value="QUEENSTOWN">QUEENSTOWN</option>
                  <option value="SEMBAWANG">SEMBAWANG</option>
                  <option value="SENGKANG">SENGKANG</option>
                  <option value="SERANGOON">SERANGOON</option>
                  <option value="TAMPINES">TAMPINES</option>
                  <option value="TOA PAYOH">TOA PAYOH</option>
                  <option value="WOODLANDS">WOODLANDS</option>
                  <option value="YISHUN">YISHUN</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="col-12">
                <Form.Label>Sort By</Form.Label>
                <Form.Select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                >
                  <option value="price_desc">Price (High to Low)</option>
                  <option value="price_asc">Price (Low to High)</option>
                  <option value="area_desc">Area (Large to Small)</option>
                  <option value="area_asc">Area (Small to Large)</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        {/* Property List Section */}
        <section className={styles.housingList}>
          {/* Loading State */}
          {loading ? (
            <div className={styles.loadingOverlay}>
              <div className={styles.spinner}></div>
            </div>
          ) : error ? (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          ) : properties.length === 0 ? (
            <div className="text-center py-5">
              <h3>No properties found</h3>
              <p>Try adjusting your search criteria</p>
            </div>
          ) : (
            <>
              <h1>Properties Found ({total})</h1>
              
              <div className={styles.propertyList}>
                {properties.map((property) => (
                  <div 
                    className={styles.propertyCard} 
                    key={property.id}
                  >
                    <Image
                      src={property.image || "/images/property.jpg"}
                      alt={property.street_name}
                      width={300}
                      height={200}
                      className={styles.propertyImage}
                      onClick={() => handleShowModal(property)}
                    />
                    <div className={styles.propertyDetails}>
                      <h4>{property.street_name}</h4>
                      <p className="text-primary fw-bold">
                        ${property.resale_price?.toLocaleString()}
                      </p>
                      <p>
                        {property.floor_area_sqm} sqm | {property.flat_type}
                      </p>
                      <p>{property.town}</p>
                      <div className="d-flex justify-content-between align-items-center mt-2">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => moveToLocation(property.street_name)}
                          disabled={isMovingMap}
                        >
                          {isMovingMap ? (
                            <span className="spinner-border spinner-border-sm" />
                          ) : (
                            'View on Map'
                          )}
                        </Button>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleShowModal(property)}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className={styles.pagination}>
                  <Button
                    variant="outline-primary"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    Previous
                  </Button>
                  
                  {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
                    // Show first page, last page, current page and 1 page before and after current
                    if (
                      pageNumber === 1 ||
                      pageNumber === totalPages ||
                      (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                    ) {
                      return (
                        <Button
                          key={pageNumber}
                          variant={currentPage === pageNumber ? "primary" : "outline-primary"}
                          onClick={() => handlePageChange(pageNumber)}
                        >
                          {pageNumber}
                        </Button>
                      );
                    } else if (
                      pageNumber === currentPage - 2 ||
                      pageNumber === currentPage + 2
                    ) {
                      return <span key={pageNumber}>...</span>;
                    }
                    return null;
                  })}
                  
                  <Button
                    variant="outline-primary"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </section>

      {/* Map Section */}
      <section className={styles.mapSection}>
        <Map
          ref={mapRef}
          googleMapsApiKey={'AIzaSyDMr6Hck0M4zUmc-lwWcGDE1pdze6DU_sI'}
          initialLocation={currentMapLocation}
          properties={properties}
          onMarkerClick={handleMarkerClick} // Pass the function to Map component
        />
      </section>
      </main>

      {/* Property Details Modal */}
      <Modal 
        show={showModal} 
        onHide={handleCloseModal} 
        size="lg" 
        centered
        className={styles.modal}
      >
        <Modal.Header closeButton>
          <Modal.Title>{selectedProperty?.street_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProperty && (
            <div className={styles.modalContent}>
              <Image
                src={selectedProperty.image || "/images/property.jpg"}
                alt={selectedProperty.street_name}
                width={800}
                height={400}
                className={styles.modalImage}
              />
              
              <div className={styles.modalDetails}>
                <div className={styles.modalDetail}>
                  <strong>Town:</strong> {selectedProperty.town}
                </div>
                <div className={styles.modalDetail}>
                  <strong>Flat Type:</strong> {selectedProperty.flat_type}
                </div>
                <div className={styles.modalDetail}>
                  <strong>Floor Area:</strong> {selectedProperty.floor_area_sqm} sqm
                </div>
                <div className={styles.modalDetail}>
                  <strong>Price:</strong> ${selectedProperty.resale_price?.toLocaleString()}
                </div>
                <div className={styles.modalDetail}>
                  <strong>Storey Range:</strong> {selectedProperty.storey_range}
                </div>
                <div className={styles.modalDetail}>
                  <strong>Flat Model:</strong> {selectedProperty.flat_model}
                </div>
                <div className={styles.modalDetail}>
                  <strong>Lease Started:</strong> {selectedProperty.lease_commence_date}
                </div>
                <div className={styles.modalDetail}>
                  <strong>Remaining Lease:</strong> {selectedProperty.remaining_lease}
                </div>
              </div>

              <div className="mt-4">
                <Button
                  variant="primary"
                  onClick={() => moveToLocation(selectedProperty.street_name)}
                  className="w-100"
                >
                  View Location on Map
                </Button>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Search;
