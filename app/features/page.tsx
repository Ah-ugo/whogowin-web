import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Shield,
  Zap,
  Clock,
  Users,
  CreditCard,
  Smartphone,
  Trophy,
  CheckCircle,
  Star,
  Gift,
  BarChart3,
  Lock,
} from "lucide-react"

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-[hsl(var(--surface-primary))]">
      <Navbar />

      <div className="max-w-7xl mx-auto container-padding py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-display mb-6">Platform Features</h1>
          <p className="text-body-large max-w-3xl mx-auto">
            Discover why WhoGoWin is Nigeria's most advanced and trusted lottery platform, built with cutting-edge
            technology and player-first design.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {[
            {
              icon: Shield,
              title: "Bank-Level Security",
              description:
                "Advanced encryption, secure payment processing, and multi-layer security protocols protect your data and funds.",
              color: "success",
            },
            {
              icon: Zap,
              title: "Instant Payouts",
              description:
                "Win and get paid immediately. No waiting periods, no delays - your winnings are credited instantly to your wallet.",
              color: "warning",
            },
            {
              icon: Clock,
              title: "Multiple Draw Types",
              description:
                "Daily, weekly, and monthly draws with varying prize pools. More opportunities to win throughout the year.",
              color: "brand-accent",
            },
            {
              icon: CreditCard,
              title: "Secure Payments",
              description:
                "Powered by Paystack with support for all major cards, bank transfers, and mobile money payments.",
              color: "success",
            },
            {
              icon: Smartphone,
              title: "Mobile Optimized",
              description:
                "Fully responsive design that works perfectly on all devices. Play anywhere, anytime with our mobile-first approach.",
              color: "brand-accent",
            },
            {
              icon: Users,
              title: "Community Features",
              description:
                "Join a growing community of players, share experiences, and celebrate wins together in a safe environment.",
              color: "text-secondary",
            },
          ].map((feature, index) => (
            <Card
              key={index}
              className="card-primary hover-lift animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="pt-6 space-y-4">
                <div
                  className={`w-12 h-12 bg-[hsl(var(--${feature.color}))]/10 rounded-xl flex items-center justify-center`}
                >
                  <feature.icon className={`w-6 h-6 text-[hsl(var(--${feature.color}))]`} />
                </div>
                <h3 className="text-heading-3">{feature.title}</h3>
                <p className="text-body">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Gaming Features */}
        <div className="mb-20">
          <div className="text-center mb-12 animate-slide-up" style={{ animationDelay: "0.6s" }}>
            <h2 className="text-heading-1 mb-4">Gaming Experience</h2>
            <p className="text-body-large">Features designed to enhance your lottery experience</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="card-elevated animate-slide-up" style={{ animationDelay: "0.7s" }}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="w-6 h-6 text-[hsl(var(--warning))]" />
                  <span>Smart Number Selection</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-[hsl(var(--success))]" />
                    <span className="text-body">Quick Pick for random number generation</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-[hsl(var(--success))]" />
                    <span className="text-body">Manual selection with intuitive interface</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-[hsl(var(--success))]" />
                    <span className="text-body">Number frequency statistics and insights</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-[hsl(var(--success))]" />
                    <span className="text-body">Save favorite number combinations</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-elevated animate-slide-up" style={{ animationDelay: "0.8s" }}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-6 h-6 text-[hsl(var(--brand-accent))]" />
                  <span>Advanced Analytics</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-[hsl(var(--success))]" />
                    <span className="text-body">Detailed ticket history and tracking</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-[hsl(var(--success))]" />
                    <span className="text-body">Win/loss statistics and patterns</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-[hsl(var(--success))]" />
                    <span className="text-body">Spending insights and budgeting tools</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-[hsl(var(--success))]" />
                    <span className="text-body">Performance analytics dashboard</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Security Features */}
        <div className="mb-20">
          <div className="text-center mb-12 animate-slide-up" style={{ animationDelay: "0.9s" }}>
            <h2 className="text-heading-1 mb-4">Security & Trust</h2>
            <p className="text-body-large">Your security and privacy are our top priorities</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Lock,
                title: "Data Encryption",
                description: "All data is encrypted using industry-standard AES-256 encryption protocols.",
              },
              {
                icon: Shield,
                title: "Secure Transactions",
                description: "PCI DSS compliant payment processing with fraud detection and prevention.",
              },
              {
                icon: CheckCircle,
                title: "Fair Play Guarantee",
                description: "Provably fair random number generation with transparent draw processes.",
              },
              {
                icon: Users,
                title: "Account Protection",
                description: "Two-factor authentication and advanced account security measures.",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="card-primary animate-slide-up"
                style={{ animationDelay: `${1.0 + index * 0.1}s` }}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[hsl(var(--success))]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-[hsl(var(--success))]" />
                    </div>
                    <div>
                      <h3 className="text-heading-3 mb-2">{feature.title}</h3>
                      <p className="text-body">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Bonus Features */}
        <div className="mb-20">
          <div className="text-center mb-12 animate-slide-up" style={{ animationDelay: "1.3s" }}>
            <h2 className="text-heading-1 mb-4">Bonus Features</h2>
            <p className="text-body-large">Extra features that make WhoGoWin special</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Gift,
                title: "Referral Program",
                description: "Earn rewards for every friend you invite. More friends, more bonuses!",
              },
              {
                icon: Star,
                title: "VIP Rewards",
                description: "Exclusive benefits and bonuses for our most loyal players.",
              },
              {
                icon: Trophy,
                title: "Achievement System",
                description: "Unlock badges and rewards as you play and achieve milestones.",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="card-primary hover-lift animate-slide-up"
                style={{ animationDelay: `${1.4 + index * 0.1}s` }}
              >
                <CardContent className="pt-6 text-center space-y-4">
                  <div className="w-12 h-12 bg-[hsl(var(--warning))]/10 rounded-xl flex items-center justify-center mx-auto">
                    <feature.icon className="w-6 h-6 text-[hsl(var(--warning))]" />
                  </div>
                  <h3 className="text-heading-3">{feature.title}</h3>
                  <p className="text-body">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center animate-slide-up" style={{ animationDelay: "1.7s" }}>
          <Card className="card-elevated max-w-4xl mx-auto">
            <CardContent className="pt-8">
              <div className="space-y-6">
                <h2 className="text-heading-1">Ready to Experience WhoGoWin?</h2>
                <p className="text-body-large max-w-2xl mx-auto">
                  Join thousands of players who trust WhoGoWin for their lottery gaming. Start your winning journey
                  today with our feature-rich platform.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="btn-primary" asChild>
                    <Link href="/auth/register">Get Started Now</Link>
                  </Button>
                  <Button className="btn-secondary" asChild>
                    <Link href="/draws">View Active Draws</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
