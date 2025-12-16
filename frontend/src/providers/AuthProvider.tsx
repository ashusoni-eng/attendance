import React, { createContext, useContext, useState, useEffect } from "react";
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
  loadUser: () => Promise<void>;
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

  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!accessToken;

  // Called after successful login
  const login = (token: string, refreshToken: string, user: User) => {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("user", JSON.stringify(user));

    setAccessToken(token);
    setUser(user);
  };
  useEffect(() => {
  console.log("AUTH USER 👉", user);
}, [user]);


  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    setAccessToken(null);
    setUser(null);

    window.location.href = "/";
  };

  // Auto-load user on page refresh
  const loadUser = async () => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (accessToken) {
      try {
        const res = await profileApi();
        setUser(res.data);
      } catch {
        logout();
      }
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, accessToken, isAuthenticated, login, logout, loadUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
