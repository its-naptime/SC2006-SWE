<<<<<<< HEAD
import React, { useRef, useImperativeHandle, forwardRef, useEffect, useState } from 'react';
import { LoadScript, GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import axios from 'axios';

const Map = forwardRef(({ googleMapsApiKey, initialLocation, properties }, ref) => {
  const mapRefInternal = useRef(null);
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

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
      </GoogleMap>
    </LoadScript>
  );
});

Map.displayName = 'Map';

export default Map;
=======
// components/Map.js
import { useEffect } from 'react';

const Map = () => {
  useEffect(() => {
    // Initialize your map here (using Google Maps API or another service)
  }, []);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26607.793319041583!2d103.68739347873488!3d1.3388499479604305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da0fc853851f77%3A0x86478db0f8d23b8a!2sJurong%20West%2C%20Singapore!5e0!3m2!1sen!2ssg!4v1632988842037!5m2!1sen!2ssg"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default Map;
>>>>>>> 60491a33e098015ed9c92272a365e23e4c1a42f5
