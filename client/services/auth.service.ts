import api from "@/lib/axios";
import { ApiResponse } from "@/types/api";
import {
  LoginDto,
  RegisterDto,
  User,
} from "@/types/auth";

const register = async (
  data: RegisterDto
) => {
  const response =
    await api.post<ApiResponse<User>>(
      "/auth/signup",
      data
    );

  return response.data;
};

const login = async (
  data: LoginDto
) => {
  const response =
    await api.post<ApiResponse<User>>(
      "/auth/login",
      data
    );

  return response.data;
};

const logout = async () => {
  const response =
    await api.post<ApiResponse<null>>(
      "/auth/logout"
    );

  return response.data;
};

const getCurrentUser =
  async () => {
    const response =
      await api.get<ApiResponse<User>>(
        "/auth/me"
      );

    return response.data;
  };

export const authService = {
  register,
  login,
  logout,
  getCurrentUser,
};