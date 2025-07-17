"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Mail, Phone, MapPin, Clock, Send, Loader2 } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    })

    setFormData({ name: "", email: "", subject: "", message: "" })
    setIsSubmitting(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--surface-primary))]">
      <Navbar />

      <div className="max-w-6xl mx-auto container-padding py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-display mb-6">Contact Us</h1>
          <p className="text-body-large max-w-3xl mx-auto">
            Have questions, feedback, or need support? We're here to help. Reach out to our friendly team and we'll
            respond as quickly as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="card-elevated animate-slide-up">
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-[hsl(var(--text-primary))] font-medium">
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="focus-ring"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-[hsl(var(--text-primary))] font-medium">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="focus-ring"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-[hsl(var(--text-primary))] font-medium">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="What is this about?"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="focus-ring"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-[hsl(var(--text-primary))] font-medium">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us how we can help you..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="focus-ring resize-none"
                    />
                  </div>

                  <Button type="submit" className="btn-primary w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Contact Details */}
            <Card className="card-primary animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-[hsl(var(--brand-accent))]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-[hsl(var(--brand-accent))]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[hsl(var(--text-primary))] mb-1">Email</h3>
                    <p className="text-body">support@whogowin.com</p>
                    <p className="text-body-small">We reply within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-[hsl(var(--success))]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-[hsl(var(--success))]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[hsl(var(--text-primary))] mb-1">Phone</h3>
                    <p className="text-body">+234 810 000 0000</p>
                    <p className="text-body-small">Mon-Fri, 9AM-6PM WAT</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-[hsl(var(--warning))]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[hsl(var(--warning))]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[hsl(var(--text-primary))] mb-1">Office</h3>
                    <p className="text-body">Lagos, Nigeria</p>
                    <p className="text-body-small">Visit by appointment</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support Hours */}
            <Card className="card-primary animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>Support Hours</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-body">Monday - Friday</span>
                  <span className="font-medium text-[hsl(var(--text-primary))]">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-body">Saturday</span>
                  <span className="font-medium text-[hsl(var(--text-primary))]">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-body">Sunday</span>
                  <span className="font-medium text-[hsl(var(--text-primary))]">Closed</span>
                </div>
                <div className="border-t border-[hsl(var(--border))] pt-3 mt-3">
                  <p className="text-body-small">
                    <strong>Emergency Support:</strong> Available 24/7 for account security issues
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* FAQ Link */}
            <Card className="card-primary animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <h3 className="font-semibold text-[hsl(var(--text-primary))]">Quick Answers</h3>
                  <p className="text-body">
                    Check our FAQ section for instant answers to common questions about playing, payments, and more.
                  </p>
                  <Button className="btn-secondary w-full" asChild>
                    <a href="/faq">Browse FAQ</a>
                  </Button>
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
