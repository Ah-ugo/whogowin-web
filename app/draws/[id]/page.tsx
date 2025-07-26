/** @format */

'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { drawsService } from '@/services/draws';
import { ticketsService } from '@/services/tickets';
import type { Draw, Ticket, Winner } from '@/types/api';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { NumberSelector } from '@/components/ui/number-selector';
import { CountdownTimer } from '@/components/ui/countdown-timer';
import { useToast } from '@/hooks/use-toast';
import {
  Trophy,
  CheckCircle,
  Loader2,
  ArrowLeft,
  Users,
  Award,
  Star,
  Ticket as TicketIcon,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function DrawDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const { toast } = useToast();
  const [draw, setDraw] = useState<Draw | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPurchasing, setIsPurchasing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const drawData = await drawsService.getDraw(params.id as string);
        setDraw(drawData);

        // Fetch tickets for this specific draw
        const drawTickets = await ticketsService.getTicketsByDraw(
          params.id as string
        );
        setTickets(drawTickets);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load draw details',
          variant: 'destructive',
        });
        router.push('/draws');
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchData();
    }
  }, [params.id, router, toast]);

  const handlePurchaseTicket = async () => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    if (selectedNumbers.length !== 5) {
      toast({
        title: 'Invalid Selection',
        description: 'Please select exactly 5 numbers',
        variant: 'destructive',
      });
      return;
    }

    if (user.wallet_balance < 100) {
      toast({
        title: 'Insufficient Balance',
        description: 'Please top up your wallet to buy tickets',
        variant: 'destructive',
      });
      router.push('/wallet');
      return;
    }

    setIsPurchasing(true);

    try {
      const newTicket = await ticketsService.buyTicket(
        draw!.id,
        100,
        selectedNumbers
      );
      toast({
        title: 'Ticket Purchased! 🎉',
        description: 'Your ticket has been purchased successfully. Good luck!',
      });
      setSelectedNumbers([]);
      setTickets([...tickets, newTicket]);

      // Refresh draw data to update totals
      const updatedDraw = await drawsService.getDraw(params.id as string);
      setDraw(updatedDraw);
    } catch (error: any) {
      toast({
        title: 'Purchase Failed',
        description:
          error.response?.data?.detail || 'Failed to purchase ticket',
        variant: 'destructive',
      });
    } finally {
      setIsPurchasing(false);
    }
  };

  const renderWinnerSection = (winner: Winner | null, isFirstPlace = false) => {
    if (!winner) return null;

    const winnerTicket = tickets.find(
      (t) => t.user_id === winner.user_id && t.is_winner
    );

    return (
      <div
        className={`${
          isFirstPlace
            ? 'bg-yellow-50 border-yellow-200'
            : 'bg-blue-50 border-blue-200'
        } border rounded-xl p-4 mb-4`}
      >
        <div className='flex items-center space-x-3'>
          {isFirstPlace ? (
            <Trophy className='w-6 h-6 text-yellow-600' />
          ) : (
            <Award className='w-6 h-6 text-blue-600' />
          )}
          <div>
            <p className='font-medium'>
              {isFirstPlace ? '🎉 Jackpot Winner' : '🏆 Consolation Winner'}:{' '}
              {winner.name || 'Anonymous'}
            </p>
            <p className='text-sm text-gray-600'>
              Prize: ₦{winner.prize_amount?.toLocaleString()}
              {winnerTicket && ` • Matched ${winnerTicket.match_count} numbers`}
            </p>

            {winnerTicket && (
              <div className='mt-2'>
                <p className='text-xs text-gray-500 mb-1'>Selected numbers:</p>
                <div className='flex flex-wrap gap-2'>
                  {winnerTicket.selected_numbers.map((num, idx) => (
                    <span
                      key={idx}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        draw?.winning_numbers.includes(num)
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {num}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gray-50'>
        <Navbar />
        <div className='max-w-6xl mx-auto container-padding py-12'>
          <div className='space-y-8'>
            <div className='skeleton h-8 w-64'></div>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
              <div className='lg:col-span-2 space-y-8'>
                <Card className='card-primary'>
                  <CardHeader>
                    <div className='skeleton h-6 w-32'></div>
                  </CardHeader>
                  <CardContent>
                    <div className='skeleton h-64 w-full'></div>
                  </CardContent>
                </Card>
              </div>
              <div className='space-y-6'>
                <Card className='card-primary'>
                  <CardHeader>
                    <div className='skeleton h-6 w-24'></div>
                  </CardHeader>
                  <CardContent>
                    <div className='skeleton h-32 w-full'></div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!draw) {
    return null;
  }

  const isActive = draw.status === 'active';
  const isCompleted = draw.status === 'completed';
  const userTickets = tickets.filter((t) => t.user_id === user?.id);

  return (
    <div className='min-h-screen bg-gray-50'>
      <Navbar />

      <div className='max-w-6xl mx-auto container-padding py-12'>
        <div className='mb-8 animate-fade-in'>
          <Button
            variant='ghost'
            onClick={() => router.back()}
            className='mb-4 text-gray-600 hover:text-gray-900'
          >
            <ArrowLeft className='mr-2 w-4 h-4' />
            Back to Draws
          </Button>
          <div className='flex items-center justify-between mb-4'>
            <h1 className='text-3xl font-bold tracking-tight'>
              {draw.draw_type} Draw #{draw.id.slice(-6)}
            </h1>
            <Badge variant={isActive ? 'default' : 'secondary'}>
              {isActive ? 'Active' : 'Completed'}
            </Badge>
          </div>
          <p className='text-gray-600'>
            {isActive
              ? 'Pick your lucky numbers and join the draw'
              : 'View draw results and winners'}
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Main Content */}
          <div className='lg:col-span-2 space-y-8'>
            {isActive && (
              <Card className='card-primary animate-slide-up'>
                <CardHeader>
                  <CardTitle>Select Your Numbers</CardTitle>
                  <CardDescription>
                    Choose 5 numbers between 1-30
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <NumberSelector
                    selectedNumbers={selectedNumbers}
                    onNumbersChange={setSelectedNumbers}
                    disabled={!isActive}
                  />

                  {user && (
                    <div className='mt-8 p-6 bg-gray-100 rounded-xl'>
                      <div className='flex items-center justify-between mb-4'>
                        <span className='font-medium text-gray-900'>
                          Ticket Price:
                        </span>
                        <span className='text-2xl font-bold text-gray-900'>
                          ₦100
                        </span>
                      </div>
                      <div className='flex items-center justify-between mb-6'>
                        <span className='font-medium text-gray-900'>
                          Your Balance:
                        </span>
                        <span
                          className={`font-bold ${
                            user.wallet_balance >= 100
                              ? 'text-green-600'
                              : 'text-red-600'
                          }`}
                        >
                          ₦{user.wallet_balance.toLocaleString()}
                        </span>
                      </div>
                      <Button
                        className='w-full'
                        onClick={handlePurchaseTicket}
                        disabled={
                          selectedNumbers.length !== 5 ||
                          isPurchasing ||
                          user.wallet_balance < 100
                        }
                      >
                        {isPurchasing ? (
                          <>
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                            Purchasing...
                          </>
                        ) : (
                          'Buy Ticket'
                        )}
                      </Button>
                    </div>
                  )}

                  {!user && (
                    <div className='mt-8 p-6 bg-blue-50 rounded-xl text-center'>
                      <p className='mb-4 text-gray-600'>
                        Sign in to purchase tickets
                      </p>
                      <Button className='w-full' asChild>
                        <a href='/auth/login'>Sign In</a>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Winning Numbers Section */}
            {isCompleted && draw.winning_numbers.length > 0 && (
              <Card className='card-primary animate-slide-up'>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <Trophy className='w-5 h-5 text-yellow-600' />
                    <span>Winning Numbers</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='flex flex-wrap gap-4 justify-center mb-8'>
                    {draw.winning_numbers.map((number, index) => (
                      <div
                        key={index}
                        className='w-16 h-16 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg animate-scale-in'
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        {number}
                      </div>
                    ))}
                  </div>

                  {/* Winners Section */}
                  <div className='space-y-4'>
                    {renderWinnerSection(draw.first_place_winner, true)}

                    {draw.consolation_winners.length > 0 && (
                      <div>
                        <h4 className='font-medium text-lg flex items-center gap-2 mb-3'>
                          <Award className='w-5 h-5 text-blue-600' />
                          Consolation Winners ({draw.consolation_winners.length}
                          )
                        </h4>
                        <div className='space-y-3'>
                          {draw.consolation_winners.map((winner, index) =>
                            renderWinnerSection(winner, false)
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* All Tickets Section */}
            {tickets.length > 0 && (
              <Card className='card-primary'>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <TicketIcon className='w-5 h-5 text-purple-600' />
                    <span>All Tickets ({tickets.length})</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    {tickets.map((ticket) => (
                      <div key={ticket.id} className='border rounded-lg p-4'>
                        <div className='flex justify-between items-start'>
                          <div>
                            <p className='font-medium'>
                              {ticket.user_name || 'Anonymous'}
                              {ticket.user_id === user?.id && ' (You)'}
                            </p>
                            <p className='text-sm text-gray-500'>
                              Purchased:{' '}
                              {new Date(ticket.purchase_date).toLocaleString()}
                            </p>
                          </div>
                          {ticket.is_winner ? (
                            <Badge variant='outline'>Winner</Badge>
                          ) : (
                            <Badge variant='secondary'>
                              {ticket.status === 'completed'
                                ? 'Completed'
                                : 'Active'}
                            </Badge>
                          )}
                        </div>

                        <div className='mt-3'>
                          <p className='text-sm text-gray-600 mb-2'>
                            Selected numbers:
                          </p>
                          <div className='flex flex-wrap gap-2'>
                            {ticket.selected_numbers.map((num, idx) => (
                              <span
                                key={idx}
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                                  isCompleted &&
                                  draw.winning_numbers.includes(num)
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-gray-100 text-gray-800'
                                }`}
                              >
                                {num}
                              </span>
                            ))}
                          </div>
                        </div>

                        {isCompleted && (
                          <div className='mt-3 pt-3 border-t'>
                            <p className='text-sm text-gray-600'>
                              Matched {ticket.match_count} number
                              {ticket.match_count !== 1 ? 's' : ''}
                            </p>
                            {ticket.is_winner && ticket.prize_amount && (
                              <p className='text-sm font-medium text-green-600 mt-1'>
                                Won ₦{ticket.prize_amount.toLocaleString()}!
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className='space-y-6'>
            {/* Draw Info */}
            <Card
              className='card-primary animate-slide-up'
              style={{ animationDelay: '0.1s' }}
            >
              <CardHeader>
                <CardTitle>Draw Information</CardTitle>
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className='text-center'>
                  <div className='text-4xl font-bold text-green-600 mb-2'>
                    ₦{draw.total_pot.toLocaleString()}
                  </div>
                  <div className='text-sm text-gray-500'>Total Prize Pool</div>
                </div>

                <div className='grid grid-cols-2 gap-4 text-center'>
                  <div>
                    <div className='text-2xl font-bold text-blue-600'>
                      {draw.total_tickets}
                    </div>
                    <div className='text-sm text-gray-500'>Tickets Sold</div>
                  </div>
                  <div>
                    <div className='text-2xl font-bold text-gray-900'>₦100</div>
                    <div className='text-sm text-gray-500'>Per Ticket</div>
                  </div>
                </div>

                {isActive && (
                  <div className='text-center'>
                    <p className='text-sm text-gray-500 mb-3'>Draw ends in:</p>
                    <CountdownTimer endTime={draw.end_time} />
                  </div>
                )}

                <Separator />

                <div className='space-y-3 text-sm'>
                  <div className='flex justify-between'>
                    <span className='text-gray-500'>Started:</span>
                    <span className='text-gray-900'>
                      {new Date(draw.start_time).toLocaleDateString()}
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-gray-500'>Ends:</span>
                    <span className='text-gray-900'>
                      {new Date(draw.end_time).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* How to Win */}
            <Card
              className='card-primary animate-slide-up'
              style={{ animationDelay: '0.2s' }}
            >
              <CardHeader>
                <CardTitle>How to Win</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                {[
                  {
                    matches: 5,
                    prize: 'Jackpot (90% of pot)',
                    color: 'yellow',
                  },
                  {
                    matches: 4,
                    prize: 'Consolation Prize (5% of pot)',
                    color: 'blue',
                  },
                  {
                    matches: 3,
                    prize: 'Small Prize (3% of pot)',
                    color: 'purple',
                  },
                  {
                    matches: 2,
                    prize: 'Bonus Credits (2% of pot)',
                    color: 'gray',
                  },
                ].map((item, index) => (
                  <div key={index} className='flex items-start space-x-3'>
                    <div
                      className={`mt-1 w-5 h-5 rounded-full bg-${item.color}-100 flex items-center justify-center`}
                    >
                      <CheckCircle
                        className={`w-4 h-4 text-${item.color}-600`}
                      />
                    </div>
                    <div>
                      <p className='font-medium'>
                        Match {item.matches} numbers
                      </p>
                      <p className='text-sm text-gray-500'>{item.prize}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* User's Tickets */}
            {user && userTickets.length > 0 && (
              <Card
                className='card-primary animate-slide-up'
                style={{ animationDelay: '0.3s' }}
              >
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <TicketIcon className='w-5 h-5 text-purple-600' />
                    <span>Your Tickets</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='space-y-3'>
                    {userTickets.map((ticket) => (
                      <div key={ticket.id} className='border rounded-lg p-3'>
                        <div className='flex justify-between items-center mb-2'>
                          <span className='text-sm font-medium'>
                            #{ticket.id.slice(-6)}
                          </span>
                          {ticket.is_winner ? (
                            <Badge variant='outline'>Winner</Badge>
                          ) : (
                            <Badge variant='secondary'>
                              {ticket.status === 'completed'
                                ? 'Completed'
                                : 'Active'}
                            </Badge>
                          )}
                        </div>
                        <div className='flex flex-wrap gap-1'>
                          {ticket.selected_numbers.map((num, idx) => (
                            <span
                              key={idx}
                              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                                isCompleted &&
                                draw.winning_numbers.includes(num)
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {num}
                            </span>
                          ))}
                        </div>
                        {isCompleted && (
                          <p className='text-xs text-gray-500 mt-2'>
                            Matched {ticket.match_count} numbers
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
