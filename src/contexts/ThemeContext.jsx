import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

const API_BASE_URL = '/v1/admin';
const API_TOKEN = 'fsdgsdfsdfgv4vwewetvwev';

const apiCall = async (endpoint, body) => {
  try {
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
  } catch (error) {
    console.error('Theme API call failed:', error);
    return null;
  }
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  const [loading, setLoading] = useState(false);

  // Load theme preference from API on mount
  useEffect(() => {
    loadThemePreference();
  }, []);

  // Apply theme changes to DOM
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  const loadThemePreference = async () => {
    setLoading(true);
    try {
      const result = await apiCall('getprofile', {});
      if (result && result.status === 'success' && result.data) {
        const themePreference = result.data.theme_preference;
        if (themePreference) {
          setIsDark(themePreference === 'dark');
        }
      }
    } catch (error) {
      console.log('Could not load theme preference, using system default');
    } finally {
      setLoading(false);
    }
  };

  const saveThemePreference = async (theme) => {
    try {
      await apiCall('updateuserprofile', {
        theme_preference: theme
      });
    } catch (error) {
      console.error('Failed to save theme preference:', error);
    }
  };

  const toggleTheme = async () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    // Save to API
    await saveThemePreference(newTheme ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, loading }}>
      {children}
    </ThemeContext.Provider>
  );
};