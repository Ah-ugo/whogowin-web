import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Users, Trophy, Target, Heart, Zap } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[hsl(var(--surface-primary))]">
      <Navbar />

      <div className="max-w-6xl mx-auto container-padding py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-display mb-6">About WhoGoWin</h1>
          <p className="text-body-large max-w-3xl mx-auto">
            Nigeria's most trusted lottery platform, built on transparency, fairness, and the dream of changing lives
            through responsible gaming.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <Card className="card-elevated animate-slide-up">
            <CardContent className="pt-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-[hsl(var(--brand-accent))]/10 rounded-full flex items-center justify-center mx-auto">
                  <Target className="w-8 h-8 text-[hsl(var(--brand-accent))]" />
                </div>
                <h2 className="text-heading-2">Our Mission</h2>
                <p className="text-body">
                  To provide a secure, transparent, and enjoyable lottery experience that gives every Nigerian the
                  opportunity to win life-changing prizes while maintaining the highest standards of integrity and
                  responsible gaming.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <CardContent className="pt-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-[hsl(var(--success))]/10 rounded-full flex items-center justify-center mx-auto">
                  <Heart className="w-8 h-8 text-[hsl(var(--success))]" />
                </div>
                <h2 className="text-heading-2">Our Vision</h2>
                <p className="text-body">
                  To become Africa's leading lottery platform, known for innovation, trust, and positive impact on
                  communities while creating countless success stories across the continent.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Our Story */}
        <div className="mb-20 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <div className="text-center mb-12">
            <h2 className="text-heading-1 mb-4">Our Story</h2>
            <p className="text-body-large max-w-3xl mx-auto">
              Founded with a vision to revolutionize the lottery industry in Nigeria
            </p>
          </div>

          <Card className="card-primary">
            <CardContent className="pt-8">
              <div className="prose prose-lg max-w-none text-[hsl(var(--text-secondary))] leading-relaxed">
                <p className="mb-6">
                  WhoGoWin was born from a simple belief: everyone deserves a fair chance at changing their life. In
                  2024, our founders recognized the need for a transparent, secure, and user-friendly lottery platform
                  that Nigerians could trust.
                </p>
                <p className="mb-6">
                  We started with a mission to eliminate the opacity and mistrust that had plagued traditional lottery
                  systems. By leveraging cutting-edge technology and implementing rigorous security measures, we created
                  a platform where fairness isn't just promised—it's guaranteed.
                </p>
                <p className="mb-6">
                  Today, WhoGoWin serves thousands of players across Nigeria, offering daily, weekly, and monthly draws
                  with instant payouts and complete transparency. Every draw is conducted with the highest standards of
                  integrity, and every winner is celebrated as part of our growing community.
                </p>
                <p>
                  Our journey is just beginning. As we continue to grow, we remain committed to our core values of
                  transparency, security, and responsible gaming, always putting our players first.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Core Values */}
        <div className="mb-20">
          <div className="text-center mb-12 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <h2 className="text-heading-1 mb-4">Our Core Values</h2>
            <p className="text-body-large">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Transparency",
                description:
                  "Every draw is conducted openly with verifiable results. We believe in complete transparency in all our operations.",
              },
              {
                icon: Zap,
                title: "Innovation",
                description:
                  "We continuously improve our platform with the latest technology to provide the best user experience.",
              },
              {
                icon: Users,
                title: "Community",
                description:
                  "We're building a community of dreamers and winners, supporting each other on the journey to success.",
              },
              {
                icon: Trophy,
                title: "Excellence",
                description:
                  "We strive for excellence in every aspect of our service, from security to customer support.",
              },
              {
                icon: Heart,
                title: "Responsibility",
                description:
                  "We promote responsible gaming and provide tools to help our players maintain healthy gaming habits.",
              },
              {
                icon: Target,
                title: "Integrity",
                description:
                  "We operate with the highest ethical standards, ensuring fair play and honest communication always.",
              },
            ].map((value, index) => (
              <Card
                key={index}
                className="card-primary hover-lift animate-slide-up"
                style={{ animationDelay: `${0.4 + index * 0.1}s` }}
              >
                <CardContent className="pt-6 text-center space-y-4">
                  <div className="w-12 h-12 bg-[hsl(var(--brand-accent))]/10 rounded-xl flex items-center justify-center mx-auto">
                    <value.icon className="w-6 h-6 text-[hsl(var(--brand-accent))]" />
                  </div>
                  <h3 className="text-heading-3">{value.title}</h3>
                  <p className="text-body">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-20">
          <div className="text-center mb-12 animate-slide-up" style={{ animationDelay: "0.8s" }}>
            <h2 className="text-heading-1 mb-4">Our Impact</h2>
            <p className="text-body-large">Numbers that tell our story</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: "10,000+", label: "Active Players" },
              { number: "₦50M+", label: "Total Prizes Paid" },
              { number: "500+", label: "Winners Created" },
              { number: "99.9%", label: "Uptime" },
            ].map((stat, index) => (
              <Card
                key={index}
                className="card-primary text-center animate-scale-in"
                style={{ animationDelay: `${0.9 + index * 0.1}s` }}
              >
                <CardContent className="pt-8">
                  <div className="text-4xl font-bold text-[hsl(var(--brand-accent))] mb-2">{stat.number}</div>
                  <div className="text-body">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center animate-slide-up" style={{ animationDelay: "1.2s" }}>
          <h2 className="text-heading-1 mb-4">Our Commitment</h2>
          <p className="text-body-large max-w-3xl mx-auto mb-8">
            We're committed to providing the best lottery experience in Nigeria. Our team works around the clock to
            ensure fair play, secure transactions, and exceptional customer service.
          </p>
          <Card className="card-primary max-w-4xl mx-auto">
            <CardContent className="pt-8">
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-[hsl(var(--success))]/10 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="w-8 h-8 text-[hsl(var(--success))]" />
                </div>
                <h3 className="text-heading-2">Licensed & Regulated</h3>
                <p className="text-body max-w-2xl mx-auto">
                  WhoGoWin operates under strict regulatory guidelines and maintains all necessary licenses to provide
                  lottery services in Nigeria. We're committed to responsible gaming and player protection.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
