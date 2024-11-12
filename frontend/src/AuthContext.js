import React, { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";
import api from './Api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Add token to API headers
  const updateApiToken = (token) => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  };

  const fetchUserInfo = async () => {
    try {
      const response = await api.get('/api/user/profile/');
      console.log('User info fetched:', response.data);
      setUser(response.data);
      setIsAuthenticated(true);
      return response.data;
    } catch (error) {
      console.error('Error fetching user info:', error);
      setIsAuthenticated(false);
      setUser(null);
      throw error;
    }
  };

  const login = async (tokens) => {
    try {
      // Store tokens
      localStorage.setItem(ACCESS_TOKEN, tokens.access);
      localStorage.setItem(REFRESH_TOKEN, tokens.refresh);
      
      // Update API headers with new token
      updateApiToken(tokens.access);
      
      // Fetch user info
      await fetchUserInfo();
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      logout();
      throw error;
    }
  };

  const logout = () => {
    // Clear tokens
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    
    // Clear API headers
    updateApiToken(null);
    
    // Reset state
    setIsAuthenticated(false);
    setUser(null);
  };

  // Check token on mount and set up initial state
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem(ACCESS_TOKEN);
      if (token) {
        try {
          const decoded = jwtDecode(token);
          const currentTime = Date.now() / 1000;
          
          if (decoded.exp > currentTime) {
            // Set up API with existing token
            updateApiToken(token);
            await fetchUserInfo();
          } else {
            logout();
          }
        } catch (error) {
          console.error('Token validation error:', error);
          logout();
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  // Set up automatic token refresh
  useEffect(() => {
    let refreshInterval;

    if (isAuthenticated) {
      refreshInterval = setInterval(async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
          try {
            const decoded = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            
            // Refresh token when it's close to expiring (e.g., 5 minutes before)
            if (decoded.exp - currentTime < 300) {
              const refreshToken = localStorage.getItem(REFRESH_TOKEN);
              const response = await api.post('/api/token/refresh/', {
                refresh: refreshToken
              });
              
              localStorage.setItem(ACCESS_TOKEN, response.data.access);
              updateApiToken(response.data.access);
            }
          } catch (error) {
            console.error('Token refresh error:', error);
            logout();
          }
        }
      }, 60000); // Check every minute
    }

    return () => {
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
    };
  }, [isAuthenticated]);

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};