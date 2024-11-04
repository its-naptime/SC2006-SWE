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
