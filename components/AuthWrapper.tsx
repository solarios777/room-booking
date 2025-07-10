'use client';
import { AuthProvider } from "@/context/authContext";
const AuthWrapper = ({ children }: any) => {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    );
}

export default AuthWrapper