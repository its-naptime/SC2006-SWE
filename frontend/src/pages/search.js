// pages/search.js
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { X } from "lucide-react";
import Map from "../components/Map";
import styles from "../styles/Search.module.css";
import {
  HDBFilters,
  SchoolFilters,
  PreschoolFilters,
} from "../components/Filters";
import {
  HDBCard,
  SchoolCard,
  PreschoolCard,
} from "../components/SearchResults";
import { DetailModal } from "../components/DetailModal";
import { useAuth } from '../AuthContext';
import api from '../Api';

const ITEMS_PER_PAGE = 8;
const NEARBY_RADIUS = 2; // in kilometers
const Search = () => {
  const router = useRouter();
  const mapRef = useRef(null);
  const { isAuthenticated } = useAuth();

  // Primary State Management
  const [searchType, setSearchType] = useState("hdb");
  const [primaryResults, setPrimaryResults] = useState([]);
  const [nearbyResults, setNearbyResults] = useState({
    schools: [],
    preschools: [],
    hdb: [],
  });
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentViewMarkers, setCurrentViewMarkers] = useState([]);

  // Loading States
  const [loading, setLoading] = useState({
    primary: true,
    nearby: false,
  });
  const [isMovingMap, setIsMovingMap] = useState(false);
  const [isLoadingMarkers, setIsLoadingMarkers] = useState(false);

  // Error State
  const [error, setError] = useState(null);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);

  // UI States
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentMapLocation, setCurrentMapLocation] = useState(null);

  // Save State
  const [savedItems, setSavedItems] = useState({
    hdb: [],
    school: [],
    preschool: []
  });

  // Filter States
  const [filters, setFilters] = useState({
    // HDB filters
    minPrice: "",
    maxPrice: "",
    minArea: "",
    maxArea: "",
    flatTypes: [],
    towns: [],
    sortBy: "-resale_price",

    // School filters
    zones: [],
    mainlevel: "",
    schoolTypes: [],
    cca: "",
    sap: false,
    gifted: false,
    ip: false,

    // Preschool filters
    postalCodes: [],
    level: "",
    serviceModels: [],
    sparkCertified: false,
    transportRequired: false,
  });
  // Initialize states from URL params
  useEffect(() => {
    if (router.isReady) {
      const { query } = router;
      setSearchQuery(query.search || "");
      setSearchType(query.searchType || "hdb");
      setCurrentPage(parseInt(query.page) || 1);
      initializeFilters(query);
    }
  }, [router.isReady]);

  useEffect(() => {
    if (isAuthenticated){
      fetchSavedItems();
    }
  }, []);

  // Fetch saved items when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchSavedItems();
    }
  }, [isAuthenticated]);

  // Primary results fetching
  useEffect(() => {
    const fetchResults = async () => {
      if (!router.isReady) return;

      try {
        setLoading((prev) => ({ ...prev, primary: true }));
        setError(null);

        const searchParams = {
          query_type: searchType,
          page: currentPage,
          page_size: ITEMS_PER_PAGE,
          search: searchQuery,
          ...getTypeSpecificParams(),
        };

        const response = await axios.post(
          `http://localhost:8000/api/search/`,
          searchParams
        );

        if (response.data.results) {
          setPrimaryResults(response.data.results);
          setTotalPages(Math.ceil(response.data.total / ITEMS_PER_PAGE));
          setTotal(response.data.total);
        }
      } catch (err) {
        console.error("Error fetching results:", err);
        setError("Failed to fetch results. Please try again.");
      } finally {
        setLoading((prev) => ({ ...prev, primary: false }));
      }
    };

    fetchResults();
  }, [
    router.query,
    currentPage,
    searchQuery,
    filters,
    searchType,
    router.isReady,
  ]);

    // Map and Location Functions
    const fetchNearbyItemsData = async (
      latitude,
      longitude,
      primaryType,
      primaryId
    ) => {
      const fetchForType = async (type) => {
        try {
          const response = await axios.post(
            `http://localhost:8000/api/search/nearby/`,
            {
              latitude: parseFloat(latitude),
              longitude: parseFloat(longitude),
              radius: NEARBY_RADIUS,
              exclude_id: primaryId,
              type,
            }
          );
          return response.data.results;
        } catch (error) {
          console.error(`Error fetching nearby ${type}:`, error);
          return [];
        }
      };
  
      if (primaryType === "hdb") {
        const [schools, preschools] = await Promise.all([
          fetchForType("school"),
          fetchForType("preschool"),
        ]);
        return { schools, preschools, hdb: [] };
      } else {
        const hdb = await fetchForType("hdb");
        return { schools: [], preschools: [], hdb };
      }
    };
  
  // Helper Functions
  const initializeFilters = (query) => {
    const newFilters = { ...filters };

    if (query.searchType === "hdb" || !query.searchType) {
      newFilters.minPrice = query.minPrice || "";
      newFilters.maxPrice = query.maxPrice || "";
      newFilters.minArea = query.minArea || "";
      newFilters.maxArea = query.maxArea || "";
      newFilters.flatTypes = query.flatTypes
        ? Array.isArray(query.flatTypes)
          ? query.flatTypes
          : [query.flatTypes]
        : [];
      newFilters.towns = query.towns
        ? Array.isArray(query.towns)
          ? query.towns
          : [query.towns]
        : [];
      newFilters.sortBy = query.sortBy || "-resale_price";
    } else if (query.searchType === "school") {
      // ... school filter initialization
      newFilters.zones = query.zones
        ? Array.isArray(query.zones)
          ? query.zones
          : [query.zones]
        : [];
      newFilters.mainlevel = query.mainlevel || "";
      newFilters.schoolTypes = query.schoolTypes
        ? Array.isArray(query.schoolTypes)
          ? query.schoolTypes
          : [query.schoolTypes]
        : [];
      newFilters.cca = query.cca || "";
      newFilters.sap = query.sap === "true";
      newFilters.gifted = query.gifted === "true";
      newFilters.ip = query.ip === "true";
    } else if (query.searchType === "preschool") {
      // ... preschool filter initialization
      newFilters.postalCodes = query.postalCodes
        ? Array.isArray(query.postalCodes)
          ? query.postalCodes
          : [query.postalCodes]
        : [];
      newFilters.level = query.level || "";
      newFilters.serviceModels = query.serviceModels
        ? Array.isArray(query.serviceModels)
          ? query.serviceModels
          : [query.serviceModels]
        : [];
      newFilters.sparkCertified = query.sparkCertified === "true";
      newFilters.transportRequired = query.transportRequired === "true";
    }
    setFilters(newFilters);
  };

  const getTypeSpecificParams = () => {
    switch (searchType) {
      case "hdb":
        return {
          minPrice: filters.minPrice,
          maxPrice: filters.maxPrice,
          minArea: filters.minArea,
          maxArea: filters.maxArea,
          flatTypes: filters.flatTypes,
          towns: filters.towns,
          sortBy: filters.sortBy,
        };
      case "school":
        return {
          zones: filters.zones,
          mainlevel: filters.mainlevel,
          types: filters.schoolTypes,
          cca: filters.cca,
          sap: filters.sap,
          gifted: filters.gifted,
          ip: filters.ip,
        };
      case "preschool":
        return {
          postal_codes: filters.postalCodes,
          level: filters.level,
          service_models: filters.serviceModels,
          spark_certified: filters.sparkCertified,
          transport_required: filters.transportRequired,
        };
      default:
        return {};
    }
  };

  // Save Functionality
  const handleToggleSave = async (item) => {
    if (!isAuthenticated) {
      return;
    }

    try {
      const typeMap = {
        'hdb': 'hdbs',
        'school': 'schools',
        'preschool': 'preschools'
      };
      
      const type = typeMap[searchType];
      const idField = `${searchType}_id`;
      
      // Use the toggle_save endpoint
      const response = await api.post(`/api/catalogue/saved-${type}/toggle_save/`, {
        [idField]: item.id
      });

      if (response.data.status === 'removed') {
        setSavedItems(prev => ({
          ...prev,
          [searchType]: prev[searchType].filter(id => id !== item.id)
        }));
      } else if (response.data.status === 'saved') {
        setSavedItems(prev => ({
          ...prev,
          [searchType]: [...prev[searchType], item.id]
        }));
      }
    } catch (error) {
      console.error('Error toggling save:', error);
    }
  };

  // Update the fetchSavedItems function as well
  const fetchSavedItems = async () => {
    if (!isAuthenticated) return;

    try {
      const [hdbResponse, schoolsResponse, preschoolsResponse] = await Promise.all([
        api.get('/api/catalogue/saved-hdbs/'),
        api.get('/api/catalogue/saved-schools/'),
        api.get('/api/catalogue/saved-preschools/')
      ]);

      setSavedItems({
        hdb: hdbResponse.data.map(item => item.hdb.id),
        school: schoolsResponse.data.map(item => item.school.id),
        preschool: preschoolsResponse.data.map(item => item.preschool.id)
      });
    } catch (error) {
      console.error('Error fetching saved items:', error);
    }
  };

  const isItemSaved = (itemId) => {
    return savedItems[searchType]?.includes(itemId) || false;
  };

  // Event Handlers
  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    updateSearchParams({
      search: searchQuery,
      page: 1,
    });
  };

  const handleFilterChange = (filterName, value) => {
    const updatedFilters = {
      ...filters,
      [filterName]: value,
    };
    setFilters(updatedFilters);
    setCurrentPage(1);
    updateSearchParams({
      ...getTypeSpecificParams(),
      page: 1,
    });
  };

  const handleRemoveFilter = (filterName, value) => {
    let updatedValues;
    if (Array.isArray(filters[filterName])) {
      updatedValues = filters[filterName].filter((v) => v !== value);
    } else {
      updatedValues = "";
    }
    handleFilterChange(filterName, updatedValues);
  };

  const handleSearchTypeChange = (type) => {
    setSearchType(type);
    setCurrentPage(1);
    setCurrentViewMarkers([]);
    setNearbyResults({ schools: [], preschools: [], hdb: [] });
    
    // Reset filters
    setFilters({
      ...filters,
      ...(type === "hdb"
        ? {
            minPrice: "",
            maxPrice: "",
            minArea: "",
            maxArea: "",
            flatTypes: [],
            towns: [],
            sortBy: "-resale_price",
          }
        : type === "school"
        ? {
            zones: [],
            mainlevel: "",
            schoolTypes: [],
            cca: "",
            sap: false,
            gifted: false,
            ip: false,
          }
        : {
            postalCodes: [],
            level: "",
            serviceModels: [],
            sparkCertified: false,
            transportRequired: false,
          }),
    });

    const baseParams = {
      searchType: type,
      page: 1,
      search: searchQuery,
    };

    router.push(
      {
        pathname: router.pathname,
        query: baseParams,
      },
      undefined,
      { shallow: true }
    );
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    updateSearchParams({ page });
    window.scrollTo(0, 0);
  };

  const handleShowModal = async (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  const handleViewMap = async (item, itemType = null) => {
    try {
      setIsMovingMap(true);
      setIsLoadingMarkers(true);
  
      setCurrentViewMarkers([]);
      setNearbyResults({
        schools: [],
        preschools: [],
        hdb: [],
      });
  
      if (showModal) {
        handleCloseModal();
      }
  
      // Use the passed itemType or fall back to searchType
      const currentType = itemType || searchType;
  
      const location = {
        lat: parseFloat(item.latitude),
        lng: parseFloat(item.longitude),
      };
  
      if (mapRef.current) {
        mapRef.current.panTo(location);
        mapRef.current.setZoom(15);
      }
  
      const nearbyData = await fetchNearbyItemsData(
        location.lat,
        location.lng,
        currentType,  // Use currentType instead of searchType
        item.id
      );
  
      setNearbyResults(nearbyData);
  
      // Pass the correct type to createMarkersFromData
      const markers = createMarkersFromData(item, nearbyData, currentType);
      setCurrentViewMarkers(markers);
  
      if (mapRef.current && markers.length > 1) {
        const bounds = new google.maps.LatLngBounds();
        markers.forEach((marker) => bounds.extend(marker.location));
        mapRef.current.fitBounds(bounds);
  
        google.maps.event.addListenerOnce(
          mapRef.current,
          "bounds_changed",
          () => {
            if (mapRef.current.getZoom() > 16) {
              mapRef.current.setZoom(16);
            }
          }
        );
      }
  
      setCurrentMapLocation(location);
    } catch (error) {
      console.error("Error in handleViewMap:", error);
      setError("Failed to update map view");
    } finally {
      setIsMovingMap(false);
      setIsLoadingMarkers(false);
    }
  };
  
  // Update createMarkersFromData to use the passed type
  const createMarkersFromData = (mainItem, nearbyData, mainType) => {
    // Create main marker with the correct type
    const mainMarker = {
      location: {
        lat: parseFloat(mainItem.latitude),
        lng: parseFloat(mainItem.longitude),
      },
      title:
        mainItem.street_name || mainItem.school_name || mainItem.centre_name,
      type: mainType, // Use passed type instead of searchType
      isMain: true,
    };
  
    // Create nearby markers
    let nearbyMarkers = [];
  
    if (mainType === "hdb") {
      nearbyMarkers = [
        ...nearbyData.schools.map((school) => ({
          location: {
            lat: parseFloat(school.latitude),
            lng: parseFloat(school.longitude),
          },
          title: school.school_name,
          type: "school", // Explicitly set type
          distance: school.distance,
        })),
        ...nearbyData.preschools.map((preschool) => ({
          location: {
            lat: parseFloat(preschool.latitude),
            lng: parseFloat(preschool.longitude),
          },
          title: preschool.centre_name,
          type: "preschool", // Explicitly set type
          distance: preschool.distance,
        })),
      ];
    } else {
      nearbyMarkers = nearbyData.hdb.map((hdb) => ({
        location: {
          lat: parseFloat(hdb.latitude),
          lng: parseFloat(hdb.longitude),
        },
        title: `${hdb.block} ${hdb.street_name}`,
        type: "hdb", // Explicitly set type
        distance: hdb.distance,
      }));
    }
  
    return [mainMarker, ...nearbyMarkers];
  };

  const updateSearchParams = (newParams) => {
    const updatedQuery = {
      ...router.query,
      ...newParams,
    };

    Object.keys(updatedQuery).forEach((key) => {
      if (
        !updatedQuery[key] ||
        (Array.isArray(updatedQuery[key]) && updatedQuery[key].length === 0)
      ) {
        delete updatedQuery[key];
      }
    });

    router.push(
      {
        pathname: router.pathname,
        query: updatedQuery,
      },
      undefined,
      { shallow: true }
    );
  };

  const renderActiveFilters = () => {
    const activeFilters = [];

    if (searchType === "hdb") {
      if (filters.minPrice || filters.maxPrice) {
        activeFilters.push({
          label: `Price: $${filters.minPrice || "0"} - $${
            filters.maxPrice || "∞"
          }`,
          onRemove: () => {
            handleFilterChange("minPrice", "");
            handleFilterChange("maxPrice", "");
          },
        });
      }
      if (filters.minArea || filters.maxArea) {
        activeFilters.push({
          label: `Area: ${filters.minArea || "0"} - ${
            filters.maxArea || "∞"
          } sqm`,
          onRemove: () => {
            handleFilterChange("minArea", "");
            handleFilterChange("maxArea", "");
          },
        });
      }
      filters.flatTypes.forEach((type) => {
        activeFilters.push({
          label: type,
          onRemove: () => handleRemoveFilter("flatTypes", type),
        });
      });
      filters.towns.forEach((town) => {
        activeFilters.push({
          label: town,
          onRemove: () => handleRemoveFilter("towns", town),
        });
      });
    } else if (searchType === "school") {
      if (filters.mainlevel) {
        activeFilters.push({
          label: `Level: ${filters.mainlevel}`,
          onRemove: () => handleFilterChange("mainlevel", ""),
        });
      }
      filters.zones.forEach((zone) => {
        activeFilters.push({
          label: `Zone: ${zone}`,
          onRemove: () => handleRemoveFilter("zones", zone),
        });
      });
      if (filters.cca) {
        activeFilters.push({
          label: `CCA: ${filters.cca}`,
          onRemove: () => handleFilterChange("cca", ""),
        });
      }
      if (filters.sap)
        activeFilters.push({
          label: "SAP School",
          onRemove: () => handleFilterChange("sap", false),
        });
      if (filters.gifted)
        activeFilters.push({
          label: "Gifted Program",
          onRemove: () => handleFilterChange("gifted", false),
        });
      if (filters.ip)
        activeFilters.push({
          label: "IP School",
          onRemove: () => handleFilterChange("ip", false),
        });
    } else {
      if (filters.level) {
        activeFilters.push({
          label: `Level: ${filters.level}`,
          onRemove: () => handleFilterChange("level", ""),
        });
      }
      filters.serviceModels.forEach((model) => {
        activeFilters.push({
          label: model,
          onRemove: () => handleRemoveFilter("serviceModels", model),
        });
      });
      if (filters.sparkCertified)
        activeFilters.push({
          label: "SPARK Certified",
          onRemove: () => handleFilterChange("sparkCertified", false),
        });
      if (filters.transportRequired)
        activeFilters.push({
          label: "Transport Available",
          onRemove: () => handleFilterChange("transportRequired", false),
        });
    }

    return activeFilters;
  };
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.searchBar}>
          <Link href="/">
            <button className="btn">
              <Image
                src="/images/home_btn.png"
                alt="Home"
                width={24}
                height={24}
              />
            </button>
          </Link>

          <form onSubmit={handleSearch} className="d-flex col-6">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${searchType}s...`}
              className={styles.input}
            />
            <button
              type="submit"
              className="btn btn-outline-primary"
              disabled={loading.primary}
            >
              {loading.primary ? (
                <span className="spinner-border spinner-border-sm" />
              ) : (
                <Image
                  src="/images/search_btn.png"
                  alt="Search"
                  width={24}
                  height={24}
                />
              )}
            </button>
          </form>

          <Button
            variant={showFilters ? "primary" : "outline-primary"}
            onClick={() => setShowFilters(!showFilters)}
          >
            Filters{" "}
            {renderActiveFilters().length > 0 &&
              `(${renderActiveFilters().length})`}
          </Button>
        </div>

        <div className="d-flex justify-content-evenly w-25">
          <div>
            <p className="px-2">Sort:</p>
          </div>
          <div className="mx-2">
            <Button className="px-4"
              variant={searchType === "hdb" ? "primary" : "outline-primary"}
              onClick={() => handleSearchTypeChange("hdb")}
            >
              HDB
            </Button>
          </div>
          <div className="mx-2">
            <Button
              variant={searchType === "school" ? "primary" : "outline-primary"}
              onClick={() => handleSearchTypeChange("school")}
            >
              Schools
            </Button>
          </div>
          <div className="mx-2">
            <Button
              variant={searchType === "preschool" ? "primary" : "outline-primary"}
              onClick={() => handleSearchTypeChange("preschool")}
            >
              Preschools
            </Button>
          </div>
        </div>

        {renderActiveFilters().length > 0 && (
          <div className={styles.filterTags}>
            {renderActiveFilters().map((filter, index) => (
              <span key={index} className={styles.filterTag}>
                {filter.label}
                <button onClick={filter.onRemove}>
                  <X size={16} />
                </button>
              </span>
            ))}
          </div>
        )}

        {showFilters && (
          <div className={styles.filtersPanel}>
            {searchType === "hdb" && (
              <HDBFilters
                filters={filters}
                onFilterChange={handleFilterChange}
              />
            )}
            {searchType === "school" && (
              <SchoolFilters
                filters={filters}
                onFilterChange={handleFilterChange}
              />
            )}
            {searchType === "preschool" && (
              <PreschoolFilters
                filters={filters}
                onFilterChange={handleFilterChange}
              />
            )}
          </div>
        )}
      </header>

      <main className={styles.main}>
        <section className={styles.resultsList}>
          {error ? (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          ) : primaryResults.length === 0 ? (
            <div className="text-center py-5">
              <h3>No results found</h3>
              <p>Try adjusting your search criteria</p>
            </div>
          ) : (
            <>
              <h2>
                {searchType.toUpperCase()} Results ({total})
              </h2>

              <div
                className={`${styles.resultGrid} ${
                  loading.primary ? styles.loading : ""
                }`}
              >
                {primaryResults.map((item) => {
                  switch (searchType) {
                    case "hdb":
                      return (
                        <HDBCard
                          key={item.id}
                          property={item}
                          onViewMap={handleViewMap}
                          onViewDetails={handleShowModal}
                          isMovingMap={isMovingMap}
                          isSaved={isItemSaved(item.id)}
                          onToggleSave={handleToggleSave}
                        />
                      );
                    case "school":
                      return (
                        <SchoolCard
                          key={item.id}
                          school={item}
                          onViewMap={handleViewMap}
                          onViewDetails={handleShowModal}
                          isMovingMap={isMovingMap}
                          isSaved={isItemSaved(item.id)}
                          onToggleSave={handleToggleSave}
                        />
                      );
                    case "preschool":
                      return (
                        <PreschoolCard
                          key={item.id}
                          preschool={item}
                          onViewMap={handleViewMap}
                          onViewDetails={handleShowModal}
                          isMovingMap={isMovingMap}
                          isSaved={isItemSaved(item.id)}
                          onToggleSave={handleToggleSave}
                        />
                      );
                  }
                })}
              </div>

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
                    if (
                      pageNumber === 1 ||
                      pageNumber === totalPages ||
                      (pageNumber >= currentPage - 1 &&
                        pageNumber <= currentPage + 1)
                    ) {
                      return (
                        <Button
                          key={pageNumber}
                          variant={
                            currentPage === pageNumber
                              ? "primary"
                              : "outline-primary"
                          }
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

        <section className={styles.mapSection}>
          {isLoadingMarkers && (
            <div className={styles.mapLoadingOverlay}>
              <div className={styles.spinner}></div>
            </div>
          )}
          <Map
            ref={mapRef}
            googleMapsApiKey={process.env.NEXT_PUBLIC_API_KEY}
            initialLocation={currentMapLocation}
            markers={currentViewMarkers}
          />
        </section>
      </main>

      <DetailModal
        show={showModal}
        onHide={handleCloseModal}
        item={selectedItem}
        type={searchType}
        onViewMap={handleViewMap}
        isSaved={selectedItem ? isItemSaved(selectedItem.id) : false}
        onToggleSave={handleToggleSave}
      />
    </div>
  );
};

export default Search;