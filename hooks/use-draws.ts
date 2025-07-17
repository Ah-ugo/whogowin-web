"use client"

import { useState, useEffect } from "react"
import { drawsService } from "@/services/draws"
import type { Draw } from "@/types/api"
import { useToast } from "@/hooks/use-toast"

export function useDraws() {
  const [activeDraws, setActiveDraws] = useState<Draw[]>([])
  const [completedDraws, setCompletedDraws] = useState<Draw[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  const fetchActiveDraws = async () => {
    try {
      const draws = await drawsService.getActiveDraws()
      setActiveDraws(draws)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch active draws",
        variant: "destructive",
      })
    }
  }

  const fetchCompletedDraws = async () => {
    try {
      const draws = await drawsService.getCompletedDraws()
      setCompletedDraws(draws)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch completed draws",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      await Promise.all([fetchActiveDraws(), fetchCompletedDraws()])
      setIsLoading(false)
    }
    fetchData()
  }, [])

  return {
    activeDraws,
    completedDraws,
    isLoading,
    refetch: () => Promise.all([fetchActiveDraws(), fetchCompletedDraws()]),
  }
}
