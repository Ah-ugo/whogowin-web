"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useWallet } from "@/hooks/use-wallet"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Wallet, Plus, ArrowUpRight, ArrowDownLeft, CreditCard, Loader2 } from "lucide-react"

export default function WalletPage() {
  const { user } = useAuth()
  const { walletDetails, isLoading, topupWallet, refetch } = useWallet()
  const { toast } = useToast()
  const [topupAmount, setTopupAmount] = useState("")
  const [isTopupLoading, setIsTopupLoading] = useState(false)

  const handleTopup = async () => {
    const amount = Number.parseFloat(topupAmount)
    if (!amount || amount < 100) {
      toast({
        title: "Invalid Amount",
        description: "Minimum top-up amount is ₦100",
        variant: "destructive",
      })
      return
    }

    setIsTopupLoading(true)
    try {
      await topupWallet(amount)
      setTopupAmount("")
      toast({
        title: "Payment Initiated",
        description: "You will be redirected to complete the payment",
      })
      // Refresh wallet after a delay to allow for payment completion
      setTimeout(() => {
        refetch()
      }, 5000)
    } catch (error) {
      // Error is handled in the hook
    } finally {
      setIsTopupLoading(false)
    }
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--surface-primary))]">
      <Navbar />

      <div className="max-w-6xl mx-auto container-padding py-12">
        <div className="mb-12 animate-fade-in">
          <h1 className="text-heading-1 mb-2">Wallet</h1>
          <p className="text-body">Manage your funds and view transaction history</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Wallet Overview */}
          <div className="lg:col-span-2 space-y-8">
            {/* Balance Card */}
            <Card className="card-elevated animate-slide-up">
              <CardContent className="pt-8">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-[hsl(var(--success))]/10 rounded-full flex items-center justify-center mx-auto">
                    <Wallet className="w-8 h-8 text-[hsl(var(--success))]" />
                  </div>
                  <div>
                    <p className="text-body-small text-[hsl(var(--text-secondary))] mb-2">Available Balance</p>
                    <p className="text-5xl font-bold text-[hsl(var(--success))]">
                      ₦{user.wallet_balance.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex justify-center space-x-4">
                    <Button className="btn-primary" onClick={() => document.getElementById("topup-tab")?.click()}>
                      <Plus className="mr-2 w-4 h-4" />
                      Top Up
                    </Button>
                    <Button className="btn-secondary">
                      <ArrowUpRight className="mr-2 w-4 h-4" />
                      Withdraw
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Transactions */}
            <Card className="card-primary animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex items-center space-x-4">
                        <div className="skeleton w-10 h-10 rounded-full"></div>
                        <div className="flex-1 space-y-2">
                          <div className="skeleton h-4 w-32"></div>
                          <div className="skeleton h-3 w-24"></div>
                        </div>
                        <div className="skeleton h-4 w-16"></div>
                      </div>
                    ))}
                  </div>
                ) : walletDetails?.transactions && walletDetails.transactions.length > 0 ? (
                  <div className="space-y-4">
                    {walletDetails.transactions.slice(0, 10).map((transaction, index) => (
                      <div
                        key={transaction.id}
                        className="flex items-center space-x-4 p-4 rounded-lg hover:bg-[hsl(var(--surface-secondary))] transition-colors animate-slide-up"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            transaction.type === "credit" ? "bg-[hsl(var(--success))]/10" : "bg-[hsl(var(--error))]/10"
                          }`}
                        >
                          {transaction.type === "credit" ? (
                            <ArrowDownLeft
                              className={`w-5 h-5 ${
                                transaction.type === "credit"
                                  ? "text-[hsl(var(--success))]"
                                  : "text-[hsl(var(--error))]"
                              }`}
                            />
                          ) : (
                            <ArrowUpRight
                              className={`w-5 h-5 ${
                                transaction.type === "credit"
                                  ? "text-[hsl(var(--success))]"
                                  : "text-[hsl(var(--error))]"
                              }`}
                            />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-[hsl(var(--text-primary))]">{transaction.description}</p>
                          <p className="text-body-small">{new Date(transaction.date).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <p
                            className={`font-semibold ${
                              transaction.type === "credit" ? "text-[hsl(var(--success))]" : "text-[hsl(var(--error))]"
                            }`}
                          >
                            {transaction.type === "credit" ? "+" : "-"}₦{transaction.amount.toLocaleString()}
                          </p>
                          <p className="text-body-small capitalize">{transaction.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Wallet className="w-16 h-16 text-[hsl(var(--text-tertiary))] mx-auto mb-4" />
                    <h3 className="text-heading-3 mb-2">No Transactions Yet</h3>
                    <p className="text-body mb-6">Your transaction history will appear here</p>
                    <Button className="btn-primary">Make Your First Top-up</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="card-primary animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="topup" className="space-y-6">
                  <TabsList className="grid w-full grid-cols-2 bg-[hsl(var(--surface-secondary))] p-1 rounded-lg">
                    <TabsTrigger
                      id="topup-tab"
                      value="topup"
                      className="data-[state=active]:bg-[hsl(var(--surface-primary))] data-[state=active]:shadow-sm"
                    >
                      Top Up
                    </TabsTrigger>
                    <TabsTrigger
                      value="withdraw"
                      className="data-[state=active]:bg-[hsl(var(--surface-primary))] data-[state=active]:shadow-sm"
                    >
                      Withdraw
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="topup" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="amount" className="text-[hsl(var(--text-primary))] font-medium">
                        Amount (₦)
                      </Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="Enter amount"
                        value={topupAmount}
                        onChange={(e) => setTopupAmount(e.target.value)}
                        min="100"
                        className="focus-ring"
                      />
                      <p className="text-body-small">Minimum amount: ₦100</p>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      {[1000, 5000, 10000].map((amount) => (
                        <Button
                          key={amount}
                          variant="outline"
                          size="sm"
                          onClick={() => setTopupAmount(amount.toString())}
                          className="btn-secondary text-xs"
                        >
                          ₦{amount.toLocaleString()}
                        </Button>
                      ))}
                    </div>

                    <Button
                      className="btn-primary w-full"
                      onClick={handleTopup}
                      disabled={!topupAmount || isTopupLoading}
                    >
                      {isTopupLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <CreditCard className="mr-2 w-4 h-4" />
                          Top Up Wallet
                        </>
                      )}
                    </Button>

                    <div className="text-center">
                      <p className="text-body-small">Powered by Paystack</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="withdraw" className="space-y-4">
                    <div className="text-center py-8">
                      <ArrowUpRight className="w-12 h-12 text-[hsl(var(--text-tertiary))] mx-auto mb-4" />
                      <h3 className="text-heading-3 mb-2">Withdrawal Coming Soon</h3>
                      <p className="text-body">We're working on withdrawal features. Stay tuned!</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card className="card-primary animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3 p-3 border border-[hsl(var(--border))] rounded-lg">
                  <CreditCard className="w-6 h-6 text-[hsl(var(--brand-accent))]" />
                  <div>
                    <p className="font-medium text-[hsl(var(--text-primary))]">Debit/Credit Card</p>
                    <p className="text-body-small">Visa, Mastercard, Verve</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 border border-[hsl(var(--border))] rounded-lg">
                  <div className="w-6 h-6 bg-[hsl(var(--success))] rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">B</span>
                  </div>
                  <div>
                    <p className="font-medium text-[hsl(var(--text-primary))]">Bank Transfer</p>
                    <p className="text-body-small">All Nigerian banks</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Info */}
            <Card className="card-primary animate-slide-up" style={{ animationDelay: "0.4s" }}>
              <CardContent className="pt-6">
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-[hsl(var(--success))]/10 rounded-full flex items-center justify-center mx-auto">
                    <CreditCard className="w-6 h-6 text-[hsl(var(--success))]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[hsl(var(--text-primary))]">Secure Payments</h3>
                    <p className="text-body-small">
                      All transactions are encrypted and processed securely through Paystack
                    </p>
                  </div>
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
