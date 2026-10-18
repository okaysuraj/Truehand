import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/authService';
import { clearPushOwner, activatePush } from '../services/pushRegistration';
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(
    () =>
      authService.observeAuth((identity) =>
        setUser((current) => (current?.firebaseUid === identity?.uid ? current : null)),
      ),
    [],
  );
  useEffect(() => {
    if (loading) return;
    let active = true;
    let dispose;
    activatePush(user?.id, () => window.dispatchEvent(new Event('truehand-notifications-updated')))
      .then((cleanup) => {
        if (active) dispose = cleanup;
        else cleanup();
      })
      .catch(() => {});
    return () => {
      active = false;
      dispose?.();
    };
  }, [user?.id, loading]);
  useEffect(() => {
    let active = true;
    authService
      .restoreSession()
      .then((data) => {
        if (active) setUser(data);
      })
      .catch(() => {
        if (active) setUser(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);
  useEffect(() => {
    const clear = () => {
      clearPushOwner();
      setUser(null);
    };
    window.addEventListener('truehand-auth-expired', clear);
    return () => window.removeEventListener('truehand-auth-expired', clear);
  }, []);
  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await authService.login({
        email,
        password,
      });
      const data = res.data;
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);
      return data;
    } finally {
      setLoading(false);
    }
  };
  const register = async (payload) => {
    setLoading(true);
    try {
      const res = await authService.register(payload);
      const data = res.data;
      return data;
    } finally {
      setLoading(false);
    }
  };
  const verifyEmail = async (token) => {
    const res = await authService.verifyEmail(token);
    return res.data;
  };
  const forgotPassword = async (email) => {
    const res = await authService.forgotPassword({
      email,
    });
    return res.data;
  };
  const resetPassword = async (payload) => {
    const res = await authService.resetPassword(payload);
    return res.data;
  };
  const logout = () => {
    authService.logout().catch(() => {});
    setUser(null);
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        verifyEmail,
        forgotPassword,
        resetPassword,
        logout,
        loading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
