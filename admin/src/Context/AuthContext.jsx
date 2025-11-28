import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (in a real app, verify token with backend)
    const adminUser = localStorage.getItem('adminUser');
    if (adminUser) {
      setUser(JSON.parse(adminUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // In a real app, this would be an API call
    if (email === 'admin@ecoshop.com' && password === 'admin123') {
      const adminUser = {
        id: 1,
        name: 'Admin User',
        email: 'admin@ecoshop.com',
        role: 'admin'
      };
      setUser(adminUser);
      localStorage.setItem('adminUser', JSON.stringify(adminUser));
      return adminUser;
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('adminUser');
  };

  const value = {
    user,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};