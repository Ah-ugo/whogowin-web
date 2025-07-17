"use client"

import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Wallet, User, LogOut, Menu, X, Home, Trophy, HelpCircle, Phone } from "lucide-react"
import { useState } from "react"

export function Navbar() {
  const { user, logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigationItems = [
    { href: "/draws", label: "Draws", icon: Trophy },
    { href: "/about", label: "About", icon: Home },
    { href: "/contact", label: "Contact", icon: Phone },
    { href: "/faq", label: "FAQ", icon: HelpCircle },
  ]

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="flex justify-between items-center h-16 sm:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3 hover-scale">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-gray-900 to-gray-700 rounded-lg sm:rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-sm sm:text-base">W</span>
            </div>
            <span className="text-lg sm:text-xl font-bold text-gray-900">WhoGoWin</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-gray-50"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {user ? (
              <>
                {/* Wallet Balance */}
                <Link
                  href="/wallet"
                  className="hidden sm:flex items-center space-x-2 bg-green-50 hover:bg-green-100 px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl transition-colors border border-green-200 hover-scale"
                >
                  <Wallet className="w-4 h-4 text-green-600" />
                  <span className="text-green-700 font-semibold text-sm sm:text-base">
                    ₦{user.wallet_balance.toLocaleString()}
                  </span>
                </Link>

                {/* User Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-9 w-9 sm:h-10 sm:w-10 rounded-full focus-ring hover-scale"
                    >
                      <Avatar className="h-9 w-9 sm:h-10 sm:w-10">
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold">
                          {user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-white border-gray-200 shadow-lg" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-4 border-b border-gray-100">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="w-[200px] truncate text-sm text-gray-600">{user.email}</p>
                      </div>
                    </div>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="cursor-pointer flex items-center px-4 py-3 hover:bg-gray-50">
                        <User className="mr-3 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/wallet" className="cursor-pointer flex items-center px-4 py-3 hover:bg-gray-50">
                        <Wallet className="mr-3 h-4 w-4" />
                        Wallet
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={logout}
                      className="cursor-pointer text-red-600 flex items-center px-4 py-3 hover:bg-red-50"
                    >
                      <LogOut className="mr-3 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Button variant="ghost" asChild className="text-gray-600 hover:text-gray-900 hover:bg-gray-50">
                  <Link href="/auth/login">Sign in</Link>
                </Button>
                <Button asChild className="btn-primary">
                  <Link href="/auth/register">Get Started</Link>
                </Button>
              </div>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:lg:hidden focus-ring p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 animate-fade-in bg-white">
            <div className="flex flex-col space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 font-medium transition-colors rounded-lg mx-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              ))}

              {user ? (
                <div className="px-4 py-3 mx-2 mt-4">
                  <Link
                    href="/wallet"
                    className="flex items-center space-x-3 bg-green-50 hover:bg-green-100 p-3 rounded-lg border border-green-200 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Wallet className="w-5 h-5 text-green-600" />
                    <div>
                      <div className="text-sm text-gray-600">Wallet Balance</div>
                      <div className="text-green-700 font-semibold">₦{user.wallet_balance.toLocaleString()}</div>
                    </div>
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col space-y-3 px-4 mt-6">
                  <Button variant="ghost" asChild className="justify-start">
                    <Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>
                      Sign in
                    </Link>
                  </Button>
                  <Button asChild className="btn-primary">
                    <Link href="/auth/register" onClick={() => setIsMobileMenuOpen(false)}>
                      Get Started
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
