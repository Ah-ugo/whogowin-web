"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { ticketsService } from "@/services/tickets"
import type { Ticket } from "@/types/api"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { TicketIcon, Trophy, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function TicketsPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const userTickets = await ticketsService.getMyTickets()
        setTickets(userTickets)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch your tickets",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    if (user) {
      fetchTickets()
    }
  }, [user, toast])

  if (!user) {
    return <div>Loading...</div>
  }

  const activeTickets = tickets.filter((ticket) => ticket.status === "active")
  const completedTickets = tickets.filter((ticket) => ticket.status === "completed")
  const winningTickets = tickets.filter((ticket) => ticket.is_winner)

  const getStatusIcon = (ticket: Ticket) => {
    if (ticket.is_winner) return <Trophy className="w-5 h-5 text-[hsl(var(--warning))]" />
    if (ticket.status === "completed") return <CheckCircle className="w-5 h-5 text-[hsl(var(--success))]" />
    return <Clock className="w-5 h-5 text-[hsl(var(--brand-accent))]" />
  }

  const getStatusColor = (ticket: Ticket) => {
    if (ticket.is_winner) return "text-[hsl(var(--warning))]"
    if (ticket.status === "completed") return "text-[hsl(var(--success))]"
    return "text-[hsl(var(--brand-accent))]"
  }

  const TicketCard = ({ ticket, index }: { ticket: Ticket; index: number }) => (
    <Card className="card-primary hover-lift animate-slide-up" style={{ animationDelay: `${index * 0.05}s` }}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{ticket.draw_type} Draw</CardTitle>
          <div className="flex items-center space-x-2">
            {getStatusIcon(ticket)}
            <span className={`text-sm font-medium capitalize ${getStatusColor(ticket)}`}>
              {ticket.is_winner ? "Winner" : ticket.status}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {ticket.selected_numbers.map((number, idx) => (
            <div
              key={idx}
              className="w-10 h-10 bg-[hsl(var(--brand-primary))] text-[hsl(var(--surface-primary))] rounded-full flex items-center justify-center font-bold text-sm"
            >
              {number}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-[hsl(var(--text-secondary))]">Ticket Price</p>
            <p className="font-semibold text-[hsl(var(--text-primary))]">₦{ticket.ticket_price.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-[hsl(var(--text-secondary))]">Purchase Date</p>
            <p className="font-semibold text-[hsl(var(--text-primary))]">
              {new Date(ticket.purchase_date).toLocaleDateString()}
            </p>
          </div>
        </div>

        {ticket.is_winner && ticket.prize_amount && (
          <div className="bg-[hsl(var(--warning))]/10 border border-[hsl(var(--warning))]/20 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-[hsl(var(--warning))]" />
              <div>
                <p className="font-semibold text-[hsl(var(--text-primary))]">Congratulations! 🎉</p>
                <p className="text-[hsl(var(--text-secondary))]">You won ₦{ticket.prize_amount.toLocaleString()}</p>
              </div>
            </div>
          </div>
        )}

        {ticket.status === "completed" && ticket.match_count > 0 && !ticket.is_winner && (
          <div className="bg-[hsl(var(--brand-accent))]/10 border border-[hsl(var(--brand-accent))]/20 rounded-lg p-3">
            <p className="text-[hsl(var(--text-primary))] text-sm">
              Matched {ticket.match_count} number{ticket.match_count > 1 ? "s" : ""}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-[hsl(var(--surface-primary))]">
      <Navbar />

      <div className="max-w-7xl mx-auto container-padding py-12">
        <div className="mb-12 animate-fade-in">
          <h1 className="text-heading-1 mb-2">My Tickets</h1>
          <p className="text-body">View all your lottery tickets and check results</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="card-primary animate-slide-up">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-body-small text-[hsl(var(--text-secondary))] mb-1">Total Tickets</p>
                  <p className="text-2xl font-bold text-[hsl(var(--text-primary))]">{tickets.length}</p>
                </div>
                <div className="w-12 h-12 bg-[hsl(var(--brand-accent))]/10 rounded-xl flex items-center justify-center">
                  <TicketIcon className="h-6 w-6 text-[hsl(var(--brand-accent))]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-primary animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-body-small text-[hsl(var(--brand-accent))] mb-1">Active Tickets</p>
                  <p className="text-2xl font-bold text-[hsl(var(--brand-accent))]">{activeTickets.length}</p>
                </div>
                <div className="w-12 h-12 bg-[hsl(var(--brand-accent))]/10 rounded-xl flex items-center justify-center">
                  <Clock className="h-6 w-6 text-[hsl(var(--brand-accent))]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-primary animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-body-small text-[hsl(var(--warning))] mb-1">Winning Tickets</p>
                  <p className="text-2xl font-bold text-[hsl(var(--warning))]">{winningTickets.length}</p>
                </div>
                <div className="w-12 h-12 bg-[hsl(var(--warning))]/10 rounded-xl flex items-center justify-center">
                  <Trophy className="h-6 w-6 text-[hsl(var(--warning))]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-primary animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-body-small text-[hsl(var(--success))] mb-1">Total Winnings</p>
                  <p className="text-2xl font-bold text-[hsl(var(--success))]">
                    ₦{winningTickets.reduce((sum, ticket) => sum + (ticket.prize_amount || 0), 0).toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 bg-[hsl(var(--success))]/10 rounded-xl flex items-center justify-center">
                  <Trophy className="h-6 w-6 text-[hsl(var(--success))]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl bg-[hsl(var(--surface-secondary))] p-1 rounded-lg">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-[hsl(var(--surface-primary))] data-[state=active]:shadow-sm"
            >
              All Tickets
            </TabsTrigger>
            <TabsTrigger
              value="active"
              className="data-[state=active]:bg-[hsl(var(--surface-primary))] data-[state=active]:shadow-sm"
            >
              Active
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="data-[state=active]:bg-[hsl(var(--surface-primary))] data-[state=active]:shadow-sm"
            >
              Completed
            </TabsTrigger>
            <TabsTrigger
              value="winners"
              className="data-[state=active]:bg-[hsl(var(--surface-primary))] data-[state=active]:shadow-sm"
            >
              Winners
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="card-primary">
                    <CardHeader>
                      <div className="skeleton h-6 w-32"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="skeleton h-20 w-full mb-4"></div>
                      <div className="skeleton h-16 w-full"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : tickets.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tickets.map((ticket, index) => (
                  <TicketCard key={ticket.id} ticket={ticket} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <TicketIcon className="w-20 h-20 text-[hsl(var(--text-tertiary))] mx-auto mb-6" />
                <h3 className="text-heading-2 mb-2">No Tickets Yet</h3>
                <p className="text-body mb-8">Purchase your first lottery ticket to get started</p>
                <Button className="btn-primary" asChild>
                  <Link href="/draws">Browse Draws</Link>
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="active">
            {activeTickets.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeTickets.map((ticket, index) => (
                  <TicketCard key={ticket.id} ticket={ticket} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Clock className="w-20 h-20 text-[hsl(var(--text-tertiary))] mx-auto mb-6" />
                <h3 className="text-heading-2 mb-2">No Active Tickets</h3>
                <p className="text-body mb-8">Purchase tickets for upcoming draws</p>
                <Button className="btn-primary" asChild>
                  <Link href="/draws">Browse Active Draws</Link>
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed">
            {completedTickets.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedTickets.map((ticket, index) => (
                  <TicketCard key={ticket.id} ticket={ticket} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <CheckCircle className="w-20 h-20 text-[hsl(var(--text-tertiary))] mx-auto mb-6" />
                <h3 className="text-heading-2 mb-2">No Completed Tickets</h3>
                <p className="text-body">Completed tickets will appear here after draws end</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="winners">
            {winningTickets.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {winningTickets.map((ticket, index) => (
                  <TicketCard key={ticket.id} ticket={ticket} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Trophy className="w-20 h-20 text-[hsl(var(--text-tertiary))] mx-auto mb-6" />
                <h3 className="text-heading-2 mb-2">No Winning Tickets Yet</h3>
                <p className="text-body mb-8">Keep playing for your chance to win big!</p>
                <Button className="btn-primary" asChild>
                  <Link href="/draws">Try Your Luck</Link>
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  )
}
