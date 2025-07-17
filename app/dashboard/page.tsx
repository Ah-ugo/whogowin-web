/** @format */

'use client';
import { useAuth } from '@/contexts/auth-context';
import { useDraws } from '@/hooks/use-draws';
import { useWallet } from '@/hooks/use-wallet';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CountdownTimer } from '@/components/ui/countdown-timer';
import Link from 'next/link';
import {
  Wallet,
  Trophy,
  Ticket,
  Clock,
  Users,
  Gift,
  Star,
  ArrowRight,
  Play,
  TrendingUp,
} from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();
  const { activeDraws, completedDraws, isLoading: drawsLoading } = useDraws();
  const { walletDetails, isLoading: walletLoading } = useWallet();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <Navbar />

      <div className='max-w-7xl mx-auto container-padding py-8 sm:py-12'>
        {/* Welcome Section */}
        <div className='mb-8 sm:mb-12 animate-fade-in'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
            <div>
              <h1 className='text-heading-1 mb-2'>
                Welcome back, {user.name.split(' ')[0]}! 👋
              </h1>
              <p className='text-body'>
                Ready to pick your lucky numbers and win big today?
              </p>
            </div>
            <div className='flex flex-col sm:flex-row gap-3'>
              <Button className='btn-primary' asChild>
                <Link href='/draws'>
                  <Play className='mr-2 w-4 h-4' />
                  Play Now
                </Link>
              </Button>
              <Button className='btn-secondary' asChild>
                <Link href='/wallet'>
                  <Wallet className='mr-2 w-4 h-4' />
                  Top Up Wallet
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className='grid-responsive-4 gap-4 sm:gap-6 mb-8 sm:mb-12'>
          <Card className='card-primary hover-lift animate-slide-up bg-gradient-to-br from-green-50 to-green-100 border-green-200'>
            <CardContent className='pt-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-body-small text-green-700 font-medium mb-1'>
                    Wallet Balance
                  </p>
                  <p className='text-2xl sm:text-3xl font-bold text-green-800'>
                    ₦{user.wallet_balance.toLocaleString()}
                  </p>
                </div>
                <div className='w-12 h-12 sm:w-14 sm:h-14 bg-green-200 rounded-xl flex items-center justify-center'>
                  <Wallet className='h-6 w-6 sm:h-7 sm:w-7 text-green-700' />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className='card-primary hover-lift animate-slide-up bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200'
            style={{ animationDelay: '0.1s' }}
          >
            <CardContent className='pt-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-body-small text-blue-700 font-medium mb-1'>
                    Active Tickets
                  </p>
                  <p className='text-2xl sm:text-3xl font-bold text-blue-800'>
                    {activeDraws.reduce(
                      (sum, draw) => sum + draw.total_tickets,
                      0
                    )}
                  </p>
                </div>
                <div className='w-12 h-12 sm:w-14 sm:h-14 bg-blue-200 rounded-xl flex items-center justify-center'>
                  <Ticket className='h-6 w-6 sm:h-7 sm:w-7 text-blue-700' />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className='card-primary hover-lift animate-slide-up bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200'
            style={{ animationDelay: '0.2s' }}
          >
            <CardContent className='pt-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-body-small text-purple-700 font-medium mb-1'>
                    Referrals
                  </p>
                  <p className='text-2xl sm:text-3xl font-bold text-purple-800'>
                    {user.total_referrals}
                  </p>
                </div>
                <div className='w-12 h-12 sm:w-14 sm:h-14 bg-purple-200 rounded-xl flex items-center justify-center'>
                  <Users className='h-6 w-6 sm:h-7 sm:w-7 text-purple-700' />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className='card-primary hover-lift animate-slide-up bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200'
            style={{ animationDelay: '0.3s' }}
          >
            <CardContent className='pt-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-body-small text-yellow-700 font-medium mb-1'>
                    Total Wins
                  </p>
                  <p className='text-2xl sm:text-3xl font-bold text-yellow-800'>
                    0
                  </p>
                </div>
                <div className='w-12 h-12 sm:w-14 sm:h-14 bg-yellow-200 rounded-xl flex items-center justify-center'>
                  <Trophy className='h-6 w-6 sm:h-7 sm:w-7 text-yellow-700' />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className='grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8'>
          {/* Active Draws */}
          <div className='xl:col-span-2'>
            <Card className='card-primary'>
              <CardHeader>
                <div className='flex items-center justify-between'>
                  <CardTitle className='flex items-center space-x-2'>
                    <Clock className='w-5 h-5 text-blue-600' />
                    <span>Live Draws</span>
                  </CardTitle>
                  <Button variant='ghost' size='sm' asChild>
                    <Link
                      href='/draws'
                      className='text-blue-600 hover:text-blue-700'
                    >
                      View All
                      <ArrowRight className='ml-1 w-4 h-4' />
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {drawsLoading ? (
                  <div className='space-responsive'>
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className='skeleton h-32 sm:h-40 rounded-xl'
                      ></div>
                    ))}
                  </div>
                ) : activeDraws.length > 0 ? (
                  <div className='space-responsive'>
                    {activeDraws.slice(0, 3).map((draw, index) => (
                      <div
                        key={draw.id}
                        className='border border-gray-200 rounded-xl p-4 sm:p-6 hover:shadow-md transition-all duration-200 animate-slide-up bg-gradient-to-r from-white to-gray-50'
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 sm:mb-6'>
                          <div>
                            <h3 className='text-heading-4 mb-2'>
                              {draw.draw_type} Draw
                            </h3>
                            <div className='flex items-center space-x-4 text-body-small text-gray-600'>
                              <div className='flex items-center space-x-1'>
                                <Users className='w-4 h-4' />
                                <span>{draw.total_tickets} players</span>
                              </div>
                              <div className='flex items-center space-x-1'>
                                <TrendingUp className='w-4 h-4' />
                                <span>₦100/ticket</span>
                              </div>
                            </div>
                          </div>
                          <div className='text-center sm:text-right'>
                            <div className='text-2xl sm:text-3xl font-bold text-green-600 mb-1'>
                              ₦{draw.total_pot.toLocaleString()}
                            </div>
                            <span className='status-active'>Live Now</span>
                          </div>
                        </div>

                        <div className='mb-6'>
                          <p className='text-body-small text-gray-600 mb-3 text-center sm:text-left'>
                            Draw ends in:
                          </p>
                          <div className='flex justify-center sm:justify-start'>
                            <CountdownTimer endTime={draw.end_time} />
                          </div>
                        </div>

                        <Button className='btn-primary w-full' asChild>
                          <Link href={`/draws/${draw.id}`}>
                            <Play className='mr-2 w-4 h-4' />
                            Play This Draw
                          </Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className='text-center py-12 sm:py-16'>
                    <Clock className='w-16 h-16 sm:w-20 sm:h-20 text-gray-300 mx-auto mb-4 sm:mb-6' />
                    <h3 className='text-heading-3 mb-2'>No Active Draws</h3>
                    <p className='text-body mb-6 sm:mb-8'>
                      Check back soon for new draws!
                    </p>
                    <Button className='btn-secondary' asChild>
                      <Link href='/draws'>Browse All Draws</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className='space-responsive'>
            {/* Quick Actions */}
            <Card className='card-primary'>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className='space-y-3'>
                <Button className='btn-primary w-full justify-start' asChild>
                  <Link href='/draws'>
                    <Play className='mr-2 w-4 h-4' />
                    Browse Draws
                  </Link>
                </Button>
                <Button className='btn-secondary w-full justify-start' asChild>
                  <Link href='/wallet'>
                    <Wallet className='mr-2 w-4 h-4' />
                    Top Up Wallet
                  </Link>
                </Button>
                <Button className='btn-secondary w-full justify-start' asChild>
                  <Link href='/tickets'>
                    <Ticket className='mr-2 w-4 h-4' />
                    My Tickets
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Recent Winners */}
            <Card className='card-primary'>
              <CardHeader>
                <CardTitle className='flex items-center space-x-2'>
                  <Trophy className='w-5 h-5 text-yellow-600' />
                  <span>Recent Winners</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {drawsLoading ? (
                  <div className='space-y-4'>
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className='flex items-center space-x-3 p-3 rounded-lg'
                      >
                        <div className='w-10 h-10 bg-gray-200 rounded-full animate-pulse'></div>
                        <div className='flex-1 space-y-2'>
                          <div className='h-4 bg-gray-200 rounded w-3/4 animate-pulse'></div>
                          <div className='h-3 bg-gray-200 rounded w-1/2 animate-pulse'></div>
                        </div>
                        <div className='h-4 bg-gray-200 rounded w-1/4 animate-pulse'></div>
                      </div>
                    ))}
                  </div>
                ) : completedDraws.filter((draw) => draw.first_place_winner)
                    .length > 0 ? (
                  <div className='space-y-4'>
                    {completedDraws
                      .filter((draw) => draw.first_place_winner)
                      .slice(0, 3)
                      .map((draw, index) => (
                        <div
                          key={draw.id}
                          className='flex items-center space-x-3 animate-slide-up p-3 rounded-lg hover:bg-gray-50 transition-colors'
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <div className='w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center'>
                            <Star className='w-5 h-5 sm:w-6 sm:h-6 text-white' />
                          </div>
                          <div className='flex-1 min-w-0'>
                            <p className='font-medium text-gray-900 text-sm sm:text-base truncate'>
                              {draw.first_place_winner?.name || 'Anonymous'}
                            </p>
                            <p className='text-body-small text-gray-500'>
                              {draw.draw_type} Draw
                            </p>
                          </div>
                          <p className='font-bold text-green-600 text-sm sm:text-base'>
                            ₦
                            {draw.first_place_winner?.prize_amount.toLocaleString() ||
                              '0'}
                          </p>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className='text-center py-6'>
                    <Trophy className='w-12 h-12 text-gray-300 mx-auto mb-3' />
                    <p className='text-gray-500'>
                      No recent winners to display
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Referral Card */}
            <Card className='bg-gradient-to-br from-blue-600 to-blue-700 text-white border-0 card-primary'>
              <CardContent className='pt-6'>
                <div className='flex items-start space-x-3 mb-4'>
                  <Gift className='w-8 h-8 flex-shrink-0' />
                  <div>
                    <h3 className='font-semibold text-lg mb-1'>
                      Invite Friends & Earn
                    </h3>
                    <p className='text-sm opacity-90'>
                      Get bonus credits for every friend you refer
                    </p>
                  </div>
                </div>
                <div className='bg-white/10 rounded-lg p-3 mb-4'>
                  <p className='text-xs opacity-75 mb-1'>Your referral code:</p>
                  <p className='font-mono font-bold text-lg'>
                    {user.referral_code}
                  </p>
                </div>
                <Button className='bg-white text-blue-600 hover:bg-gray-100 w-full font-semibold'>
                  Share Your Code
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
