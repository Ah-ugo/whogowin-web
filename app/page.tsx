/** @format */

'use client';

import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import {
  ArrowRight,
  Shield,
  Zap,
  Clock,
  Users,
  CheckCircle,
  Play,
  Trophy,
  Gift,
  Sparkles,
  BadgeCheck,
  TrendingUp,
  Aperture,
  CreditCard,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function HomePage() {
  return (
    <div className='min-h-screen bg-white'>
      <Navbar />

      {/* Hero Section */}
      <section className='relative py-20 md:py-32 bg-gradient-to-br from-gray-50 to-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center max-w-4xl mx-auto'>
            <Badge className='mb-6 bg-green-50 text-green-700 hover:bg-green-100 border-green-200'>
              <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2'></div>
              <span>Live draws happening now</span>
            </Badge>

            <h1 className='text-4xl md:text-6xl font-bold text-gray-900 mb-6'>
              Pick 5 Numbers.{' '}
              <span className='text-blue-600'>Win Big Prizes.</span>
            </h1>

            <p className='text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto'>
              Nigeria's most trusted lottery platform with transparent draws,
              instant payouts, and life-changing prizes. Join thousands of
              winners today.
            </p>

            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Button
                className='bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold'
                asChild
              >
                <Link href='/auth/register'>
                  <Play className='mr-2 w-5 h-5' />
                  Start Playing Now
                </Link>
              </Button>
              <Button
                variant='outline'
                className='border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg font-medium'
                asChild
              >
                <Link href='/draws'>
                  View Active Draws
                  <ArrowRight className='ml-2 w-5 h-5' />
                </Link>
              </Button>
            </div>

            <div className='mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center'>
              {[
                {
                  value: '₦2M+',
                  label: 'Total Prizes Won',
                  icon: (
                    <Trophy className='w-6 h-6 text-yellow-500 mx-auto mb-2' />
                  ),
                },
                {
                  value: '10K+',
                  label: 'Happy Players',
                  icon: (
                    <Users className='w-6 h-6 text-blue-500 mx-auto mb-2' />
                  ),
                },
                {
                  value: '500+',
                  label: 'Winners Created',
                  icon: (
                    <BadgeCheck className='w-6 h-6 text-green-500 mx-auto mb-2' />
                  ),
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className='bg-white p-6 rounded-lg border border-gray-200'
                >
                  {stat.icon}
                  <div className='text-3xl font-bold text-gray-900 mb-1'>
                    {stat.value}
                  </div>
                  <div className='text-gray-500'>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className='py-20 md:py-28 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
              How to Win in 3 Simple Steps
            </h2>
            <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
              Getting started is easy. Follow these simple steps and you could
              be our next big winner.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {[
              {
                step: '1',
                title: 'Pick Your Numbers',
                description:
                  'Choose 5 lucky numbers from 1-30, or let our Quick Pick feature select random numbers for you.',
                icon: (
                  <Aperture className='w-10 h-10 text-blue-600 mx-auto mb-4' />
                ),
                color: 'bg-blue-100',
              },
              {
                step: '2',
                title: 'Buy Your Ticket',
                description:
                  'Secure your ticket for just ₦100. Pay safely with your card or bank transfer through our encrypted system.',
                icon: (
                  <CreditCard className='w-10 h-10 text-purple-600 mx-auto mb-4' />
                ),
                color: 'bg-purple-100',
              },
              {
                step: '3',
                title: 'Win & Get Paid',
                description:
                  'Match numbers to win prizes up to ₦2M. All winnings are instantly credited to your wallet.',
                icon: (
                  <TrendingUp className='w-10 h-10 text-green-600 mx-auto mb-4' />
                ),
                color: 'bg-green-100',
              },
            ].map((item, index) => (
              <div key={index} className='text-center'>
                <div
                  className={`w-20 h-20 ${item.color} rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-gray-900`}
                >
                  {item.step}
                </div>
                {item.icon}
                <h3 className='text-xl font-bold text-gray-900 mb-3'>
                  {item.title}
                </h3>
                <p className='text-gray-600'>{item.description}</p>
              </div>
            ))}
          </div>

          <div className='text-center mt-16'>
            <Button
              className='bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold'
              asChild
            >
              <Link href='/auth/register'>
                Get Started - It's Free
                <ArrowRight className='ml-2 w-5 h-5' />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Active Draws Preview */}
      <section className='py-20 md:py-28 bg-gray-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
              Live Draws - Play Now
            </h2>
            <p className='text-lg text-gray-600'>
              Multiple chances to win every single day
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {[
              {
                type: 'Daily Draw',
                prize: '₦50,000',
                time: '8h 32m',
                status: 'Active',
                players: '234',
                gradient: 'from-blue-500 to-blue-600',
                icon: <Sparkles className='w-8 h-8 text-white' />,
              },
              {
                type: 'Weekly Draw',
                prize: '₦500,000',
                time: '3d 12h',
                status: 'Active',
                players: '1,247',
                gradient: 'from-purple-500 to-purple-600',
                icon: <Sparkles className='w-8 h-8 text-white' />,
              },
              {
                type: 'Monthly Draw',
                prize: '₦2,000,000',
                time: '18d 5h',
                status: 'Active',
                players: '5,891',
                gradient: 'from-green-500 to-green-600',
                icon: <Sparkles className='w-8 h-8 text-white' />,
              },
            ].map((draw, index) => (
              <Card key={index} className='hover:shadow-md transition-shadow'>
                <div className={`h-2 bg-gradient-to-r ${draw.gradient}`}></div>
                <CardContent className='p-6'>
                  <div className='flex justify-between items-start mb-6'>
                    <CardTitle className='text-xl font-bold'>
                      {draw.type}
                    </CardTitle>
                    <Badge variant='success'>{draw.status}</Badge>
                  </div>

                  <div className='text-center mb-6'>
                    <div className='text-3xl font-bold text-gray-900 mb-2'>
                      {draw.prize}
                    </div>
                    <div className='text-gray-500'>Prize Pool</div>
                  </div>

                  <div className='flex items-center justify-between bg-gray-50 rounded-lg p-3 mb-6'>
                    <div className='flex items-center space-x-2 text-gray-600'>
                      <Users className='w-4 h-4' />
                      <span>{draw.players} players</span>
                    </div>
                    <div className='flex items-center space-x-2 text-red-600'>
                      <Clock className='w-4 h-4' />
                      <span className='font-medium'>Ends in {draw.time}</span>
                    </div>
                  </div>

                  <Button
                    className='w-full bg-blue-600 hover:bg-blue-700'
                    asChild
                  >
                    <Link href='/draws'>
                      Play This Draw
                      <ArrowRight className='ml-2 w-4 h-4' />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className='text-center mt-10'>
            <Button
              variant='outline'
              className='border-gray-300 text-gray-700 hover:bg-gray-50'
              asChild
            >
              <Link href='/draws'>View All Draws</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Recent Winners */}
      <section className='py-20 md:py-28 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
              Recent Winners
            </h2>
            <p className='text-lg text-gray-600'>
              Real people, real wins. You could be next!
            </p>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
            {[
              {
                name: 'Adebayo O.',
                amount: '₦250,000',
                type: 'Weekly Draw',
                time: '2 hours ago',
                avatar: 'A',
                bg: 'from-yellow-400 to-yellow-500',
              },
              {
                name: 'Chioma N.',
                amount: '₦50,000',
                type: 'Daily Draw',
                time: '1 day ago',
                avatar: 'C',
                bg: 'from-blue-400 to-blue-500',
              },
              {
                name: 'Ibrahim K.',
                amount: '₦15,000',
                type: 'Daily Draw',
                time: '2 days ago',
                avatar: 'I',
                bg: 'from-purple-400 to-purple-500',
              },
              {
                name: 'Grace M.',
                amount: '₦100,000',
                type: 'Weekly Draw',
                time: '3 days ago',
                avatar: 'G',
                bg: 'from-green-400 to-green-500',
              },
            ].map((winner, index) => (
              <Card key={index} className='hover:shadow-md transition-shadow'>
                <CardContent className='pt-6 text-center'>
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${winner.bg} text-white rounded-full flex items-center justify-center mx-auto font-bold text-xl mb-4`}
                  >
                    {winner.avatar}
                  </div>
                  <h3 className='font-semibold text-gray-900 text-lg'>
                    {winner.name}
                  </h3>
                  <p className='text-2xl font-bold text-green-600 my-3'>
                    {winner.amount}
                  </p>
                  <p className='text-gray-500'>{winner.type}</p>
                  <p className='text-sm text-gray-400 mt-2'>{winner.time}</p>
                  <div className='mt-4'>
                    <Trophy className='w-5 h-5 text-yellow-500 mx-auto' />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className='py-20 md:py-28 bg-gray-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
              Why Choose Us
            </h2>
            <p className='text-lg text-gray-600'>
              Built for trust, designed for winners
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {[
              {
                icon: Shield,
                title: '100% Secure',
                description:
                  'Bank-level security with encrypted transactions and secure wallet storage.',
                color: 'text-green-600',
                bg: 'bg-green-100',
              },
              {
                icon: Zap,
                title: 'Instant Payouts',
                description:
                  'Win and get paid immediately. No waiting, no delays, just instant rewards.',
                color: 'text-yellow-600',
                bg: 'bg-yellow-100',
              },
              {
                icon: Clock,
                title: 'Multiple Draws Daily',
                description:
                  'Daily, weekly, and monthly draws give you more chances to win big.',
                color: 'text-blue-600',
                bg: 'bg-blue-100',
              },
              {
                icon: Users,
                title: 'Trusted Community',
                description:
                  'Join thousands of players and winners in our growing community.',
                color: 'text-purple-600',
                bg: 'bg-purple-100',
              },
              {
                icon: CheckCircle,
                title: 'Fair & Transparent',
                description:
                  'Provably fair draws with transparent results and public announcements.',
                color: 'text-indigo-600',
                bg: 'bg-indigo-100',
              },
              {
                icon: Gift,
                title: 'Bonus Rewards',
                description:
                  'Referral bonuses, loyalty rewards, and special promotions for active players.',
                color: 'text-pink-600',
                bg: 'bg-pink-100',
              },
            ].map((feature, index) => (
              <Card key={index} className='hover:shadow-md transition-shadow'>
                <CardContent className='p-6'>
                  <div
                    className={`w-12 h-12 ${feature.bg} rounded-lg flex items-center justify-center mb-4`}
                  >
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <h3 className='text-xl font-bold text-gray-900 mb-2'>
                    {feature.title}
                  </h3>
                  <p className='text-gray-600'>{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20 md:py-28 bg-gradient-to-br from-gray-900 to-gray-800 text-white'>
        <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <div className='mb-12'>
            <div className='text-6xl mb-6'>🎉</div>
            <h2 className='text-3xl md:text-4xl font-bold mb-4'>
              Ready to Win Big?
            </h2>
            <p className='text-lg text-gray-300 max-w-3xl mx-auto'>
              Join today and start your journey to becoming our next big winner.
              It only takes 2 minutes to get started.
            </p>
          </div>

          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button
              className='bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold'
              asChild
            >
              <Link href='/auth/register'>
                Create Free Account
                <ArrowRight className='ml-2 w-5 h-5' />
              </Link>
            </Button>
            <Button
              variant='outline'
              className='border-white text-white bg-gray-900 hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-medium'
              asChild
            >
              <Link href='/draws'>Browse Draws</Link>
            </Button>
          </div>

          <div className='mt-10 text-gray-400'>
            <p>🔒 Secure • 🏆 Licensed • ⚡ Instant Payouts</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
