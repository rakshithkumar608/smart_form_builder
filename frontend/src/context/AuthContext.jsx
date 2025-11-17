import React, { createContext, useState, useEffect } from 'react';
import api from '../api/http';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) {
      api.get('/auth/me').then(res => setUser(res.data)).catch(()=> setUser(null));
    }
  }, []);

  const login = (token, user) => {
    localStorage.setItem('token', token);
    setUser(user);
  };
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
