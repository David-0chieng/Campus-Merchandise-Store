import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('sph_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true); // initial auth check

  // On mount: if we have tokens but no user, fetch profile
  useEffect(() => {
    const bootstrap = async () => {
      const access = localStorage.getItem('access_token');
      if (access && !user) {
        try {
          const { data } = await authService.getProfile();
          setUser(data);
          localStorage.setItem('sph_user', JSON.stringify(data));
        } catch {
          // token invalid / expired and refresh also failed → interceptor handles logout
        }
      }
      setLoading(false);
    };
    bootstrap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = useCallback(async (credentials) => {
    const { data } = await authService.login(credentials);
    localStorage.setItem('access_token', data.access);
    localStorage.setItem('refresh_token', data.refresh);
    const userData = data.user || { username: credentials.username };
    setUser(userData);
    localStorage.setItem('sph_user', JSON.stringify(userData));
    // Fetch full profile to get phone_number, delivery_location etc.
    try {
      const { data: profile } = await authService.getProfile();
      setUser(profile);
      localStorage.setItem('sph_user', JSON.stringify(profile));
    } catch {
      // fallback to login response user
    }
    return data;
  }, []);

  const register = useCallback(async (formData) => {
    const { data } = await authService.register(formData);
    return data;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('sph_user');
    setUser(null);
  }, []);

  const updateUser = useCallback((newData) => {
    const merged = { ...user, ...newData };
    setUser(merged);
    localStorage.setItem('sph_user', JSON.stringify(merged));
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
