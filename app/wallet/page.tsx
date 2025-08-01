/** @format */

'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { useWallet } from '@/hooks/use-wallet';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Wallet,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  Shield,
  Banknote,
  Zap,
  AlertCircle,
} from 'lucide-react';
import { WalletActionsModal } from '@/components/WalletActionsModal';
import { Badge } from '@/components/ui/badge';

export default function WalletPage() {
  const { user } = useAuth();
  const {
    walletDetails,
    isLoading,
    isProcessing,
    topupWallet,
    withdrawFromWallet,
    refetch,
  } = useWallet();
  const [modalOpen, setModalOpen] = useState(false);

  if (!user) {
    return <div>Loading...</div>;
  }

  const transactionLimits = [
    {
      label: 'Minimum Top-up',
      value: '₦100',
      icon: <Zap className='w-4 h-4 text-yellow-500' />,
    },
    {
      label: 'Maximum Top-up',
      value: '₦1,000,000',
      icon: <Zap className='w-4 h-4 text-green-500' />,
    },
    {
      label: 'Minimum Withdrawal',
      value: '₦500',
      icon: <ArrowUpRight className='w-4 h-4 text-blue-500' />,
    },
    {
      label: 'Daily Limit',
      value: '₦5,000,000',
      icon: <AlertCircle className='w-4 h-4 text-purple-500' />,
    },
  ];

  return (
    <div className='min-h-screen bg-[hsl(var(--surface-primary))]'>
      <Navbar />

      <div className='max-w-6xl mx-auto container-padding py-12'>
        <div className='mb-12 animate-fade-in'>
          <h1 className='text-3xl font-bold mb-2'>My Wallet</h1>
          <p className='text-gray-600'>
            Manage your funds and track transactions
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Main Content */}
          <div className='lg:col-span-2 space-y-6'>
            {/* Balance Card */}
            <Card className='bg-white rounded-xl shadow-sm border-0'>
              <CardContent className='p-6'>
                <div className='flex flex-col items-center text-center space-y-4'>
                  <div className='w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center'>
                    <Wallet className='w-10 h-10 text-emerald-600' />
                  </div>
                  <div>
                    <p className='text-gray-500 mb-1'>Available Balance</p>
                    <p className='text-4xl font-bold text-emerald-600'>
                      ₦{user.wallet_balance?.toLocaleString() || '0.00'}
                    </p>
                  </div>
                  <Button
                    className='bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg'
                    onClick={() => setModalOpen(true)}
                  >
                    <Plus className='mr-2 w-5 h-5' />
                    Wallet Actions
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Transactions */}
            <Card className='bg-white rounded-xl shadow-sm border-0'>
              <CardHeader className='border-b px-6 py-4'>
                <CardTitle className='text-lg font-semibold'>
                  Recent Transactions
                </CardTitle>
              </CardHeader>
              <CardContent className='p-0'>
                {isLoading ? (
                  <div className='space-y-4 p-6'>
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className='flex items-center space-x-4'>
                        <div className='bg-gray-200 w-10 h-10 rounded-full animate-pulse'></div>
                        <div className='flex-1 space-y-2'>
                          <div className='bg-gray-200 h-4 w-32 rounded animate-pulse'></div>
                          <div className='bg-gray-200 h-3 w-24 rounded animate-pulse'></div>
                        </div>
                        <div className='bg-gray-200 h-4 w-16 rounded animate-pulse'></div>
                      </div>
                    ))}
                  </div>
                ) : walletDetails?.transactions?.length ? (
                  <div className='divide-y'>
                    {walletDetails.transactions
                      .slice(0, 5)
                      .map((transaction) => (
                        <div
                          key={transaction.id}
                          className='flex items-center p-4 hover:bg-gray-50 transition-colors'
                        >
                          <div
                            className={`p-3 rounded-full ${
                              transaction.type === 'credit'
                                ? 'bg-emerald-100'
                                : 'bg-red-100'
                            }`}
                          >
                            {transaction.type === 'credit' ? (
                              <ArrowDownLeft
                                className={`w-5 h-5 ${
                                  transaction.type === 'credit'
                                    ? 'text-emerald-600'
                                    : 'text-red-600'
                                }`}
                              />
                            ) : (
                              <ArrowUpRight
                                className={`w-5 h-5 ${
                                  transaction.type === 'credit'
                                    ? 'text-emerald-600'
                                    : 'text-red-600'
                                }`}
                              />
                            )}
                          </div>
                          <div className='ml-4 flex-1'>
                            <p className='font-medium'>
                              {transaction.description}
                            </p>
                            <p className='text-sm text-gray-500'>
                              {new Date(transaction.date).toLocaleDateString(
                                'en-US',
                                {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                }
                              )}
                            </p>
                          </div>
                          <div className='text-right'>
                            <p
                              className={`font-semibold ${
                                transaction.type === 'credit'
                                  ? 'text-emerald-600'
                                  : 'text-red-600'
                              }`}
                            >
                              {transaction.type === 'credit' ? '+' : '-'}₦
                              {transaction.amount.toLocaleString()}
                            </p>
                            <Badge
                              variant={
                                transaction.status === 'successful'
                                  ? 'success'
                                  : transaction.status === 'pending'
                                  ? 'warning'
                                  : 'destructive'
                              }
                              className='text-xs mt-1'
                            >
                              {transaction.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className='text-center p-8'>
                    <Wallet className='w-16 h-16 text-gray-400 mx-auto mb-4' />
                    <h3 className='text-xl font-semibold mb-2'>
                      No Transactions Yet
                    </h3>
                    <p className='text-gray-500 mb-6'>
                      Your transaction history will appear here
                    </p>
                    <Button
                      className='bg-emerald-600 hover:bg-emerald-700'
                      onClick={() => setModalOpen(true)}
                    >
                      Make Your First Transaction
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Cards */}
          <div className='space-y-6'>
            {/* Payment Methods */}
            <Card className='bg-white rounded-xl shadow-sm border-0'>
              <CardHeader className='border-b px-6 py-4'>
                <CardTitle className='flex items-center space-x-2'>
                  <Banknote className='w-5 h-5 text-blue-500' />
                  <span>Payment Methods</span>
                </CardTitle>
              </CardHeader>
              <CardContent className='p-6'>
                <div className='space-y-3'>
                  <div className='flex items-center p-3 bg-blue-50 rounded-lg'>
                    <CreditCard className='w-6 h-6 text-blue-500' />
                    <div className='ml-3'>
                      <p className='font-medium'>Cards</p>
                      <p className='text-sm text-gray-500'>
                        Visa, Mastercard, Verve
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center p-3 bg-green-50 rounded-lg'>
                    <div className='w-6 h-6 bg-green-500 rounded flex items-center justify-center'>
                      <span className='text-white text-xs font-bold'>B</span>
                    </div>
                    <div className='ml-3'>
                      <p className='font-medium'>Bank Transfer</p>
                      <p className='text-sm text-gray-500'>
                        All Nigerian banks
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Transaction Limits */}
            <Card className='bg-white rounded-xl shadow-sm border-0'>
              <CardHeader className='border-b px-6 py-4'>
                <CardTitle className='flex items-center space-x-2'>
                  <Zap className='w-5 h-5 text-yellow-500' />
                  <span>Transaction Limits</span>
                </CardTitle>
              </CardHeader>
              <CardContent className='p-6'>
                <div className='grid grid-cols-1 gap-3'>
                  {transactionLimits.map((limit, index) => (
                    <div
                      key={index}
                      className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'
                    >
                      <div className='flex items-center space-x-3'>
                        <div className='p-1.5 rounded-full bg-white shadow-xs'>
                          {limit.icon}
                        </div>
                        <span className='text-sm font-medium'>
                          {limit.label}
                        </span>
                      </div>
                      <span className='font-semibold'>{limit.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Security Info */}
            <Card className='bg-white rounded-xl shadow-sm border-0'>
              <CardHeader className='border-b px-6 py-4'>
                <CardTitle className='flex items-center space-x-2'>
                  <Shield className='w-5 h-5 text-purple-500' />
                  <span>Security</span>
                </CardTitle>
              </CardHeader>
              <CardContent className='p-6'>
                <div className='text-center'>
                  <div className='w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                    <Shield className='w-6 h-6 text-purple-600' />
                  </div>
                  <h3 className='font-semibold mb-2'>Secure Transactions</h3>
                  <p className='text-sm text-gray-500'>
                    All transactions are encrypted and processed securely
                    through our PCI-DSS compliant partners.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />

      <WalletActionsModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        onTopup={topupWallet}
        onWithdraw={withdrawFromWallet}
        isProcessing={isProcessing}
      />
    </div>
  );
}
