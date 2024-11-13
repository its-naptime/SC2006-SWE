// components/SearchResults.js
import React from 'react';
import Image from 'next/image';
import { Button } from 'react-bootstrap';
import { BookmarkPlus, BookmarkCheck } from 'lucide-react'; // Add this import
import styles from "../styles/Search.module.css";

export const HDBCard = ({ property, onViewMap, onViewDetails, isMovingMap, isSaved, onToggleSave }) => (
  <div className={styles.propertyCard}>
    <Image
      src={property.image || "/images/property.jpg"}
      alt={property.street_name}
      width={300}
      height={200}
      className={styles.propertyImage}
      onClick={() => onViewDetails(property)}
    />
    <div className={styles.propertyDetails}>
      <h4>{property.street_name}</h4>
      <p className="text-primary fw-bold">
        ${property.resale_price?.toLocaleString()}
      </p>
      <p>{property.floor_area_sqm} sqm | {property.flat_type}</p>
      <p>{property.town}</p>
      <div className="d-flex justify-content-between align-items-center mt-2">
        <Button
          variant="outline-primary"
          size="sm"
          onClick={() => onViewMap(property)}
          disabled={isMovingMap}
        >
          {isMovingMap ? (
            <span className="spinner-border spinner-border-sm" />
          ) : (
            'View on Map'
          )}
        </Button>
        <div className="d-flex gap-2">
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => onToggleSave(property)}
          >
            {isSaved ? <BookmarkCheck size={18} /> : <BookmarkPlus size={18} />}
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => onViewDetails(property)}
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  </div>
);

export const SchoolCard = ({ school, onViewMap, onViewDetails, isMovingMap, isSaved, onToggleSave }) => (
  <div className={styles.propertyCard}>
    <Image
      src={school.image || "/images/school.jpg"}
      alt={school.school_name}
      width={300}
      height={200}
      className={styles.propertyImage}
      onClick={() => onViewDetails(school)}
    />
    <div className={styles.propertyDetails}>
      <h4>{school.school_name}</h4>
      <p>{school.type_code}</p>
      <p>{school.mainlevel_code}</p>
      <p className="mb-2">{school.address}</p>
      <div className="d-flex gap-2 mb-2 flex-wrap">
        {school.special_programs?.map(program => (
          <span key={program} className="badge bg-secondary">{program}</span>
        ))}
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <Button
          variant="outline-primary"
          size="sm"
          onClick={() => onViewMap(school)}
          disabled={isMovingMap}
        >
          {isMovingMap ? (
            <span className="spinner-border spinner-border-sm" />
          ) : (
            'View on Map'
          )}
        </Button>
        <div className="d-flex gap-2">
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => onToggleSave(school)}
          >
            {isSaved ? <BookmarkCheck size={18} /> : <BookmarkPlus size={18} />}
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => onViewDetails(school)}
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  </div>
);

export const PreschoolCard = ({ preschool, onViewMap, onViewDetails, isMovingMap, isSaved, onToggleSave }) => (
  <div className={styles.propertyCard}>
    <Image
      src={preschool.image || "/images/preschool.jpg"}
      alt={preschool.centre_name}
      width={300}
      height={200}
      className={styles.propertyImage}
      onClick={() => onViewDetails(preschool)}
    />
    <div className={styles.propertyDetails}>
      <h4>{preschool.centre_name}</h4>
      <p>{preschool.service_model}</p>
      <p className="mb-2">{preschool.address}</p>
      <div className="d-flex gap-2 mb-2">
        {preschool.spark_certified && (
          <span className="badge bg-success">SPARK Certified</span>
        )}
        {preschool.transport_required && (
          <span className="badge bg-info">Transport Available</span>
        )}
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <Button
          variant="outline-primary"
          size="sm"
          onClick={() => onViewMap(preschool)}
          disabled={isMovingMap}
        >
          {isMovingMap ? (
            <span className="spinner-border spinner-border-sm" />
          ) : (
            'View on Map'
          )}
        </Button>
        <div className="d-flex gap-2">
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => onToggleSave(preschool)}
          >
            {isSaved ? <BookmarkCheck size={18} /> : <BookmarkPlus size={18} />}
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => onViewDetails(preschool)}
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  </div>
);