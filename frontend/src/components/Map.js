import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { LoadScript, GoogleMap } from '@react-google-maps/api';

const Map = forwardRef((props, ref) => {
  const mapRefInternal = useRef(null);

  const onLoad = (map) => {
    mapRefInternal.current = map;
  };

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
    <LoadScript googleMapsApiKey={props.googleMapsApiKey}>
      <GoogleMap
        onLoad={onLoad}
        mapContainerStyle={{ width: '100%', height: '100%' }} // Adjust as needed
        center={{ lat: 1.3388, lng: 103.6874 }} // Initial center point
        zoom={13}
      />
    </LoadScript>
  );
});

export default Map;
