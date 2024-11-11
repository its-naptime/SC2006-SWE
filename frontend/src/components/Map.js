import React, { useRef, useImperativeHandle, forwardRef, useEffect, useState } from 'react';
import { LoadScript, GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import axios from 'axios';

const Map = forwardRef(({ googleMapsApiKey, initialLocation, properties }, ref) => {
  const mapRefInternal = useRef(null);
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [schoolMarkers, setSchoolMarkers] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [showSchools, setShowSchools] = useState(false); // State to track if schools are shown

  const onLoad = (map) => {
    mapRefInternal.current = map;
    if (initialLocation) {
      map.panTo(initialLocation);
      map.setZoom(15);
    }
  };

  // Fetch geolocation for each property to create markers
  useEffect(() => {
    const fetchMarkers = async () => {
      const markerPromises = properties.map(async (property) => {
        try {
          const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json`,
            {
              params: {
                address: `${property.street_name}, Singapore`,
                key: googleMapsApiKey,
              },
            }
          );

          if (response.data.results.length > 0) {
            const { lat, lng } = response.data.results[0].geometry.location;
            return {
              position: { lat, lng },
              title: property.street_name,
              property, // Pass the property object for additional info
            };
          } else {
            console.error(`Location not found for street: ${property.street_name}`);
            return null;
          }
        } catch (error) {
          console.error(`Error fetching geocode for ${property.street_name}:`, error);
          return null;
        }
      });

      const resolvedMarkers = await Promise.all(markerPromises);
      setMarkers(resolvedMarkers.filter(marker => marker !== null));
    };

    if (properties && properties.length > 0) {
      fetchMarkers();
    }
  }, [properties, googleMapsApiKey]);

  useImperativeHandle(ref, () => ({
    panTo: (location) => {
      if (mapRefInternal.current && typeof mapRefInternal.current.panTo === 'function') {
        mapRefInternal.current.panTo(location);
      } else {
        console.error("panTo function is not available on the map instance.");
      }
    },
    setZoom: (zoomLevel) => {
      if (mapRefInternal.current && typeof mapRefInternal.current.setZoom === 'function') {
        mapRefInternal.current.setZoom(zoomLevel);
      } else {
        console.error("setZoom function is not available on the map instance.");
      }
    },
    toggleSchoolMarkers: async () => {
      if (showSchools) {
        // Hide school markers
        setSchoolMarkers([]);
        setShowSchools(false);
        setSelectedSchool(null);
      } else {
        try {
          const response = await axios.get('http://localhost:8000/api/school_info/');
          const schools = response.data;

          const schoolMarkersData = schools.map((school) => ({
            position: { lat: parseFloat(school.latitude), lng: parseFloat(school.longitude) },
            title: school.school_name,
            school,
          }));

          setSchoolMarkers(schoolMarkersData);
          setShowSchools(true);
        } catch (error) {
          console.error('Error fetching nearby schools:', error);
        }
      }
    }
  }));

  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey}>
      <GoogleMap
        onLoad={onLoad}
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={initialLocation || { lat: 1.3388, lng: 103.6874 }}
        zoom={13}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.position}
            title={marker.title}
            onClick={() => setSelectedMarker(marker)} // Set marker on click
          />
        ))}

        {selectedMarker && (
          <InfoWindow
            position={selectedMarker.position}
            onCloseClick={() => setSelectedMarker(null)} // Close the info window
          >
            <div>
              <h5>{selectedMarker.property.street_name}</h5>
              <p><strong>Price:</strong> ${selectedMarker.property.resale_price?.toLocaleString()}</p>
              <p><strong>Type:</strong> {selectedMarker.property.flat_type}</p>
              <p><strong>Town:</strong> {selectedMarker.property.town}</p>
              <img
                src={selectedMarker.property.image || '/images/property.jpg'}
                alt={selectedMarker.property.street_name}
                style={{ width: 'auto', height: 'auto' }}
              />
            </div>
          </InfoWindow>
        )}

{schoolMarkers.map((marker, index) => (
  <Marker
    key={`school-${index}`}
    position={marker.position}
    title={marker.title}
    icon={{
      url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png', // Replace with your preferred icon URL
      scaledSize: new window.google.maps.Size(40, 40), // Adjust size as needed
    }}
    onClick={() => setSelectedSchool(marker)} // Set school marker on click
  />
))}

        {selectedSchool && (
          <InfoWindow
            position={selectedSchool.position}
            onCloseClick={() => setSelectedSchool(null)}
          >
            <div>
              <h5>{selectedSchool.school.school_name}</h5>
              <p><strong>Address:</strong> {selectedSchool.school.address}</p>
              <p><strong>Telephone:</strong> {selectedSchool.school.telephone_no}</p>
              <p><a href={selectedSchool.school.url_address} target="_blank" rel="noopener noreferrer">Visit School Website</a></p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
});

Map.displayName = 'Map';

export default Map;
