import React, { useRef, useImperativeHandle, forwardRef, useEffect } from 'react';
import { LoadScript, GoogleMap } from '@react-google-maps/api';

const Map = forwardRef(({ googleMapsApiKey, initialLocation }, ref) => {
  const mapRefInternal = useRef(null);
  
  const onLoad = (map) => {
    mapRefInternal.current = map;
    // If there's an initial location, set it when map loads
    if (initialLocation) {
      map.panTo(initialLocation);
      map.setZoom(15);
    }
  };

  // Handle updates to initialLocation prop
  useEffect(() => {
    if (initialLocation && mapRefInternal.current) {
      mapRefInternal.current.panTo(initialLocation);
      mapRefInternal.current.setZoom(15);
    }
  }, [initialLocation]);

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
        center={initialLocation || { lat: 1.3388, lng: 103.6874 }} // Use initialLocation if provided
        zoom={13}
      />
    </LoadScript>
  );
});

Map.displayName = 'Map'; // Add display name for React Dev Tools

export default Map;