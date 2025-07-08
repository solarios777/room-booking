// import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   // Add other user properties as needed
// }

// interface AuthResponse {
//   isAuthenticated: boolean;
//   user: User | null;
// }

// // Declare the checkAuth function type if you're not importing it yet
// declare const checkAuth: () => Promise<AuthResponse>;

// interface AuthContextType {
//   isAuthenticated: boolean;
//   setIsAuthenticated: (value: boolean) => void;
//   currentUser: User | null;
//   setCurrentUser: (user: User | null) => void;
// }

// // Create the context with the correct type
// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export const AuthProvider = ({ children }: AuthProviderProps) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [currentUser, setCurrentUser] = useState<User | null>(null);

//   useEffect(() => {
//     const checkAuthentication = async () => {
//       try {
//         const { isAuthenticated, user } = await checkAuth();
//         setIsAuthenticated(isAuthenticated);
//         setCurrentUser(user);
//       } catch (error) {
//         console.error('Authentication check failed:', error);
//         setIsAuthenticated(false);
//         setCurrentUser(null);
//       }
//     };

//     checkAuthentication();
//   }, []);

//   return (
//     <AuthContext.Provider
//       value={{
//         isAuthenticated,
//         setIsAuthenticated,
//         currentUser,
//         setCurrentUser,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };