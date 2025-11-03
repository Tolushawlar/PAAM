import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const API_BASE_URL = '/v1/admin';
const API_TOKEN = 'fsdgsdfsdfgv4vwewetvwev';

const apiCall = async (endpoint, body) => {
  const response = await fetch(`${API_BASE_URL}?endpoint=${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return await response.json();
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  // Check authentication status on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    setLoading(true);
    try {
      const result = await apiCall('getprofile', {});
      if (result.status === 'success' && result.data) {
        setUser(result.data);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log('No active session');
      setUser(null);
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const result = await apiCall('loginuser', { email, password });
      if (result.status === 'success' && result.data) {
        setUser(result.data);
        setIsLoggedIn(true);
        return { success: true, data: result.data };
      }
      return { success: false, error: result.message };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  const updateProfile = async (profileData) => {
    setLoading(true);
    try {
      const result = await apiCall('updateuserprofile', profileData);
      if (result.status === 'success') {
        // Refresh user data
        await checkAuthStatus();
        return { success: true };
      }
      return { success: false, error: result.message };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoggedIn, 
      loading,
      login, 
      logout, 
      updateProfile,
      checkAuthStatus 
    }}>
      {children}
    </AuthContext.Provider>
  );
};