// src/lib/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser } from '@/lib/api/apiService';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      const userData = await getCurrentUser();
      // Transform the rolesList to a more convenient format
      const roles = userData.rolesList.map(role => role.name.replace('ROLE_', ''));
      
      setUser({
        id: userData.id,
        username: userData.username,
        email: userData.email,
        roles,
        jobsList: userData.jobsList || [],
        jobApplicationList: userData.jobApplicationList || []
      });
      
      return userData;
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      throw error;
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        setAuth({ accessToken: token });
        try {
          await fetchUserData();
        } catch (error) {
          // If user data fetch fails, clear authentication
          logout();
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (authData) => {
    localStorage.setItem('accessToken', authData.accessToken);
    setAuth({ accessToken: authData.accessToken });
    await fetchUserData();
  };

  const logout = () => {
    setAuth({});
    setUser(null);
    localStorage.removeItem('accessToken');
  };

  const value = {
    auth,
    user,
    setAuth: login,
    loading,
    logout,
    isAuthenticated: !!auth?.accessToken,
    isEmployer: user?.roles?.includes('EMPLOYEER'),
    isJobSeeker: user?.roles?.includes('JOBSEEKER'),
    refetchUser: fetchUserData
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
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