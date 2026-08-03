"use client";

import {
  createContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import {
  LoginDto,
  RegisterDto,
  User,
} from "@/types/auth";

import { authService } from "@/services/auth.service";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  loading: boolean;

  login: (data: LoginDto) => Promise<void>;
  register: (data: RegisterDto) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

export const AuthContext =
  createContext<AuthContextType | null>(null);

interface Props {
  children: ReactNode;
}

export function AuthProvider({
  children,
}: Props) {
  const [user, setUser] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(true);

  async function refreshUser() {
    try {
      const response =
        await authService.getCurrentUser();

      setUser(response.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function login(data: LoginDto) {
    try {
      await authService.login(data);

      await refreshUser();

      toast.success("Welcome back!");
    } catch (error) {
      toast.error("Login failed. Please try again.");
      throw error;
    }
  }

  async function register(data: RegisterDto) {
    try {
      await authService.register(data);

      await refreshUser();

      toast.success("Account created successfully!");
    } catch (error) {
      toast.error("Registration failed. Please try again.");
      throw error;
    }
  }

  async function logout() {
    try {
      await authService.logout();

      setUser(null);

      toast.success("Logged out successfully.");
    } catch (error) {
      toast.error("Unable to logout.");
      throw error;
    }
  }

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}