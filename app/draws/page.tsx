"use client"
import { useDraws } from "@/hooks/use-draws"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CountdownTimer } from "@/components/ui/countdown-timer"
import Link from "next/link"
import { Clock, Trophy, Users, Calendar, ArrowRight, Play } from "lucide-react"

export default function DrawsPage() {
  const { activeDraws, completedDraws, isLoading } = useDraws()

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto container-padding py-8 sm:py-12">
        <div className="mb-8 sm:mb-12 animate-fade-in">
          <h1 className="text-heading-1 mb-4">Lottery Draws</h1>
          <p className="text-body-large">Choose your lucky numbers and join thousands of players</p>
        </div>

        <Tabs defaultValue="active" className="space-y-6 sm:space-y-8">
          <TabsList className="grid w-full grid-cols-2 max-w-md bg-white p-1 rounded-xl shadow-sm border border-gray-200">
            <TabsTrigger
              value="active"
              className="data-[state=active]:bg-gray-900 data-[state=active]:text-white data-[state=active]:shadow-sm rounded-lg font-medium"
            >
              Live Draws
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="data-[state=active]:bg-gray-900 data-[state=active]:text-white data-[state=active]:shadow-sm rounded-lg font-medium"
            >
              Results
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-6 sm:space-y-8">
            {isLoading ? (
              <div className="grid-responsive-3 gap-4 sm:gap-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="card-primary">
                    <CardHeader>
                      <div className="skeleton h-6 w-32 mb-2"></div>
                      <div className="skeleton h-4 w-24"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="skeleton h-20 w-full mb-4"></div>
                      <div className="skeleton h-10 w-full"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : activeDraws.length > 0 ? (
              <div className="grid-responsive-3 gap-4 sm:gap-6">
                {activeDraws.map((draw, index) => (
                  <Card
                    key={draw.id}
                    className="card-interactive animate-scale-in overflow-hidden"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="h-1 bg-gradient-to-r from-green-400 to-green-500"></div>
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-heading-4">{draw.draw_type} Draw</CardTitle>
                        <span className="status-active">Live</span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-responsive">
                      <div className="text-center mb-6">
                        <div className="text-3xl sm:text-4xl font-bold text-green-600 mb-2">
                          ₦{draw.total_pot.toLocaleString()}
                        </div>
                        <div className="text-body-small text-gray-500">Total Prize Pool</div>
                      </div>

                      <div className="flex justify-between items-center text-body-small bg-gray-50 rounded-lg p-3 mb-6">
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span>{draw.total_tickets} players</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span>₦100/ticket</span>
                        </div>
                      </div>

                      <div className="mb-6">
                        <p className="text-body-small text-gray-600 mb-3 text-center">Ends in:</p>
                        <div className="flex justify-center">
                          <CountdownTimer endTime={draw.end_time} />
                        </div>
                      </div>

                      <Button className="btn-primary w-full" asChild>
                        <Link href={`/draws/${draw.id}`}>
                          <Play className="mr-2 w-4 h-4" />
                          Play Now
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 sm:py-20">
                <Clock className="w-20 h-20 sm:w-24 sm:h-24 text-gray-300 mx-auto mb-6" />
                <h3 className="text-heading-2 mb-4">No Active Draws</h3>
                <p className="text-body mb-8">Check back soon for new lottery draws!</p>
                <Button className="btn-secondary" asChild>
                  <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4 sm:space-y-6">
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Card key={i} className="card-primary">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-center">
                        <div className="space-y-2">
                          <div className="skeleton h-5 w-32"></div>
                          <div className="skeleton h-4 w-24"></div>
                        </div>
                        <div className="skeleton h-8 w-20"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : completedDraws.length > 0 ? (
              <div className="space-y-4 sm:space-y-6">
                {completedDraws.map((draw, index) => (
                  <Card
                    key={draw.id}
                    className="card-primary hover-lift animate-slide-up"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <CardContent className="pt-6">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6 mb-6">
                        <div>
                          <h3 className="text-heading-3 mb-2">{draw.draw_type} Draw</h3>
                          <p className="text-body-small text-gray-500">
                            {new Date(draw.end_time).toLocaleDateString()}
                          </p>
                        </div>
                        <span className="status-completed self-start">Completed</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6">
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <div className="text-2xl sm:text-3xl font-bold text-green-600">
                            ₦{draw.total_pot.toLocaleString()}
                          </div>
                          <div className="text-body-small text-green-700">Prize Pool</div>
                        </div>
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <div className="text-2xl sm:text-3xl font-bold text-blue-600">{draw.total_tickets}</div>
                          <div className="text-body-small text-blue-700">Players</div>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                          <div className="text-2xl sm:text-3xl font-bold text-purple-600">
                            {draw.winning_numbers.length}
                          </div>
                          <div className="text-body-small text-purple-700">Winning Numbers</div>
                        </div>
                      </div>

                      {draw.winning_numbers.length > 0 && (
                        <div className="mb-6">
                          <h4 className="font-medium mb-3 text-gray-900">Winning Numbers:</h4>
                          <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                            {draw.winning_numbers.map((number, index) => (
                              <div
                                key={index}
                                className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md"
                              >
                                {number}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {draw.first_place_winner && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4">
                          <div className="flex items-center space-x-3">
                            <Trophy className="w-6 h-6 text-yellow-600" />
                            <div>
                              <p className="font-medium text-gray-900">🎉 Winner: {draw.first_place_winner.name}</p>
                              <p className="text-body-small text-gray-600">
                                Prize: ₦{draw.first_place_winner.prize_amount.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      <Button className="btn-secondary w-full" asChild>
                        <Link href={`/draws/${draw.id}`}>
                          View Full Details
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 sm:py-20">
                <Trophy className="w-20 h-20 sm:w-24 sm:h-24 text-gray-300 mx-auto mb-6" />
                <h3 className="text-heading-2 mb-4">No Completed Draws</h3>
                <p className="text-body">Draw results will appear here once draws are completed.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  )
}
