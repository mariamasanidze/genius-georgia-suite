// import React, { createContext, useContext, useState, useEffect } from "react";
// import api from "@/lib/api";
//
// interface LoginPayload {
//     email: string;
//     password: string;
// }
//
// interface RegisterPayload {
//     firstName: string;
//     lastName: string;
//     email: string;
//     businessName: string;
//     businessId: number;
//     password: string;
//     confirmPassword: string;
// }
//
// export interface BackendUser {
//     id: number;
//     firstName: string;
//     lastName: string;
//     email: string;
//     businessId: number;
//     businessName: string;
// }
//
// interface SessionData {
//     accessToken: string;
//     refreshToken: string;
// }
//
// interface AuthContextType {
//     user: BackendUser | null;
//     isAuthenticated: boolean;
//     isLoading: boolean;
//     login: (email: string, password: string) => Promise<void>;
//     register: (data: RegisterPayload) => Promise<void>;
//     logout: () => void;
// }
//
// const AuthContext = createContext<AuthContextType | undefined>(undefined);
//
// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
//                                                                           children,
//                                                                       }) => {
//     const [user, setUser] = useState<BackendUser | null>(null);
//     const [session, setSession] = useState<SessionData | null>(null);
//     const [isLoading, setIsLoading] = useState(true);
//
//     useEffect(() => {
//         const storedUser = localStorage.getItem("sg_user");
//         const storedSession = localStorage.getItem("sg_session");
//
//         if (storedUser) setUser(JSON.parse(storedUser));
//         if (storedSession) setSession(JSON.parse(storedSession));
//
//         setIsLoading(false);
//     }, []);
//
//     // ----------------------
//     // LOGIN
//     // ----------------------
//     const login = async (email: string, password: string): Promise<void> => {
//         setIsLoading(true);
//
//         try {
//             const res = await api.post("/api/rest/auth/login", {
//                 email,
//                 password,
//             });
//
//             const payload = res.data.content;
//
//             const backendUser = payload.user;
//             const backendSession = payload.session;
//
//             setUser(backendUser);
//             setSession(backendSession);
//
//             localStorage.setItem("sg_user", JSON.stringify(backendUser));
//             localStorage.setItem("sg_session", JSON.stringify(backendSession));
//         } catch (err: any) {
//             const msg =
//                 err?.response?.data?.error?.message ||
//                 err?.response?.data?.message ||
//                 "Login error";
//
//             throw new Error(msg);
//         } finally {
//             setIsLoading(false);
//         }
//     };
//
//     // ----------------------
//     // REGISTER
//     // ----------------------
//     const register = async (data: RegisterPayload): Promise<void> => {
//         setIsLoading(true);
//
//         try {
//             await api.post("/api/rest/auth/register", data);
//         } catch (err: any) {
//             const msg =
//                 err?.response?.data?.error?.message ||
//                 err?.response?.data?.message ||
//                 "Registration error";
//
//             throw new Error(msg);
//         } finally {
//             setIsLoading(false);
//         }
//     };
//
//     // ----------------------
//     // LOGOUT
//     // ----------------------
//     const logout = () => {
//         setUser(null);
//         setSession(null);
//         localStorage.removeItem("sg_user");
//         localStorage.removeItem("sg_session");
//     };
//
//     return (
//         <AuthContext.Provider
//             value={{
//                 user,
//                 isAuthenticated: !!session?.accessToken,
//                 isLoading,
//                 login,
//                 register,
//                 logout,
//             }}
//         >
//             {children}
//         </AuthContext.Provider>
//     );
// };
//
// export const useAuth = () => {
//     const ctx = useContext(AuthContext);
//     if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
//     return ctx;
// };

// perfectly working code

import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import api from "../lib/api";

/* --------------------------
   Types
--------------------------- */

export interface BackendUser {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    businessName: string;
    businessId: number;
    enabled: boolean;
}

export interface SessionData {
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
}

interface LoginResponse {
    user: BackendUser;
    session: SessionData;
}

interface AuthContextType {
    user: BackendUser | null;
    session: SessionData | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (data: RegisterPayload) => Promise<void>;
    activateAccount: (code: string) => Promise<void>;
    refreshSession: () => Promise<void>;
    logout: () => void;
}

interface RegisterPayload {
    firstName: string;
    lastName: string;
    email: string;
    businessName: string;
    businessId: number;
    password: string;
    confirmPassword: string;
}

/* --------------------------
   Context
--------------------------- */

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<BackendUser | null>(null);
    const [session, setSession] = useState<SessionData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    /* --------------------------
       Load saved session on mount
    --------------------------- */
    useEffect(() => {
        const savedUser = localStorage.getItem("sg_user");
        const savedSession = localStorage.getItem("sg_session");

        if (savedUser) setUser(JSON.parse(savedUser) as BackendUser);
        if (savedSession) setSession(JSON.parse(savedSession) as SessionData);

        setIsLoading(false);
    }, []);

    /* --------------------------
       LOGIN
    --------------------------- */
    const login = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            const res = await api.post<{ content: LoginResponse }>(
                "/api/rest/auth/login",
                { email, password }
            );

            const { user: backendUser, session: backendSession } = res.data.content;

            setUser(backendUser);
            setSession(backendSession);

            localStorage.setItem("sg_user", JSON.stringify(backendUser));
            localStorage.setItem("sg_session", JSON.stringify(backendSession));
        } catch (error) {
            const axiosErr = error as { response?: { data?: { error?: { message?: string } } } };

            const msg =
                axiosErr.response?.data?.error?.message ?? "Login failed";

            throw new Error(msg);
        } finally {
            setIsLoading(false);
        }
    };

    /* --------------------------
       REGISTER
    --------------------------- */
    const register = async (data: RegisterPayload) => {
        setIsLoading(true);
        try {
            await api.post("/api/rest/auth/register", data);
        } catch (error) {
            const axiosErr = error as { response?: { data?: { error?: { message?: string } } } };
            const msg =
                axiosErr.response?.data?.error?.message ??
                "Registration failed";
            throw new Error(msg);
        } finally {
            setIsLoading(false);
        }
    };

    /* --------------------------
       ACTIVATE ACCOUNT
    --------------------------- */
    const activateAccount = async (code: string) => {
        setIsLoading(true);
        try {
            await api.get(`/api/rest/auth/activate-account?activationCode=${code}`);
        } finally {
            setIsLoading(false);
        }
    };

    /* --------------------------
       REFRESH TOKEN
    --------------------------- */
    const refreshSession = async () => {
        if (!session?.refreshToken) return;

        try {
            const res = await api.post<{ content: SessionData }>(
                "/api/rest/auth/refresh",
                { refreshToken: session.refreshToken }
            );

            const updatedSession = res.data.content;
            setSession(updatedSession);
            localStorage.setItem("sg_session", JSON.stringify(updatedSession));
        } catch {
            logout();
        }
    };

    /*
       LOGOUT */

    const logout = async () => {
        try {
            await api.post("/api/rest/user/logout");
        } catch (e) {
            console.warn("Logout endpoint failed, continuing local logout anyway");
        }

        setUser(null);
        setSession(null);
        localStorage.removeItem("sg_user");
        localStorage.removeItem("sg_session");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                session,
                isAuthenticated: !!session?.accessToken,
                isLoading,
                login,
                register,
                activateAccount,
                refreshSession,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

/* --------------------------
   Custom Hook
--------------------------- */
export const useAuth = (): AuthContextType => {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth must be used inside AuthProvider");
    }
    return ctx;
};
