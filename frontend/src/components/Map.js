import React, { useEffect, forwardRef, useImperativeHandle } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const getMarkerSvg = (type, isMain) => {
  // Simple color scheme
  const colors = {
    hdb: { fill: '#FF4444', stroke: '#CC0000' },     // Red
    school: { fill: '#44FF44', stroke: '#00CC00' },   // Green
    preschool: { fill: '#4444FF', stroke: '#0000CC' } // Blue
  };

  const { fill, stroke } = colors[type] || colors.hdb;
  const scale = isMain ? 1.4 : 1;
  const size = 32 * scale; // Increased size for better visibility

  // Get letter based on type
  const letter = type === 'hdb' ? 'H' : type === 'school' ? 'S' : 'P';

  const svgPath = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="${size}" height="${size}">
      <circle cx="16" cy="16" r="14" fill="${fill}" stroke="${stroke}" stroke-width="2"/>
      <text x="16" y="22" font-size="16" font-family="Arial" font-weight="bold" 
            fill="white" text-anchor="middle">${letter}</text>
    </svg>
  `;

  return {
    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgPath),
    scaledSize: new window.google.maps.Size(size, size),
    origin: new window.google.maps.Point(0, 0),
    anchor: new window.google.maps.Point(size/2, size/2)
  };
};

const Map = forwardRef(({ googleMapsApiKey, initialLocation, markers }, ref) => {
  const mapRef = React.useRef(null);
  const [map, setMap] = React.useState(null);
  const [selectedMarker, setSelectedMarker] = React.useState(null);

  useImperativeHandle(ref, () => ({
    panTo: (latLng) => {
      if (map) {
        map.panTo(latLng);
      }
    },
    setZoom: (zoom) => {
      if (map) {
        map.setZoom(zoom);
      }
    },
    fitBounds: (bounds) => {
      if (map) {
        map.fitBounds(bounds);
      }
    },
    getZoom: () => {
      return map ? map.getZoom() : null;
    }
  }));

  const onLoad = React.useCallback((map) => {
    setMap(map);
    mapRef.current = map;
  }, []);

  const onUnmount = React.useCallback(() => {
    setMap(null);
    mapRef.current = null;
  }, []);

  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey}>
      <GoogleMap
        mapContainerStyle={{
          width: '100%',
          height: '100%'
        }}
        center={initialLocation || { lat: 1.3521, lng: 103.8198 }}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ],
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false
        }}
      >
        {markers?.map((marker, index) => (
          <React.Fragment key={index}>
            <Marker
              position={marker.location}
              title={marker.title}
              icon={getMarkerSvg(marker.type, marker.isMain)}
              animation={marker.isMain ? window.google.maps.Animation.DROP : null}
              onClick={() => setSelectedMarker(marker)}
            />
            {selectedMarker === marker && (
              <InfoWindow
                position={marker.location}
                onCloseClick={() => setSelectedMarker(null)}
              >
                <div style={{ 
                  padding: '8px', 
                  maxWidth: '200px',
                  fontFamily: 'Arial, sans-serif'
                }}>
                  <div style={{ 
                    fontSize: '14px', 
                    fontWeight: 'bold',
                    marginBottom: '4px'
                  }}>
                    {marker.title}
                  </div>
                  {marker.distance && (
                    <div style={{ 
                      fontSize: '12px',
                      color: '#666'
                    }}>
                      {marker.distance.toFixed(2)} km away
                    </div>
                  )}
                </div>
              </InfoWindow>
            )}
          </React.Fragment>
        ))}
      </GoogleMap>
    </LoadScript>
  );
});

Map.displayName = 'Map';

export default Map;