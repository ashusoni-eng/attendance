import React, { createContext, useContext, useEffect, useState } from "react";
import { profileApi } from "../modules/user/api/user.api";

interface User {
  id: string;
  email: string;
  fullName: string;
  accountType?: string;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
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

  // 🔕 Optional backend sync — SAFE
  useEffect(() => {
    if (!accessToken) return;

    const syncProfile = async () => {
      try {
        const res = await profileApi();

        // ✅ only update if fullName exists
        if (res?.data?.fullName) {
          setUser(res.data);
          localStorage.setItem("user", JSON.stringify(res.data));
        }
      } catch {
        // ❌ DO NOTHING — keep local user
      }
    };

    syncProfile();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, accessToken, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
