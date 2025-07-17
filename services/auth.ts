import { api } from "./api"
import type { AuthResponse, User } from "@/types/api"

export const authService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await api.post("/auth/login", { email, password })
    return response.data
  },

  async register(name: string, email: string, password: string): Promise<AuthResponse> {
    const response = await api.post("/auth/register", { name, email, password })
    return response.data
  },

  async getCurrentUser(): Promise<User> {
    const response = await api.get("/users/me")
    return response.data
  },

  async forgotPassword(email: string): Promise<string> {
    const response = await api.post("/auth/forgot-password", { email })
    return response.data
  },

  async resetPassword(token: string, new_password: string): Promise<string> {
    const response = await api.post("/auth/reset-password", { token, new_password })
    return response.data
  },
}
