import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(authService.getCurrentUser());
  const [loading, setLoading] = useState(false);

  useEffect(() => { setUser(authService.getCurrentUser()); }, []);

  const login = async (email, password) => {
    setLoading(true);
    const res = await authService.login({ email, password });
    const data = res.data;
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data));
    setUser(data);
    setLoading(false);
    return data;
  };

  const register = async (payload) => {
    setLoading(true);
    const res = await authService.register(payload);
    const data = res.data;
    setLoading(false);
    return data;
  };

  const verifyEmail = async (token) => {
    const res = await authService.verifyEmail(token);
    return res.data;
  };

  const forgotPassword = async (email) => {
    const res = await authService.forgotPassword({ email });
    return res.data;
  };

  const resetPassword = async (payload) => {
    const res = await authService.resetPassword(payload);
    return res.data;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, verifyEmail, forgotPassword, resetPassword, logout, loading, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
