/** @format */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ArrowLeft, MailCheck } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        'https://whogowin.onrender.com/api/v1/auth/forgot-password',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        setEmailSent(true);
        toast({
          title: 'Email sent',
          description:
            'If an account exists, a reset link has been sent to your email address.',
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send reset email');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className='flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4'>
        <div className='w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-sm border border-gray-200'>
          <div className='flex flex-col items-center space-y-4 text-center'>
            <div className='rounded-full bg-green-100 p-4'>
              <MailCheck className='h-8 w-8 text-green-600' />
            </div>
            <h1 className='text-2xl font-bold tracking-tight'>
              Check your email
            </h1>
            <p className='text-gray-600'>
              We've sent a password reset link to{' '}
              <span className='font-medium'>{email}</span>. If you don't see it,
              check your spam folder.
            </p>
          </div>

          <div className='flex justify-center'>
            <Button onClick={() => router.push('/auth/login')} className='mt-6'>
              Return to login
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4'>
      <div className='w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-sm border border-gray-200'>
        <div className='space-y-2 text-center'>
          <Link
            href='/auth/login'
            className='flex items-center justify-center text-gray-600 hover:text-gray-900 mb-4'
          >
            <ArrowLeft className='mr-2 h-4 w-4' />
            Back to login
          </Link>

          <h1 className='text-2xl font-bold tracking-tight'>
            Forgot your password?
          </h1>
          <p className='text-gray-600'>
            Enter your email and we'll send you a link to reset your password.
          </p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='email'>Email address</Label>
            <Input
              id='email'
              type='email'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <Button type='submit' className='w-full' disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Sending...
              </>
            ) : (
              'Send reset link'
            )}
          </Button>
        </form>

        <div className='text-center text-sm text-gray-500 mt-4'>
          Remember your password?{' '}
          <Link
            href='/auth/login'
            className='font-medium text-blue-600 hover:text-blue-500'
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
