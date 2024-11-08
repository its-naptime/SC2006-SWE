// components/Map.js
import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { LoadScript, GoogleMap } from '@react-google-maps/api';

const Map = forwardRef(({ googleMapsApiKey }, ref) => {
  const mapRef = useRef(null);

  const onLoad = (map) => {
    console.log('Map loaded'); // Debug
    mapRef.current = map;
  };

  useImperativeHandle(ref, () => ({
    moveToRandomLocation: () => {
      console.log('moveToRandomLocation called'); // Debug
      if (mapRef.current) {
        // Generate random latitude and longitude within Singapore
        const randomLat = 1.2 + Math.random() * 0.2; // Latitude range for demonstration
        const randomLng = 103.6 + Math.random() * 0.3; // Longitude range for demonstration
        console.log('Random coordinates:', randomLat, randomLng); // Debug
        mapRef.current.panTo({ lat: randomLat, lng: randomLng });
        mapRef.current.setZoom(14); // Optional: Adjust the zoom level
      } else {
        console.error('Map ref is null'); // Debug
      }
    },
  }));

  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey}>
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMap
          onLoad={onLoad}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={{ lat: 1.3388, lng: 103.6874 }} // Initial center (Jurong West, Singapore)
          zoom={13}
        />
      </div>
    </LoadScript>
  );
});

export default Map;
