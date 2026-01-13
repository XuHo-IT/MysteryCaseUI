import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authApi, setAuthToken, removeAuthToken, getAuthToken, LoginRequest, UserProfile, userApi } from '../services/api';

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserProfile | null;
  token: string | null;
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => void;
  register: (data: { username: string; email: string; password: string }) => Promise<void>;
  refreshUser: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setTokenState] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const storedToken = getAuthToken();
    if (storedToken) {
      setTokenState(storedToken);
      setIsAuthenticated(true);
      // Try to fetch user profile
      refreshUser().catch(() => {
        // If token is invalid, logout
        logout();
      });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (credentials: LoginRequest) => {
    try {
      const response = await authApi.login(credentials);
      setAuthToken(response.token);
      setTokenState(response.token);
      setIsAuthenticated(true);
      await refreshUser();
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (data: { username: string; email: string; password: string }) => {
    try {
      await authApi.register(data);
      // After registration, automatically login
      await login({ usernameOrEmail: data.username, password: data.password });
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = () => {
    removeAuthToken();
    setTokenState(null);
    setIsAuthenticated(false);
    setUser(null);
  };

  const refreshUser = async () => {
    try {
      const userProfile = await userApi.getProfile();
      setUser(userProfile);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      setLoading(false);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        token,
        login,
        logout,
        register,
        refreshUser,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

