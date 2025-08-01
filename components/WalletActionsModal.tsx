/** @format */

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Loader2, Plus, ArrowUpRight, CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface WalletActionsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTopup: (amount: number) => Promise<void>;
  onWithdraw: (data: {
    amount: number;
    account_number: string;
    account_name: string;
    bank_code: string;
  }) => Promise<void>;
  isProcessing: boolean;
}

export function WalletActionsModal({
  open,
  onOpenChange,
  onTopup,
  onWithdraw,
  isProcessing,
}: WalletActionsModalProps) {
  const [activeTab, setActiveTab] = useState<'topup' | 'withdraw'>('topup');
  const [topupAmount, setTopupAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [bankDetails, setBankDetails] = useState({
    accountNumber: '',
    accountName: '',
    bankCode: '044', // Default bank code (e.g., Access Bank)
  });
  const { toast } = useToast();

  const handleTopup = async () => {
    const amount = Number(topupAmount);
    if (!amount || amount < 100) {
      toast({
        title: 'Invalid Amount',
        description: 'Minimum top-up amount is ₦100',
        variant: 'destructive',
      });
      return;
    }
    await onTopup(amount);
  };

  const handleWithdraw = async () => {
    const amount = Number(withdrawAmount);
    if (!amount || amount < 100) {
      toast({
        title: 'Invalid Amount',
        description: 'Minimum withdrawal amount is ₦100',
        variant: 'destructive',
      });
      return;
    }

    if (!bankDetails.accountNumber || !bankDetails.accountName) {
      toast({
        title: 'Incomplete Details',
        description: 'Please provide all bank details',
        variant: 'destructive',
      });
      return;
    }

    await onWithdraw({
      amount,
      account_number: bankDetails.accountNumber,
      account_name: bankDetails.accountName,
      bank_code: bankDetails.bankCode,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px] max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle className='text-center'>
            {activeTab === 'topup' ? 'Top Up Wallet' : 'Withdraw Funds'}
          </DialogTitle>
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as 'topup' | 'withdraw')}
          className='w-full'
        >
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='topup'>Top Up</TabsTrigger>
            <TabsTrigger value='withdraw'>Withdraw</TabsTrigger>
          </TabsList>

          <TabsContent value='topup' className='space-y-4 mt-4'>
            <div className='space-y-2'>
              <Label htmlFor='topup-amount'>Amount (₦)</Label>
              <Input
                id='topup-amount'
                type='number'
                placeholder='Enter amount'
                value={topupAmount}
                onChange={(e) => setTopupAmount(e.target.value)}
                min='100'
              />
              <p className='text-sm text-muted-foreground'>
                Minimum amount: ₦100
              </p>
            </div>

            <div className='grid grid-cols-3 gap-2'>
              {[500, 1000, 5000].map((amount) => (
                <Button
                  key={amount}
                  variant='outline'
                  size='sm'
                  onClick={() => setTopupAmount(amount.toString())}
                >
                  ₦{amount.toLocaleString()}
                </Button>
              ))}
            </div>

            <Button
              className='w-full mt-4'
              onClick={handleTopup}
              disabled={!topupAmount || isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className='mr-2 h-4 w-4' />
                  Proceed to Payment
                </>
              )}
            </Button>
          </TabsContent>

          <TabsContent value='withdraw' className='space-y-4 mt-4'>
            <div className='space-y-2'>
              <Label htmlFor='withdraw-amount'>Amount (₦)</Label>
              <Input
                id='withdraw-amount'
                type='number'
                placeholder='Enter amount'
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                min='100'
              />
              <p className='text-sm text-muted-foreground'>
                Minimum withdrawal: ₦100
              </p>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='account-number'>Account Number</Label>
              <Input
                id='account-number'
                placeholder='Enter account number'
                value={bankDetails.accountNumber}
                onChange={(e) =>
                  setBankDetails({
                    ...bankDetails,
                    accountNumber: e.target.value,
                  })
                }
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='account-name'>Account Name</Label>
              <Input
                id='account-name'
                placeholder='Enter account name'
                value={bankDetails.accountName}
                onChange={(e) =>
                  setBankDetails({
                    ...bankDetails,
                    accountName: e.target.value,
                  })
                }
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='bank-code'>Bank</Label>
              <select
                id='bank-code'
                value={bankDetails.bankCode}
                onChange={(e) =>
                  setBankDetails({ ...bankDetails, bankCode: e.target.value })
                }
                className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
              >
                <option value='044'>Access Bank</option>
                <option value='063'>Access (Diamond) Bank</option>
                <option value='035A'>ALAT by WEMA</option>
                <option value='023'>Citibank Nigeria</option>
                <option value='050'>Ecobank Nigeria</option>
                <option value='070'>Fidelity Bank</option>
                <option value='011'>First Bank of Nigeria</option>
                <option value='214'>First City Monument Bank</option>
                <option value='058'>Guaranty Trust Bank</option>
                <option value='030'>Heritage Bank</option>
                <option value='301'>Jaiz Bank</option>
                <option value='082'>Keystone Bank</option>
                <option value='076'>Polaris Bank</option>
                <option value='101'>Providus Bank</option>
                <option value='221'>Stanbic IBTC Bank</option>
                <option value='068'>Standard Chartered Bank</option>
                <option value='232'>Sterling Bank</option>
                <option value='100'>Suntrust Bank</option>
                <option value='032'>Union Bank of Nigeria</option>
                <option value='033'>United Bank For Africa</option>
                <option value='215'>Unity Bank</option>
                <option value='035'>Wema Bank</option>
                <option value='057'>Zenith Bank</option>
              </select>
            </div>

            <Button
              className='w-full mt-4'
              onClick={handleWithdraw}
              disabled={!withdrawAmount || isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Processing...
                </>
              ) : (
                <>
                  <ArrowUpRight className='mr-2 h-4 w-4' />
                  Request Withdrawal
                </>
              )}
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
