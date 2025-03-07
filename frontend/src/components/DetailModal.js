// components/DetailModal.js
import React, { useState, useEffect } from "react";
import { Modal, Button, Tabs, Tab } from "react-bootstrap";
import Image from "next/image";
import axios from "axios";
import { BookmarkPlus, BookmarkCheck } from 'lucide-react';
import { DetailContent } from "./DetailContent";
import styles from "../styles/Search.module.css";

export const DetailModal = ({ 
  show, 
  onHide, 
  item, 
  type, 
  onViewMap, 
  isSaved,
  onToggleSave 
}) => {
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

  useEffect(() => {
    if (activeTab === "reviews" && item && type !== "hdb") {
      fetchReviews(item.centre_name || item.school_name);
    }
  }, [activeTab, item, type]);

  const fetchReviews = async (locationName) => {
    setIsLoadingReviews(true);

    try {
      const googleApiKey = process.env.NEXT_PUBLIC_API_KEY;

      const placeResponse = await axios.get(
        "https://maps.googleapis.com/maps/api/place/findplacefromtext/json",
        {
          params: {
            input: locationName,
            inputtype: "textquery",
            fields: "place_id",
            key: googleApiKey,
          },
        }
      );

      if (placeResponse.data.candidates.length > 0) {
        const placeId = placeResponse.data.candidates[0].place_id;

        const reviewResponse = await axios.get(
          "https://maps.googleapis.com/maps/api/place/details/json",
          {
            params: {
              place_id: placeId,
              fields: "reviews,rating",
              key: googleApiKey,
            },
          }
        );

        const result = reviewResponse.data.result;
        setPlaceDetails({
          name: locationName,
          rating: result.rating,
        });

        setReviews(result.reviews || []);
      } else {
        setPlaceDetails(null);
        setReviews([]);
      }
    } catch (error) {
      console.error("Error fetching reviews from Google:", error);
    } finally {
      setIsLoadingReviews(false);
    }
  };

  const handleViewMap = (targetItem, targetType = null) => {
    if (targetItem === item) {
      const coordinates = {
        ...targetItem,
        latitude: targetItem.results
          ? targetItem.results.latitude
          : targetItem.latitude,
        longitude: targetItem.results
          ? targetItem.results.longitude
          : targetItem.longitude,
      };
      onViewMap(coordinates, type); // Pass the original type for the main item
    } else {
      onViewMap(targetItem, targetType || type); // Pass the target type for nearby items
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
          onClick={() => handleViewMap(school, 'school')}
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
          onClick={() => handleViewMap(preschool, 'preschool')}
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
          onClick={() => handleViewMap(hdb, 'hdb')}
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

  const renderReview = (review, index) => (
    <div key={review.id || index} className="p-3 border-bottom">
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
      <p className="mb-0">
        <strong>Rating:</strong> {review.rating} / 5
      </p>
    </div>
  );

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
      className={styles.modal}
    >
      <Modal.Header closeButton>
        <div className="d-flex justify-content-between align-items-center w-100">
          <Modal.Title>
            {type === "hdb"
              ? item?.street_name
              : type === "school"
              ? item?.school_name
              : item?.centre_name}
            {activeTab === "reviews" && placeDetails?.rating && (
              <span className="text-muted ml-2">({placeDetails.rating} / 5)</span>
            )}
          </Modal.Title>
          <Button
            variant={isSaved ? "outline-success" : "outline-secondary"}
            size="sm"
            onClick={() => onToggleSave(item)}
          >
            {isSaved ? (
              <>
                <BookmarkCheck size={18} className="me-2" />
                Saved
              </>
            ) : (
              <>
                <BookmarkPlus size={18} className="me-2" />
                Save
              </>
            )}
          </Button>
        </div>
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
              <div className="d-flex">
                <div className="me-auto">
                  <Button
                    variant="primary"
                    onClick={() => handleViewMap(item)}
                    className="mt-4"
                  >
                    View Location on Map
                  </Button>
                </div>
                {type === "hdb" && (
                  <div className="">
                    <a
                      href={`https://www.propertyguru.com.sg/property-for-sale?market=residential&freetext=${encodeURIComponent(
                        item?.street_name || ""
                      )}&listing_type=sale&search=true`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary mt-4 text-right"
                    >
                      Search Property on PropertyGuru
                    </a>
                  </div>
                )}
              </div>
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

          {type !== "hdb" && (
            <Tab
              eventKey="reviews"
              title="Reviews"
              disabled={type === "hdb"}
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

export default DetailModal;