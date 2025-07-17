"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { drawsService } from "@/services/draws"
import { ticketsService } from "@/services/tickets"
import type { Draw } from "@/types/api"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { NumberSelector } from "@/components/ui/number-selector"
import { CountdownTimer } from "@/components/ui/countdown-timer"
import { useToast } from "@/hooks/use-toast"
import { Trophy, CheckCircle, Loader2, ArrowLeft } from "lucide-react"

export default function DrawDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const { toast } = useToast()
  const [draw, setDraw] = useState<Draw | null>(null)
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isPurchasing, setIsPurchasing] = useState(false)

  useEffect(() => {
    const fetchDraw = async () => {
      try {
        const drawData = await drawsService.getDraw(params.id as string)
        setDraw(drawData)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load draw details",
          variant: "destructive",
        })
        router.push("/draws")
      } finally {
        setIsLoading(false)
      }
    }

    if (params.id) {
      fetchDraw()
    }
  }, [params.id, router, toast])

  const handlePurchaseTicket = async () => {
    if (!user) {
      router.push("/auth/login")
      return
    }

    if (selectedNumbers.length !== 5) {
      toast({
        title: "Invalid Selection",
        description: "Please select exactly 5 numbers",
        variant: "destructive",
      })
      return
    }

    if (user.wallet_balance < 100) {
      toast({
        title: "Insufficient Balance",
        description: "Please top up your wallet to buy tickets",
        variant: "destructive",
      })
      router.push("/wallet")
      return
    }

    setIsPurchasing(true)

    try {
      await ticketsService.buyTicket(draw!.id, 100, selectedNumbers)
      toast({
        title: "Ticket Purchased! 🎉",
        description: "Your ticket has been purchased successfully. Good luck!",
      })
      setSelectedNumbers([])
      // Refresh draw data
      const updatedDraw = await drawsService.getDraw(params.id as string)
      setDraw(updatedDraw)
    } catch (error: any) {
      toast({
        title: "Purchase Failed",
        description: error.response?.data?.detail || "Failed to purchase ticket",
        variant: "destructive",
      })
    } finally {
      setIsPurchasing(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[hsl(var(--surface-primary))]">
        <Navbar />
        <div className="max-w-6xl mx-auto container-padding py-12">
          <div className="space-y-8">
            <div className="skeleton h-8 w-64"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <Card className="card-primary">
                  <CardHeader>
                    <div className="skeleton h-6 w-32"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="skeleton h-64 w-full"></div>
                  </CardContent>
                </Card>
              </div>
              <div className="space-y-6">
                <Card className="card-primary">
                  <CardHeader>
                    <div className="skeleton h-6 w-24"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="skeleton h-32 w-full"></div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!draw) {
    return null
  }

  const isActive = draw.status === "active"
  const isCompleted = draw.status === "completed"

  return (
    <div className="min-h-screen bg-[hsl(var(--surface-primary))]">
      <Navbar />

      <div className="max-w-6xl mx-auto container-padding py-12">
        <div className="mb-8 animate-fade-in">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4 text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--text-primary))]"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Draws
          </Button>
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-heading-1">{draw.draw_type} Draw</h1>
            <span className={isActive ? "status-active" : "status-completed"}>{isActive ? "Active" : "Completed"}</span>
          </div>
          <p className="text-body">
            {isActive ? "Pick your lucky numbers and join the draw" : "View draw results and winners"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {isActive && (
              <Card className="card-primary animate-slide-up">
                <CardHeader>
                  <CardTitle>Select Your Numbers</CardTitle>
                </CardHeader>
                <CardContent>
                  <NumberSelector
                    selectedNumbers={selectedNumbers}
                    onNumbersChange={setSelectedNumbers}
                    disabled={!isActive}
                  />

                  {user && (
                    <div className="mt-8 p-6 bg-[hsl(var(--surface-secondary))] rounded-xl">
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-medium text-[hsl(var(--text-primary))]">Ticket Price:</span>
                        <span className="text-2xl font-bold text-[hsl(var(--text-primary))]">₦100</span>
                      </div>
                      <div className="flex items-center justify-between mb-6">
                        <span className="font-medium text-[hsl(var(--text-primary))]">Your Balance:</span>
                        <span
                          className={`font-bold ${
                            user.wallet_balance >= 100 ? "text-[hsl(var(--success))]" : "text-[hsl(var(--error))]"
                          }`}
                        >
                          ₦{user.wallet_balance.toLocaleString()}
                        </span>
                      </div>
                      <Button
                        className="btn-primary w-full"
                        onClick={handlePurchaseTicket}
                        disabled={selectedNumbers.length !== 5 || isPurchasing || user.wallet_balance < 100}
                      >
                        {isPurchasing ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Purchasing...
                          </>
                        ) : (
                          "Buy Ticket"
                        )}
                      </Button>
                    </div>
                  )}

                  {!user && (
                    <div className="mt-8 p-6 bg-[hsl(var(--brand-accent))]/5 rounded-xl text-center">
                      <p className="mb-4 text-[hsl(var(--text-secondary))]">Sign in to purchase tickets</p>
                      <Button className="btn-primary" asChild>
                        <a href="/auth/login">Sign In</a>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {isCompleted && draw.winning_numbers.length > 0 && (
              <Card className="card-primary animate-slide-up">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Trophy className="w-6 h-6 text-[hsl(var(--warning))]" />
                    <span>Winning Numbers</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4 justify-center mb-8">
                    {draw.winning_numbers.map((number, index) => (
                      <div
                        key={index}
                        className="w-16 h-16 bg-[hsl(var(--warning))] text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg animate-scale-in"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        {number}
                      </div>
                    ))}
                  </div>

                  {draw.first_place_winner && (
                    <div className="bg-[hsl(var(--warning))]/10 border border-[hsl(var(--warning))]/20 rounded-xl p-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-[hsl(var(--warning))]/20 rounded-full flex items-center justify-center">
                          <Trophy className="w-6 h-6 text-[hsl(var(--warning))]" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-[hsl(var(--text-primary))] text-lg">
                            🎉 Winner: {draw.first_place_winner.name}
                          </h3>
                          <p className="text-[hsl(var(--text-secondary))]">
                            Prize: ₦{draw.first_place_winner.prize_amount.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Draw Info */}
            <Card className="card-primary animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <CardHeader>
                <CardTitle>Draw Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-[hsl(var(--success))] mb-2">
                    ₦{draw.total_pot.toLocaleString()}
                  </div>
                  <div className="text-body-small">Total Prize Pool</div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-[hsl(var(--brand-accent))]">{draw.total_tickets}</div>
                    <div className="text-body-small">Tickets Sold</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[hsl(var(--text-primary))]">₦100</div>
                    <div className="text-body-small">Per Ticket</div>
                  </div>
                </div>

                {isActive && (
                  <div className="text-center">
                    <p className="text-body-small mb-3">Draw ends in:</p>
                    <CountdownTimer endTime={draw.end_time} />
                  </div>
                )}

                <div className="space-y-3 text-sm border-t border-[hsl(var(--border))] pt-4">
                  <div className="flex justify-between">
                    <span className="text-[hsl(var(--text-secondary))]">Started:</span>
                    <span className="text-[hsl(var(--text-primary))]">
                      {new Date(draw.start_time).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[hsl(var(--text-secondary))]">Ends:</span>
                    <span className="text-[hsl(var(--text-primary))]">
                      {new Date(draw.end_time).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* How to Win */}
            <Card className="card-primary animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <CardTitle>How to Win</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { matches: 5, prize: "Jackpot", color: "success" },
                  { matches: 4, prize: "Consolation", color: "brand-accent" },
                  { matches: 3, prize: "Small Prize", color: "warning" },
                  { matches: 2, prize: "Bonus Credits", color: "text-secondary" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className={`w-5 h-5 text-[hsl(var(--${item.color}))]`} />
                    <span className="text-body">
                      Match {item.matches} numbers: {item.prize}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="card-primary animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { action: "Ticket purchased", time: "2 min ago" },
                    { action: "Ticket purchased", time: "5 min ago" },
                    { action: "Ticket purchased", time: "8 min ago" },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-[hsl(var(--brand-accent))] rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-body-small">{activity.action}</p>
                        <p className="text-body-small opacity-60">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
