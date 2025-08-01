/** @format */

'use client';

import { useState, useEffect } from 'react';
import { walletService } from '@/services/wallet';
import type { WalletDetails } from '@/types/api';
import { useToast } from '@/hooks/use-toast';

interface WithdrawRequest {
  amount: number;
  account_number: string;
  account_name: string;
  bank_code: string;
}

export function useWallet() {
  const [walletDetails, setWalletDetails] = useState<WalletDetails | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const fetchWalletDetails = async () => {
    setIsLoading(true);
    try {
      const details = await walletService.getWalletDetails();
      setWalletDetails(details);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch wallet details',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const topupWallet = async (amount: number) => {
    setIsProcessing(true);
    try {
      const response = await walletService.topupWallet(amount);
      window.location.href = response.authorization_url; // Changed to redirect instead of new tab
      return response;
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to initialize payment',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };

  const withdrawFromWallet = async (data: WithdrawRequest) => {
    setIsProcessing(true);
    try {
      const response = await walletService.withdrawFromWallet(
        data.amount,
        data.account_name,
        data.bank_code,
        data.account_number
      );

      toast({
        title: 'Success',
        description: 'Withdrawal request submitted successfully',
      });

      await fetchWalletDetails();

      return response;
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to process withdrawal',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    fetchWalletDetails();
  }, []);

  return {
    walletDetails,
    isLoading,
    isProcessing,
    refetch: fetchWalletDetails,
    topupWallet,
    withdrawFromWallet,
  };
}
