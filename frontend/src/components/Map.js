// components/Map.js
import React, { useRef, useEffect } from 'react';
import { LoadScript, GoogleMap } from '@react-google-maps/api';

const Map = () => {
  const mapRef = useRef(null);

  const onLoad = (map) => {
    mapRef.current = map;
  };

  const moveToRandomLocation = () => {
    if (mapRef.current) {
      const randomLat = 1.3 + Math.random() * 0.1; // Slightly varying latitude around Singapore
      const randomLng = 103.6 + Math.random() * 0.3; // Slightly varying longitude around Singapore
      mapRef.current.panTo({ lat: randomLat, lng: randomLng });
      mapRef.current.setZoom(14); // Optional: Adjust the zoom level
    }
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyAyzmdHfqi4yBCQJmX1OT3rkXaam6Q5X7g">
      <div style={{ height: '100vh', width: '100%' }}> {/* Full height and width */}
        <button onClick={moveToRandomLocation} style={{ marginBottom: '10px' }}>
          Move to Random Location
        </button>
        <GoogleMap
          onLoad={onLoad}
          mapContainerStyle={{ width: '100%', height: '100%' }} 
          center={{ lat: 1.3388, lng: 103.6874 }} // Initial center (Jurong West, Singapore)
          zoom={13}
        />
      </div>
    </LoadScript>
  );
};

export default Map;
