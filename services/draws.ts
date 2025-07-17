import { api } from "./api"
import type { Draw } from "@/types/api"

export const drawsService = {
  async getActiveDraws(): Promise<Draw[]> {
    const response = await api.get("/draws/active")
    return response.data
  },

  async getCompletedDraws(): Promise<Draw[]> {
    const response = await api.get("/draws/completed")
    return response.data
  },

  async getDraw(drawId: string): Promise<Draw> {
    const response = await api.get(`/draws/${drawId}`)
    return response.data
  },

  async getAllDraws(): Promise<Draw[]> {
    const response = await api.get("/draws/list/all")
    return response.data
  },
}
