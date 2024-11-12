import React, { createContext, useState, useEffect } from 'react';
import { ACCESS_TOKEN } from "./constants";
import jwt_decode from 'jwt-decode';

// Create the AuthContext
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  // Function to check if the token is valid
  const checkTokenValidity = (token) => {
    try {

      const decoded = jwt_decode(token); // Decode the JWT token
      const currentTime = Date.now() / 1000; // Current time in seconds

      if (decoded.exp < currentTime) {
        // Token is expired
        return false;
      } else {
        // Token is valid
        return true;
      }
    } catch (error) {
      // If decoding fails, it's an invalid token
      return false;
    }
  };

  // Check if there is a valid token in localStorage
  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token && checkTokenValidity(token)) {
      setIsAuthenticated(true);  // User is authenticated
    } else {
      setIsAuthenticated(false); // User is not authenticated
    }
  }, []);  // Runs only once when the component mounts

  // Function to log out the user
  const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
