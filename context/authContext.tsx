import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import checkAuth from '@/app/actions/checkAuth';

// 1. Define your User type (replace with your actual user shape)
type User = {
  id: string;
  name: string;
  email: string;
  // ... other user properties
};

// 2. Define context type
type AuthContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
};

// 3. Create context with proper typing
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 4. Define provider props
type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const { isAuthenticated, user } = await checkAuth();
        setIsAuthenticated(isAuthenticated);
        setCurrentUser(user ?? null);
      } catch (error) {
        console.error("Auth check failed:", error);
        setIsAuthenticated(false);
        setCurrentUser(null);
      }
    };
    checkAuthentication();
  }, []);

  const value: AuthContextType = {
    isAuthenticated,
    setIsAuthenticated,
    currentUser,
    setCurrentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// 5. Properly type the hook
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};