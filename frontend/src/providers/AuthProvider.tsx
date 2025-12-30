import React, { createContext, useContext, useEffect, useState } from "react";
import { profileApi } from "../modules/user/api/user.api";

interface User {
  photo?: string;
  id: string;
  email: string;
  fullName: string;
  accountType?: string;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (token: string, refreshToken: string, user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem("accessToken")
  );

  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!accessToken;

  const login = (token: string, refreshToken: string, user: User) => {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("user", JSON.stringify(user));

    setAccessToken(token);
    setUser(user);
  };

  const logout = () => {
    localStorage.clear();
    setAccessToken(null);
    setUser(null);
    window.location.href = "/";
  };

  // 🔁 Restore user session safely
  useEffect(() => {
    const initAuth = async () => {
      if (!accessToken) {
        setLoading(false);
        return;
      }

      try {
        const res = await profileApi();

        if (res?.data?.fullName) {
          setUser(res.data);
          localStorage.setItem("user", JSON.stringify(res.data));
        }
      } catch {
        // token invalid → logout
        logout();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isAuthenticated,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
