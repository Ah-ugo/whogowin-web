/** @format */

import { api } from './api';
import type { WalletDetails, Transaction, PaystackResponse } from '@/types/api';

export const walletService = {
  async getBalance(): Promise<{ balance: number }> {
    const response = await api.get('/wallet/balance');
    return response.data;
  },

  async getWalletDetails(): Promise<WalletDetails> {
    const response = await api.get('/wallet/details');
    return response.data;
  },

  async topupWallet(amount: number): Promise<PaystackResponse> {
    const response = await api.post('/wallet/topup', { amount });
    return response.data;
  },

  async getTransactions(): Promise<Transaction[]> {
    const response = await api.get('/wallet/transactions');
    return response.data;
  },

  async verifyPayment(reference: string): Promise<any> {
    const response = await api.get(
      `/wallet/verify-payment?reference=${reference}`
    );
    return response.data;
  },

  async withdrawFromWallet(
    amount: number,
    accountName: string,
    bankName: string,
    accountNumber: string
  ): Promise<any> {
    const response = await api.post('/wallet/withdraw', {
      amount,
      account_name: accountName,
      bank_name: bankName,
      account_number: accountNumber,
    });
    return response.data;
  },
};
