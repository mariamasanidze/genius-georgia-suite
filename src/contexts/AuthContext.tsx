// import React, { createContext, useContext, useState, useEffect } from 'react';

// interface User {
//   id: string;
//   email: string;
//   name: string;
//   businessName: string;
//   businessType: string;
//   plan: 'starter' | 'professional' | 'enterprise';
// }

// interface AuthContextType {
//   user: User | null;
//   isAuthenticated: boolean;
//   isLoading: boolean;
//   login: (email: string, password: string) => Promise<void>;
//   register: (userData: Partial<User> & { email: string; password: string }) => Promise<void>;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // Mock user data for development
// const mockUser: User = {
//   id: '1',
//   email: 'demo@socialgenius.ge',
//   name: 'გიორგი ქართველი',
//   businessName: 'კაფე ვარძია',
//   businessType: 'restaurant',
//   plan: 'professional'
// };

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     // Check for stored authentication
//     const storedUser = localStorage.getItem('socialgenius_user');
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//     setIsLoading(false);
//   }, []);

//   const login = async (email: string, password: string): Promise<void> => {
//     setIsLoading(true);
//     try {
//       // Mock authentication - replace with actual API call
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       if (email === 'demo@socialgenius.ge' && password === 'demo123') {
//         setUser(mockUser);
//         localStorage.setItem('socialgenius_user', JSON.stringify(mockUser));
//       } else {
//         throw new Error('Invalid credentials');
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const register = async (userData: Partial<User> & { email: string; password: string }): Promise<void> => {
//     setIsLoading(true);
//     try {
//       // Mock registration - replace with actual API call
//       await new Promise(resolve => setTimeout(resolve, 1500));
      
//       const newUser: User = {
//         id: Date.now().toString(),
//         email: userData.email,
//         name: userData.name || 'New User',
//         businessName: userData.businessName || 'My Business',
//         businessType: userData.businessType || 'other',
//         plan: 'starter'
//       };
      
//       setUser(newUser);
//       localStorage.setItem('socialgenius_user', JSON.stringify(newUser));
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('socialgenius_user');
//   };

//   const value: AuthContextType = {
//     user,
//     isAuthenticated: !!user,
//     isLoading,
//     login,
//     register,
//     logout,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };


// //code for adding backend


import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../lib/api'; // axios instance
import { ApiResponse, LoginContent, User as BackendUser } from '../types/Auth';

// --------------------
// Register payload DTO
// --------------------
interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  businessName: string;
  businessId: number;
  password: string;
  confirmPassword: string;
}

interface AuthContextType {
  user: BackendUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterPayload) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// =======================================================================
//                          Auth Provider
// =======================================================================
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<BackendUser | null>(null);
  const [session, setSession] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // ------------------------
  // Load saved auth on mount
  // ------------------------
  useEffect(() => {
    const storedUser = localStorage.getItem('sg_user');
    const storedSession = localStorage.getItem('sg_session');

    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedSession) setSession(JSON.parse(storedSession));

    setIsLoading(false);
  }, []);

  // =======================================================================
  //                                LOGIN
  // =======================================================================
  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      const res = await api.post<ApiResponse<LoginContent>>(
        '/api/rest/auth/login',
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const data = res.data.content;

      // Save user and tokens
      setUser(data.user);
      setSession(data.session);

      localStorage.setItem('sg_user', JSON.stringify(data.user));
      localStorage.setItem('sg_session', JSON.stringify(data.session));
    } catch (err: any) {
      const msg =
        err?.response?.data?.error?.message ||
        err?.response?.data?.message ||
        'Login failed';

      throw new Error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  // =======================================================================
  //                              REGISTER
  // =======================================================================
  const register = async (data: RegisterPayload): Promise<void> => {
    setIsLoading(true);

    try {
      // Backend returns ONLY a Descriptor (NO user, NO token)
      await api.post(
        '/api/rest/auth/register',
        data,
        { headers: { 'Content-Type': 'application/json' } }
      );

      // After successful register:
      // → UI should navigate user to /login
      // → Backend does NOT automatically log user in

    } catch (err: any) {
      const msg =
        err?.response?.data?.error?.message ||
        err?.response?.data?.message ||
        'Registration failed';

      throw new Error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  // =======================================================================
  //                               LOGOUT
  // =======================================================================
  const logout = () => {
    setUser(null);
    setSession(null);
    localStorage.removeItem('sg_user');
    localStorage.removeItem('sg_session');
  };

  // =======================================================================
  //                              PROVIDER
  // =======================================================================
  const value: AuthContextType = {
    user,
    isAuthenticated: !!session?.accessToken,
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// =======================================================================
//                              Custom Hook
// =======================================================================
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
