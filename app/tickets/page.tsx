/** @format */

'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { ticketsService } from '@/services/tickets';
import type { Ticket } from '@/types/api';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import {
  TicketIcon,
  Trophy,
  Clock,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export default function TicketsPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const userTickets = await ticketsService.getMyTickets();
        setTickets(userTickets);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to fetch your tickets',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchTickets();
    }
  }, [user, toast]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const activeTickets = tickets.filter((ticket) => ticket.status === 'active');
  const completedTickets = tickets.filter(
    (ticket) => ticket.status === 'completed'
  );
  const winningTickets = tickets.filter((ticket) => ticket.is_winner);

  const TicketCard = ({ ticket, index }: { ticket: Ticket; index: number }) => (
    <Card
      key={ticket.id}
      className='hover-lift animate-slide-up'
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <CardHeader className='pb-0'>
        <div className='flex justify-between items-start'>
          <CardTitle className='text-lg'>{ticket.draw_type} Draw</CardTitle>
          {ticket.is_winner ? (
            <Badge variant='outline' className='flex items-center gap-1'>
              <Trophy className='w-3 h-3' />
              <span>Winner</span>
            </Badge>
          ) : (
            <Badge
              variant={ticket.status === 'completed' ? 'secondary' : 'default'}
            >
              {ticket.status === 'completed' ? 'Completed' : 'Active'}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className='pt-4'>
        <div className='flex flex-wrap gap-2 mb-4'>
          {ticket.selected_numbers.map((number, idx) => (
            <div
              key={idx}
              className='w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-sm'
            >
              {number}
            </div>
          ))}
        </div>

        <div className='grid grid-cols-2 gap-4 text-sm mb-4'>
          <div>
            <p className='text-gray-500'>Ticket Price</p>
            <p className='font-semibold'>
              ₦{ticket.ticket_price.toLocaleString()}
            </p>
          </div>
          <div>
            <p className='text-gray-500'>Purchase Date</p>
            <p className='font-semibold'>
              {new Date(ticket.purchase_date).toLocaleDateString()}
            </p>
          </div>
        </div>

        {ticket.is_winner && ticket.prize_amount && (
          <div className='bg-green-50 border border-green-200 rounded-lg p-4 mb-4'>
            <div className='flex items-center space-x-2'>
              <Trophy className='w-5 h-5 text-green-600' />
              <div>
                <p className='font-semibold'>Congratulations! 🎉</p>
                <p className='text-gray-600'>
                  You won ₦{ticket.prize_amount.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}

        {ticket.status === 'completed' &&
          ticket.match_count > 0 &&
          !ticket.is_winner && (
            <div className='bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4'>
              <p className='text-sm'>
                Matched {ticket.match_count} number
                {ticket.match_count > 1 ? 's' : ''}
              </p>
            </div>
          )}

        <Button variant='outline' className='w-full' asChild>
          <Link href={`/draws/${ticket.draw_id}`}>
            View Draw Details
            <ArrowRight className='ml-2 w-4 h-4' />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className='min-h-screen bg-gray-50'>
      <Navbar />

      <div className='max-w-7xl mx-auto container-padding py-12'>
        <div className='mb-12 animate-fade-in'>
          <h1 className='text-3xl font-bold tracking-tight mb-2'>My Tickets</h1>
          <p className='text-lg text-gray-600'>
            View all your lottery tickets and check results
          </p>
        </div>

        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-12'>
          <Card>
            <CardContent className='pt-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm text-gray-500 mb-1'>Total Tickets</p>
                  <p className='text-2xl font-bold'>{tickets.length}</p>
                </div>
                <div className='w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center'>
                  <TicketIcon className='h-6 w-6 text-blue-600' />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='pt-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm text-blue-500 mb-1'>Active Tickets</p>
                  <p className='text-2xl font-bold text-blue-600'>
                    {activeTickets.length}
                  </p>
                </div>
                <div className='w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center'>
                  <Clock className='h-6 w-6 text-blue-600' />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='pt-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm text-yellow-500 mb-1'>
                    Winning Tickets
                  </p>
                  <p className='text-2xl font-bold text-yellow-600'>
                    {winningTickets.length}
                  </p>
                </div>
                <div className='w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center'>
                  <Trophy className='h-6 w-6 text-yellow-600' />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='pt-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm text-green-500 mb-1'>Total Winnings</p>
                  <p className='text-2xl font-bold text-green-600'>
                    ₦
                    {winningTickets
                      .reduce(
                        (sum, ticket) => sum + (ticket.prize_amount || 0),
                        0
                      )
                      .toLocaleString()}
                  </p>
                </div>
                <div className='w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center'>
                  <Trophy className='h-6 w-6 text-green-600' />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue='all' className='space-y-8'>
          <TabsList className='grid w-full grid-cols-4 max-w-2xl'>
            <TabsTrigger value='all'>All Tickets</TabsTrigger>
            <TabsTrigger value='active'>Active</TabsTrigger>
            <TabsTrigger value='completed'>Completed</TabsTrigger>
            <TabsTrigger value='winners'>Winners</TabsTrigger>
          </TabsList>

          <TabsContent value='all'>
            {isLoading ? (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i}>
                    <CardHeader>
                      <div className='skeleton h-6 w-32'></div>
                    </CardHeader>
                    <CardContent>
                      <div className='skeleton h-20 w-full mb-4'></div>
                      <div className='skeleton h-16 w-full'></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : tickets.length > 0 ? (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {tickets.map((ticket, index) => (
                  <TicketCard key={ticket.id} ticket={ticket} index={index} />
                ))}
              </div>
            ) : (
              <div className='text-center py-16'>
                <TicketIcon className='w-20 h-20 text-gray-300 mx-auto mb-6' />
                <h3 className='text-2xl font-bold mb-2'>No Tickets Yet</h3>
                <p className='text-lg text-gray-600 mb-8'>
                  Purchase your first lottery ticket to get started
                </p>
                <Button asChild>
                  <Link href='/draws'>Browse Draws</Link>
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value='active'>
            {activeTickets.length > 0 ? (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {activeTickets.map((ticket, index) => (
                  <TicketCard key={ticket.id} ticket={ticket} index={index} />
                ))}
              </div>
            ) : (
              <div className='text-center py-16'>
                <Clock className='w-20 h-20 text-gray-300 mx-auto mb-6' />
                <h3 className='text-2xl font-bold mb-2'>No Active Tickets</h3>
                <p className='text-lg text-gray-600 mb-8'>
                  Purchase tickets for upcoming draws
                </p>
                <Button asChild>
                  <Link href='/draws'>Browse Active Draws</Link>
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value='completed'>
            {completedTickets.length > 0 ? (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {completedTickets.map((ticket, index) => (
                  <TicketCard key={ticket.id} ticket={ticket} index={index} />
                ))}
              </div>
            ) : (
              <div className='text-center py-16'>
                <CheckCircle className='w-20 h-20 text-gray-300 mx-auto mb-6' />
                <h3 className='text-2xl font-bold mb-2'>
                  No Completed Tickets
                </h3>
                <p className='text-lg text-gray-600'>
                  Completed tickets will appear here after draws end
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value='winners'>
            {winningTickets.length > 0 ? (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {winningTickets.map((ticket, index) => (
                  <TicketCard key={ticket.id} ticket={ticket} index={index} />
                ))}
              </div>
            ) : (
              <div className='text-center py-16'>
                <Trophy className='w-20 h-20 text-gray-300 mx-auto mb-6' />
                <h3 className='text-2xl font-bold mb-2'>
                  No Winning Tickets Yet
                </h3>
                <p className='text-lg text-gray-600 mb-8'>
                  Keep playing for your chance to win big!
                </p>
                <Button asChild>
                  <Link href='/draws'>Try Your Luck</Link>
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}
