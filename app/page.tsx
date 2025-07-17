/** @format */

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
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className='min-h-screen bg-white'>
      <Navbar />

      {/* Hero Section */}
      <section className='section-spacing bg-gradient-to-br from-gray-50 to-white'>
        <div className='max-w-7xl mx-auto container-padding'>
          <div className='text-center max-w-5xl mx-auto animate-fade-in'>
            <div className='inline-flex items-center space-x-2 bg-green-50 text-green-700 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-6 sm:mb-8 border border-green-200'>
              <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
              <span>Live draws happening now</span>
            </div>

            <h1 className='text-display mb-6 sm:mb-8'>
              Pick 5 Numbers.
              <br />
              <span className='text-blue-600'>Win Big Prizes.</span>
            </h1>

            <p className='text-body-large mb-8 sm:mb-12 max-w-3xl mx-auto'>
              Nigeria's most trusted lottery platform with transparent draws,
              instant payouts, and life-changing prizes. Join thousands of
              winners today.
            </p>

            <div className='flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mobile-stack'>
              <Button
                className='btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto'
                asChild
              >
                <Link href='/auth/register'>
                  <Play className='mr-2 w-4 h-4 sm:w-5 sm:h-5' />
                  Start Playing Now
                </Link>
              </Button>
              <Button
                className='btn-secondary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto'
                asChild
              >
                <Link href='/draws'>
                  View Active Draws
                  <ArrowRight className='ml-2 w-4 h-4 sm:w-5 sm:h-5' />
                </Link>
              </Button>
            </div>

            <div className='mt-12 sm:mt-16 grid-responsive-3 gap-6 sm:gap-8 text-center'>
              <div
                className='animate-slide-up'
                style={{ animationDelay: '0.2s' }}
              >
                <div className='text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2'>
                  ₦2M+
                </div>
                <div className='text-body'>Total Prizes Won</div>
              </div>
              <div
                className='animate-slide-up'
                style={{ animationDelay: '0.3s' }}
              >
                <div className='text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2'>
                  10K+
                </div>
                <div className='text-body'>Happy Players</div>
              </div>
              <div
                className='animate-slide-up'
                style={{ animationDelay: '0.4s' }}
              >
                <div className='text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2'>
                  500+
                </div>
                <div className='text-body'>Winners Created</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className='section-spacing'>
        <div className='max-w-7xl mx-auto container-padding'>
          <div className='text-center mb-12 sm:mb-16 animate-fade-in'>
            <h2 className='text-heading-1 mb-4 sm:mb-6'>
              How to Win in 3 Simple Steps
            </h2>
            <p className='text-body-large max-w-3xl mx-auto'>
              Getting started is easy. Follow these simple steps and you could
              be our next big winner.
            </p>
          </div>

          <div className='grid-responsive-3 gap-8 sm:gap-12'>
            {[
              {
                step: '1',
                title: 'Pick Your Numbers',
                description:
                  'Choose 5 lucky numbers from 1-30, or let our Quick Pick feature select random numbers for you.',
                icon: '🎯',
              },
              {
                step: '2',
                title: 'Buy Your Ticket',
                description:
                  'Secure your ticket for just ₦100. Pay safely with your card or bank transfer through our encrypted system.',
                icon: '🎫',
              },
              {
                step: '3',
                title: 'Win & Get Paid',
                description:
                  'Match numbers to win prizes up to ₦2M. All winnings are instantly credited to your wallet.',
                icon: '🏆',
              },
            ].map((item, index) => (
              <div
                key={index}
                className='text-center animate-slide-up'
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className='w-16 h-16 sm:w-20 sm:h-20 bg-gray-900 text-white rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6 text-xl sm:text-2xl font-bold hover-scale'>
                  {item.step}
                </div>
                <div className='text-4xl sm:text-5xl mb-4'>{item.icon}</div>
                <h3 className='text-heading-3 mb-3 sm:mb-4'>{item.title}</h3>
                <p className='text-body max-w-sm mx-auto'>{item.description}</p>
              </div>
            ))}
          </div>

          <div className='text-center mt-12 sm:mt-16 animate-fade-in'>
            <Button
              className='btn-accent text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4'
              asChild
            >
              <Link href='/auth/register'>
                Get Started - It's Free
                <ArrowRight className='ml-2 w-4 h-4 sm:w-5 sm:h-5' />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Active Draws Preview */}
      <section className='section-spacing bg-gray-50'>
        <div className='max-w-7xl mx-auto container-padding'>
          <div className='text-center mb-12 sm:mb-16 animate-fade-in'>
            <h2 className='text-heading-1 mb-4 sm:mb-6'>
              Live Draws - Play Now
            </h2>
            <p className='text-body-large'>
              Multiple chances to win every single day
            </p>
          </div>

          <div className='grid-responsive-3 gap-6 sm:gap-8'>
            {[
              {
                type: 'Daily Draw',
                prize: '₦50,000',
                time: '8h 32m',
                status: 'Active',
                players: '234',
                gradient: 'from-blue-500 to-blue-600',
              },
              {
                type: 'Weekly Draw',
                prize: '₦500,000',
                time: '3d 12h',
                status: 'Active',
                players: '1,247',
                gradient: 'from-purple-500 to-purple-600',
              },
              {
                type: 'Monthly Draw',
                prize: '₦2,000,000',
                time: '18d 5h',
                status: 'Active',
                players: '5,891',
                gradient: 'from-green-500 to-green-600',
              },
            ].map((draw, index) => (
              <Card
                key={index}
                className='card-interactive animate-scale-in overflow-hidden'
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`h-2 bg-gradient-to-r ${draw.gradient}`}></div>
                <CardHeader className='pb-4'>
                  <div className='flex justify-between items-start'>
                    <CardTitle className='text-heading-4'>
                      {draw.type}
                    </CardTitle>
                    <span className='status-active'>{draw.status}</span>
                  </div>
                </CardHeader>
                <CardContent className='space-y-6'>
                  <div className='text-center'>
                    <div className='text-3xl sm:text-4xl font-bold text-gray-900 mb-2'>
                      {draw.prize}
                    </div>
                    <div className='text-body-small text-gray-500'>
                      Prize Pool
                    </div>
                  </div>

                  <div className='flex justify-between items-center text-body-small bg-gray-50 rounded-lg p-3'>
                    <div className='flex items-center space-x-2'>
                      <Users className='w-4 h-4 text-gray-400' />
                      <span>{draw.players} players</span>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <Clock className='w-4 h-4 text-red-500' />
                      <span className='text-red-600 font-medium'>
                        Ends in {draw.time}
                      </span>
                    </div>
                  </div>

                  <Button className='btn-primary w-full' asChild>
                    <Link href='/draws'>
                      Play This Draw
                      <ArrowRight className='ml-2 w-4 h-4' />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className='text-center mt-8 sm:mt-12 animate-fade-in'>
            <Button className='btn-secondary' asChild>
              <Link href='/draws'>View All Draws</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Recent Winners */}
      <section className='section-spacing'>
        <div className='max-w-7xl mx-auto container-padding'>
          <div className='text-center mb-12 sm:mb-16 animate-fade-in'>
            <h2 className='text-heading-1 mb-4 sm:mb-6'>Recent Winners</h2>
            <p className='text-body-large'>
              Real people, real wins. You could be next!
            </p>
          </div>

          <div className='grid-responsive-4 gap-6'>
            {[
              {
                name: 'Adebayo O.',
                amount: '₦250,000',
                type: 'Weekly Draw',
                time: '2 hours ago',
                avatar: 'A',
              },
              {
                name: 'Chioma N.',
                amount: '₦50,000',
                type: 'Daily Draw',
                time: '1 day ago',
                avatar: 'C',
              },
              {
                name: 'Ibrahim K.',
                amount: '₦15,000',
                type: 'Daily Draw',
                time: '2 days ago',
                avatar: 'I',
              },
              {
                name: 'Grace M.',
                amount: '₦100,000',
                type: 'Weekly Draw',
                time: '3 days ago',
                avatar: 'G',
              },
            ].map((winner, index) => (
              <Card
                key={index}
                className='card-primary text-center animate-bounce-in'
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className='pt-6 space-y-4'>
                  <div className='w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 text-white rounded-full flex items-center justify-center mx-auto font-bold text-lg sm:text-xl'>
                    {winner.avatar}
                  </div>
                  <div>
                    <h3 className='font-semibold text-gray-900 text-base sm:text-lg'>
                      {winner.name}
                    </h3>
                    <p className='text-2xl sm:text-3xl font-bold text-green-600 my-2'>
                      {winner.amount}
                    </p>
                    <p className='text-body-small text-gray-500'>
                      {winner.type}
                    </p>
                    <p className='text-body-small text-gray-400'>
                      {winner.time}
                    </p>
                  </div>
                  <div className='flex justify-center'>
                    <Trophy className='w-5 h-5 text-yellow-500' />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className='section-spacing bg-gray-50'>
        <div className='max-w-7xl mx-auto container-padding'>
          <div className='text-center mb-12 sm:mb-16 animate-fade-in'>
            <h2 className='text-heading-1 mb-4 sm:mb-6'>Why Choose WhoGoWin</h2>
            <p className='text-body-large'>
              Built for trust, designed for winners
            </p>
          </div>

          <div className='grid-responsive-3 gap-6 sm:gap-8'>
            {[
              {
                icon: Shield,
                title: '100% Secure',
                description:
                  'Bank-level security with encrypted transactions and secure wallet storage.',
                color: 'text-green-600',
                bg: 'bg-green-50',
              },
              {
                icon: Zap,
                title: 'Instant Payouts',
                description:
                  'Win and get paid immediately. No waiting, no delays, just instant rewards.',
                color: 'text-yellow-600',
                bg: 'bg-yellow-50',
              },
              {
                icon: Clock,
                title: 'Multiple Draws Daily',
                description:
                  'Daily, weekly, and monthly draws give you more chances to win big.',
                color: 'text-blue-600',
                bg: 'bg-blue-50',
              },
              {
                icon: Users,
                title: 'Trusted Community',
                description:
                  'Join thousands of players and winners in our growing community.',
                color: 'text-purple-600',
                bg: 'bg-purple-50',
              },
              {
                icon: CheckCircle,
                title: 'Fair & Transparent',
                description:
                  'Provably fair draws with transparent results and public announcements.',
                color: 'text-indigo-600',
                bg: 'bg-indigo-50',
              },
              {
                icon: Gift,
                title: 'Bonus Rewards',
                description:
                  'Referral bonuses, loyalty rewards, and special promotions for active players.',
                color: 'text-pink-600',
                bg: 'bg-pink-50',
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className='card-primary hover-lift animate-slide-up'
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className='pt-6 space-y-4'>
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 ${feature.bg} rounded-xl flex items-center justify-center`}
                  >
                    <feature.icon
                      className={`w-6 h-6 sm:w-7 sm:h-7 ${feature.color}`}
                    />
                  </div>
                  <h3 className='text-heading-4'>{feature.title}</h3>
                  <p className='text-body'>{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='section-spacing bg-gradient-to-br from-gray-900 to-gray-800 text-white'>
        <div className='max-w-5xl mx-auto text-center container-padding animate-fade-in'>
          <div className='mb-8'>
            <div className='text-6xl sm:text-7xl md:text-8xl mb-6'>🎉</div>
            <h2 className='text-heading-1 text-white mb-4 sm:mb-6'>
              Ready to Win Big?
            </h2>
            <p className='text-body-large1 mb-8 sm:mb-12 opacity-70 max-w-3xl mx-auto'>
              Join WhoGoWin today and start your journey to becoming our next
              big winner. It only takes 2 minutes to get started.
            </p>
          </div>

          <div className='flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mobile-stack max-w-md mx-auto'>
            <Button
              className='bg-white text-gray-900 hover:bg-gray-100 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto font-semibold'
              asChild
            >
              <Link href='/auth/register'>
                Create Free Account
                <ArrowRight className='ml-2 w-4 h-4 sm:w-5 sm:h-5' />
              </Link>
            </Button>
            <Button
              variant='outline'
              className='border-white text-white hover:bg-white hover:text-gray-900 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 bg-transparent w-full sm:w-auto'
              asChild
            >
              <Link href='/draws'>Browse Draws</Link>
            </Button>
          </div>

          <div className='mt-8 sm:mt-12 text-body-small opacity-75'>
            <p>🔒 Secure • 🏆 Licensed • ⚡ Instant Payouts</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
