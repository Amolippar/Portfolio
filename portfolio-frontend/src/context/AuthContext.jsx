import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginAdmin } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('portfolio_token') || null);
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('portfolio_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem('portfolio_token', token);
    } else {
      localStorage.removeItem('portfolio_token');
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('portfolio_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('portfolio_user');
    }
  }, [user]);

  const login = async (username, password) => {
    setLoading(true);
    try {
      const response = await loginAdmin({ username, password });
      if (response && response.success && response.data) {
        const { token, username: userUsername, email, role } = response.data;
        setToken(token);
        setUser({ username: userUsername, email, role });
        return { success: true };
      }
      return { success: false, message: response.message || 'Login failed' };
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Login failed';
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('portfolio_token');
    localStorage.removeItem('portfolio_user');
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!token,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
