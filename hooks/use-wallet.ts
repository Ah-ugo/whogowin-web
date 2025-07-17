"use client"

import { useState, useEffect } from "react"
import { walletService } from "@/services/wallet"
import type { WalletDetails } from "@/types/api"
import { useToast } from "@/hooks/use-toast"

export function useWallet() {
  const [walletDetails, setWalletDetails] = useState<WalletDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  const fetchWalletDetails = async () => {
    try {
      const details = await walletService.getWalletDetails()
      setWalletDetails(details)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch wallet details",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const topupWallet = async (amount: number) => {
    try {
      const response = await walletService.topupWallet(amount)
      window.open(response.authorization_url, "_blank")
      return response
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to initialize payment",
        variant: "destructive",
      })
      throw error
    }
  }

  useEffect(() => {
    fetchWalletDetails()
  }, [])

  return {
    walletDetails,
    isLoading,
    refetch: fetchWalletDetails,
    topupWallet,
  }
}
