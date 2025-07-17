"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronDown, ChevronUp, Search, HelpCircle } from "lucide-react"
import Link from "next/link"

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((item) => item !== index) : [...prev, index]))
  }

  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "How do I create an account on WhoGoWin?",
          answer:
            "Creating an account is simple! Click the 'Get Started' button, fill in your details (name, email, password), accept our terms, and you're ready to play. You'll receive a confirmation email to verify your account.",
        },
        {
          question: "Is WhoGoWin legal and licensed?",
          answer:
            "Yes, WhoGoWin operates under all necessary licenses and regulatory approvals in Nigeria. We comply with all local gaming laws and maintain the highest standards of legal operation.",
        },
        {
          question: "How old do I need to be to play?",
          answer:
            "You must be at least 18 years old to create an account and participate in lottery draws on WhoGoWin. We take age verification seriously and may request ID verification.",
        },
      ],
    },
    {
      category: "Playing the Lottery",
      questions: [
        {
          question: "How do I buy a lottery ticket?",
          answer:
            "To buy a ticket: 1) Choose an active draw, 2) Select 5 numbers from 1-30 (or use Quick Pick), 3) Confirm your selection, 4) Pay ₦100 per ticket. Your ticket will be confirmed immediately.",
        },
        {
          question: "What is Quick Pick?",
          answer:
            "Quick Pick automatically selects 5 random numbers for you. It's perfect if you want to play but don't have specific numbers in mind. The system uses a secure random number generator.",
        },
        {
          question: "Can I buy multiple tickets for the same draw?",
          answer:
            "Yes! You can purchase as many tickets as you want for any draw, as long as you have sufficient wallet balance. Each ticket gives you another chance to win.",
        },
        {
          question: "When do draws take place?",
          answer:
            "We have three types of draws: Daily draws (every evening), Weekly draws (every Sunday), and Monthly draws (last day of each month). Check the countdown timer for exact times.",
        },
      ],
    },
    {
      category: "Payments & Wallet",
      questions: [
        {
          question: "How do I add money to my wallet?",
          answer:
            "Go to your Wallet page, enter the amount you want to add (minimum ₦100), and click 'Top Up Wallet'. You'll be redirected to Paystack to complete the payment securely using your card or bank transfer.",
        },
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept all major debit/credit cards (Visa, Mastercard, Verve) and bank transfers through our secure payment partner, Paystack. All transactions are encrypted and secure.",
        },
        {
          question: "How quickly are winnings paid out?",
          answer:
            "Winnings are credited to your wallet instantly after the draw results are confirmed. There are no delays or waiting periods - you can use your winnings immediately or withdraw them.",
        },
        {
          question: "Are there any fees for deposits or withdrawals?",
          answer:
            "We don't charge any fees for deposits. Withdrawal fees may apply depending on the method chosen. All fees are clearly displayed before you confirm any transaction.",
        },
      ],
    },
    {
      category: "Winning & Prizes",
      questions: [
        {
          question: "How do I know if I've won?",
          answer:
            "You'll be notified immediately via email and SMS if you win. You can also check your tickets page or the draw results page. Winning amounts are automatically credited to your wallet.",
        },
        {
          question: "What are the different prize tiers?",
          answer:
            "Match 5 numbers: Jackpot (varies by draw), Match 4 numbers: Consolation prize, Match 3 numbers: Small prize, Match 2 numbers: Bonus credits. The more numbers you match, the bigger your prize!",
        },
        {
          question: "Is there a limit on how much I can win?",
          answer:
            "There's no limit on your winnings! You can win multiple prizes across different draws, and all winnings are paid out in full. The sky's the limit!",
        },
        {
          question: "How are the winning numbers selected?",
          answer:
            "We use a certified random number generator that's audited regularly for fairness. The draw process is transparent and cannot be manipulated. All draws are conducted with complete integrity.",
        },
      ],
    },
    {
      category: "Account & Security",
      questions: [
        {
          question: "How do I reset my password?",
          answer:
            "Click 'Forgot Password' on the login page, enter your email address, and we'll send you a secure reset link. Follow the instructions in the email to create a new password.",
        },
        {
          question: "Is my personal information safe?",
          answer:
            "We use bank-level encryption (AES-256) to protect all your data. We never share your personal information with third parties and comply with all data protection regulations.",
        },
        {
          question: "Can I change my account details?",
          answer:
            "Yes, you can update most of your account information in your profile settings. For security reasons, some changes (like email) may require verification steps.",
        },
        {
          question: "What should I do if I suspect unauthorized access?",
          answer:
            "Contact our support team immediately at support@whogowin.com. Change your password right away and review your account activity. We take security breaches very seriously.",
        },
      ],
    },
    {
      category: "Technical Support",
      questions: [
        {
          question: "The website isn't loading properly. What should I do?",
          answer:
            "Try refreshing the page, clearing your browser cache, or using a different browser. If the problem persists, check our social media for any maintenance announcements or contact support.",
        },
        {
          question: "Can I play on my mobile phone?",
          answer:
            "Yes! WhoGoWin is fully optimized for mobile devices. You can play on any smartphone or tablet using your web browser. The experience is just as smooth as on desktop.",
        },
        {
          question: "I'm having trouble making a payment. What should I do?",
          answer:
            "First, check that your card details are correct and you have sufficient funds. If the problem continues, try a different payment method or contact your bank. You can also reach out to our support team.",
        },
      ],
    },
  ]

  const filteredFAQs = faqs
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    }))
    .filter((category) => category.questions.length > 0)

  return (
    <div className="min-h-screen bg-[hsl(var(--surface-primary))]">
      <Navbar />

      <div className="max-w-4xl mx-auto container-padding py-12">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-display mb-6">Frequently Asked Questions</h1>
          <p className="text-body-large mb-8">
            Find answers to common questions about WhoGoWin. Can't find what you're looking for? Contact our support
            team.
          </p>

          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[hsl(var(--text-tertiary))] w-5 h-5" />
            <Input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 focus-ring"
            />
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {filteredFAQs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="animate-slide-up" style={{ animationDelay: `${categoryIndex * 0.1}s` }}>
              <h2 className="text-heading-2 mb-6">{category.category}</h2>
              <div className="space-y-4">
                {category.questions.map((faq, questionIndex) => {
                  const globalIndex = categoryIndex * 100 + questionIndex
                  const isOpen = openItems.includes(globalIndex)

                  return (
                    <Card key={questionIndex} className="card-primary">
                      <CardContent className="p-0">
                        <button
                          onClick={() => toggleItem(globalIndex)}
                          className="w-full p-6 text-left hover:bg-[hsl(var(--surface-secondary))] transition-colors focus-ring rounded-xl"
                        >
                          <div className="flex justify-between items-center">
                            <h3 className="text-heading-3 pr-4">{faq.question}</h3>
                            {isOpen ? (
                              <ChevronUp className="w-5 h-5 text-[hsl(var(--text-secondary))] flex-shrink-0" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-[hsl(var(--text-secondary))] flex-shrink-0" />
                            )}
                          </div>
                        </button>
                        {isOpen && (
                          <div className="px-6 pb-6 animate-fade-in">
                            <p className="text-body leading-relaxed">{faq.answer}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {searchTerm && filteredFAQs.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <HelpCircle className="w-16 h-16 text-[hsl(var(--text-tertiary))] mx-auto mb-4" />
            <h3 className="text-heading-2 mb-2">No results found</h3>
            <p className="text-body mb-6">
              We couldn't find any FAQs matching "{searchTerm}". Try different keywords or contact our support team.
            </p>
            <Button className="btn-secondary" onClick={() => setSearchTerm("")}>
              Clear Search
            </Button>
          </div>
        )}

        {/* Contact Support */}
        <div className="mt-16 animate-slide-up" style={{ animationDelay: "0.5s" }}>
          <Card className="card-elevated">
            <CardContent className="pt-8">
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-[hsl(var(--brand-accent))]/10 rounded-full flex items-center justify-center mx-auto">
                  <HelpCircle className="w-8 h-8 text-[hsl(var(--brand-accent))]" />
                </div>
                <div>
                  <h2 className="text-heading-2 mb-2">Still Need Help?</h2>
                  <p className="text-body mb-6">
                    Can't find the answer you're looking for? Our friendly support team is here to help you 24/7.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="btn-primary" asChild>
                    <Link href="/contact">Contact Support</Link>
                  </Button>
                  <Button className="btn-secondary" asChild>
                    <a href="mailto:support@whogowin.com">Email Us</a>
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
