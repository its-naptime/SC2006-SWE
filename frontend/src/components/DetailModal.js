import React, { useState, useEffect } from "react";
import { Modal, Button, Tabs, Tab } from "react-bootstrap";
import Image from "next/image";
import axios from "axios";
import { DetailContent } from "./DetailContent";
import styles from "../styles/Search.module.css";

export const DetailModal = ({ show, onHide, item, type, onViewMap }) => {
  const [activeTab, setActiveTab] = useState("details");
  const [nearbyItems, setNearbyItems] = useState({
    schools: [],
    preschools: [],
  });
  const [isLoadingNearby, setIsLoadingNearby] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);
  const [placeDetails, setPlaceDetails] = useState(null);

  useEffect(() => {
    if (!show) {
      setActiveTab("details");
      setNearbyItems({
        schools: [],
        preschools: [],
      });
    }
  }, [show]);

  useEffect(() => {
    if (activeTab === "nearby" && item) {
      fetchNearbyItems();
    }
  }, [activeTab, item]);

  const fetchNearbyItems = async () => {
    setIsLoadingNearby(true);

    try {
      if (type === "hdb") {
        // If viewing HDB, fetch both schools and preschools
        const [schoolsResponse, preschoolsResponse] = await Promise.all([
          axios.post("http://localhost:8000/api/search/nearby/", {
            latitude: parseFloat(item.latitude),
            longitude: parseFloat(item.longitude),
            radius: 2,
            exclude_id: item.id,
            type: "school",
          }),
          axios.post("http://localhost:8000/api/search/nearby/", {
            latitude: parseFloat(item.latitude),
            longitude: parseFloat(item.longitude),
            radius: 2,
            exclude_id: item.id,
            type: "preschool",
          }),
        ]);

        setNearbyItems({
          schools: schoolsResponse.data.results || [],
          preschools: preschoolsResponse.data.results || [],
        });
      } else {
        // If viewing school or preschool, fetch HDB
        const response = await axios.post(
          "http://localhost:8000/api/search/nearby/",
          {
            latitude: parseFloat(item.latitude),
            longitude: parseFloat(item.longitude),
            radius: 2,
            exclude_id: item.id,
            type: "hdb",
          }
        );

        setNearbyItems({
          schools: [],
          preschools: [],
          hdb: response.data.results || [],
        });
      }
    } catch (error) {
      console.error("Error fetching nearby items:", error);
    } finally {
      setIsLoadingNearby(false);
    }
  };

  // Fetch place details and reviews
  const fetchPlaceAndReviews = async () => {
    setIsLoadingReviews(true);
    try {
      const [placeResponse, reviewsResponse] = await Promise.all([
        axios.get(`http://localhost:8000/api/place/`, {
          params: { place_id: item.id }, // Adjust as needed
        }),
        axios.get(`http://localhost:8000/api/review/`, {
          params: { place: item.id }, // Adjust as needed
        }),
      ]);

      setPlaceDetails(placeResponse.data[0]); // Assuming response is an array of places
      setReviews(reviewsResponse.data || []);
    } catch (error) {
      console.error("Error fetching place details or reviews:", error);
    } finally {
      setIsLoadingReviews(false);
    }
  };

  useEffect(() => {
    if (activeTab === "reviews" && item && type !== "hdb") {
      fetchPlaceAndReviews();
    }
  }, [activeTab, item, type]);

  // Google Review fetcher
  useEffect(() => {
    if (activeTab === 'reviews' && item && type !== 'hdb') {
      console.log('Fetching reviews for:', item);
      fetchReviews(item.centre_name || item.school_name);
    }
  }, [activeTab, item, type]);

  const fetchReviews = async (locationName) => {
    console.log('Searching for Place ID with place_name:', locationName);
    setIsLoadingReviews(true);
  
    try {
      // Replace with your Google API Key
      const googleApiKey = process.env.NEXT_PUBLIC_API_KEY;
  
      // Step 1: Get the Place ID
      const placeResponse = await axios.get('https://maps.googleapis.com/maps/api/place/findplacefromtext/json', {
        params: {
          input: locationName,
          inputtype: 'textquery',
          fields: 'place_id',
          key: googleApiKey,
        },
      });
  
      if (placeResponse.data.candidates.length > 0) {
        const placeId = placeResponse.data.candidates[0].place_id;
        console.log('Place ID found:', placeId);
  
        // Step 2: Fetch the reviews using the Place ID
        const reviewResponse = await axios.get('https://maps.googleapis.com/maps/api/place/details/json', {
          params: {
            place_id: placeId,
            fields: 'reviews,rating',
            key: process.env.NEXT_PUBLIC_API_KEY,
          },
        });
  
        setReviews(reviewResponse.data.result.reviews || []);
      } else {
        console.warn('No Place ID found for', locationName);
        setReviews([]);
      }
    } catch (error) {
      console.error('Error fetching reviews from Google:', error);
    } finally {
      setIsLoadingReviews(false);
    }
  };
  
  // Google review fetcher

  const handleViewMap = (targetItem) => {
    console.log("View Map clicked:", {
      isMainItem: targetItem === item,
      targetItem,
      mainItem: item,
    });

    if (targetItem === item) {
      // For main item
      const coordinates = {
        ...targetItem,
        latitude: targetItem.results
          ? targetItem.results.latitude
          : targetItem.latitude,
        longitude: targetItem.results
          ? targetItem.results.longitude
          : targetItem.longitude,
      };
      console.log("Using coordinates:", coordinates);
      onViewMap(coordinates);
    } else {
      // For nearby items
      console.log("Using nearby item directly:", targetItem);
      onViewMap(targetItem);
    }
  };

  const renderNearbySchool = (school) => (
    <div
      key={school.id}
      className="p-4 border rounded-lg hover:shadow-lg transition-shadow"
    >
      <div className="flex items-start justify-between">
        <div>
          <h6 className="font-semibold mb-2">{school.school_name}</h6>
          <p>
            {school.type_code} | {school.mainlevel_code}
          </p>
          <div className="flex gap-2 flex-wrap mt-2">
            {school.special_programs?.map((program, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-gray-200 rounded-full text-xs"
              >
                {program}
              </span>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {school.distance.toFixed(2)}km away
          </p>
        </div>
        <Button
          size="sm"
          variant="outline-primary"
          onClick={() => handleViewMap(school)}
        >
          View on Map
        </Button>
      </div>
    </div>
  );

  const renderNearbyPreschool = (preschool) => (
    <div
      key={preschool.id}
      className="p-4 border rounded-lg hover:shadow-lg transition-shadow"
    >
      <div className="flex items-start justify-between">
        <div>
          <h6 className="font-semibold mb-2">{preschool.centre_name}</h6>
          <p>{preschool.service_model}</p>
          <div className="flex gap-2 mt-2">
            {preschool.spark_certified && (
              <span className="px-2 py-1 bg-green-200 rounded-full text-xs">
                SPARK
              </span>
            )}
            {preschool.transport_required && (
              <span className="px-2 py-1 bg-blue-200 rounded-full text-xs">
                Transport
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {preschool.distance.toFixed(2)}km away
          </p>
        </div>
        <Button
          size="sm"
          variant="outline-primary"
          onClick={() => handleViewMap(preschool)}
        >
          View on Map
        </Button>
      </div>
    </div>
  );

  const renderNearbyHDB = (hdb) => (
    <div
      key={hdb.id}
      className="p-4 border rounded-lg hover:shadow-lg transition-shadow"
    >
      <div className="flex items-start justify-between">
        <div>
          <h6 className="font-semibold mb-2">{hdb.street_name}</h6>
          <p className="text-primary font-bold">
            ${hdb.resale_price?.toLocaleString()}
          </p>
          <p>
            {hdb.floor_area_sqm} sqm | {hdb.flat_type}
          </p>
          <p className="text-sm text-gray-600 mt-2">
            {hdb.distance.toFixed(2)}km away
          </p>
        </div>
        <Button
          size="sm"
          variant="outline-primary"
          onClick={() => handleViewMap(hdb)}
        >
          View on Map
        </Button>
      </div>
    </div>
  );

  const renderNearbySection = () => {
    if (isLoadingNearby) {
      return (
        <div className="text-center p-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    }

    if (type === "hdb") {
      // Show schools and preschools for HDB
      const hasNearbyItems =
        nearbyItems.schools.length > 0 || nearbyItems.preschools.length > 0;

      if (!hasNearbyItems) {
        return (
          <div className="text-center text-gray-600 p-4">
            No nearby schools or preschools found within 2km radius
          </div>
        );
      }

      return (
        <div className={styles.nearbyContainer}>
          {nearbyItems.schools.length > 0 && (
            <div className="mb-6">
              <h5 className="mb-3 font-semibold">
                Nearby Schools ({nearbyItems.schools.length})
              </h5>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {nearbyItems.schools.map(renderNearbySchool)}
              </div>
            </div>
          )}

          {nearbyItems.preschools.length > 0 && (
            <div className="mb-6">
              <h5 className="mb-3 font-semibold">
                Nearby Preschools ({nearbyItems.preschools.length})
              </h5>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {nearbyItems.preschools.map(renderNearbyPreschool)}
              </div>
            </div>
          )}
        </div>
      );
    } else {
      // Show HDB for schools and preschools
      if (!nearbyItems.hdb?.length) {
        return (
          <div className="text-center text-gray-600 p-4">
            No nearby HDB properties found within 2km radius
          </div>
        );
      }

      return (
        <div className={styles.nearbyContainer}>
          <div className="mb-6">
            <h5 className="mb-3 font-semibold">
              Nearby HDB Properties ({nearbyItems.hdb.length})
            </h5>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {nearbyItems.hdb.map(renderNearbyHDB)}
            </div>
          </div>
        </div>
      );
    }
  };
  // Google Review fetcher
  const renderReview = (review) => (
    <div key={review.id} className="p-3 border-bottom">
      <div className="d-flex align-items-center mb-2">
        <Image
          src={review.profile_photo_url}
          alt={review.author_name}
          width={32}
          height={32}
          className="rounded-circle"
        />
        <div className="ms-2">
          <a href={review.author_url} target="_blank" rel="noopener noreferrer">
            <strong>{review.author_name}</strong>
          </a>
          <p className="mb-0 text-muted">{review.relative_time_description}</p>
        </div>
      </div>
      <p className="mb-1">{review.text}</p>
      <p className="mb-0"><strong>Rating:</strong> {review.rating} / 5</p>
    </div>
  );

  // Google Review fetcher

  //Dummy review from db
  /*
  const renderReview = (review) => (
    <div key={review.id} className="p-3 border-bottom">
      <div className="d-flex align-items-center mb-2">
        <div className="ms-2">
          <a href={review.author_url} target="_blank" rel="noopener noreferrer">
            <strong>{review.author_name}</strong>
          </a>
          <p className="mb-0 text-muted">{review.relative_time_description}</p>
        </div>
      </div>
      <p className="mb-1">{review.text}</p>
      <p className="mb-0"><strong>Rating:</strong> {review.rating} / 5</p>
    </div>
  );
  const renderPlaceDetails = () => (
    <div className="p-3">
    <h5>Place Details</h5>
    <p><strong>Name:</strong> {placeDetails?.name}</p>
    <p><strong>Rating:</strong> {placeDetails?.rating} / 5</p>
    </div>
  );
  */

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
      className={styles.modal}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {type === "hdb"
            ? item?.street_name
            : type === "school"
            ? item?.school_name
            : item?.centre_name}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="p-0">
        <Tabs activeKey={activeTab} onSelect={setActiveTab} className="mb-3">
          <Tab eventKey="details" title="Details">
            <div className="p-4">
              <Image
                src={item?.image || `/images/${type}.jpg`}
                alt={
                  type === "hdb"
                    ? item?.street_name
                    : type === "school"
                    ? item?.school_name
                    : item?.centre_name
                }
                width={800}
                height={400}
                className={styles.modalImage}
              />

              <DetailContent item={item} type={type} />

              <Button
                variant="primary"
                onClick={() => handleViewMap(item)}
                className="w-full mt-4"
              >
                View Location on Map
              </Button>
            </div>
          </Tab>

          <Tab
            eventKey="nearby"
            title={
              type === "hdb"
                ? "Nearby Schools & Preschools"
                : "Nearby HDB Properties"
            }
          >
            <div className="p-4">{renderNearbySection()}</div>
          </Tab>
          {/*
    {type !== 'hdb' && (
            <Tab eventKey="reviews" title="Reviews">
              <div className="p-4">
                {isLoadingReviews ? (
                  <div className="text-center p-4">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <>
                    {placeDetails && renderPlaceDetails()}
                    {reviews.length > 0 ? (
                      <div>
                        {reviews.map(renderReview)}
                      </div>
                    ) : (
                      <p className="text-center text-muted">No reviews found</p>
                    )}
                  </>
                )}
              </div>
            </Tab>
          )}
          */}
          {/* Render the Reviews tab only if the type is not 'hdb' */}
          {type !== "hdb" && (
            <Tab 
            eventKey="reviews" 
            title="Reviews"
            disabled={type === 'hdb'} // Hide Reviews tab for HDB
          >
            <div className="p-4">
              {isLoadingReviews ? (
                <div className="text-center p-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : reviews.length > 0 ? (
                <div>
                  {reviews.map(renderReview)}
                </div>
              ) : (
                <p className="text-center text-muted">No reviews found</p>
              )}
            </div>
          </Tab>
          )}
        </Tabs>
      </Modal.Body>
    </Modal>
  );
};
