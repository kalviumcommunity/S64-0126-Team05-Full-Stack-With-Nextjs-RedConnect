"use client";

import { createContext, useState, useContext, ReactNode } from "react";

interface AuthContextType {
  user: string | null;
  role: string | null;
  login: (username: string, role?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  const login = (username: string, userRole?: string) => {
    setUser(username);
    setRole(userRole || null);
    console.log("User logged in:", username, "with role:", userRole);
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    console.log("User logged out");
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuthContext must be used within an AuthProvider");
  return context;
}
