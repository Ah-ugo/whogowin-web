/** @format */

'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Wallet,
  User,
  LogOut,
  Menu,
  X,
  Home,
  Trophy,
  HelpCircle,
  Phone,
} from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';

export function Navbar() {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { href: '/draws', label: 'Draws', icon: Trophy },
    { href: '/about', label: 'About', icon: Home },
    { href: '/contact', label: 'Contact', icon: Phone },
    { href: '/faq', label: 'FAQ', icon: HelpCircle },
  ];

  return (
    <nav className='bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50 shadow-sm'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo and Mobile Menu Button */}
          <div className='flex items-center space-x-4'>
            <Button
              variant='ghost'
              size='icon'
              className='lg:hidden focus-ring p-2'
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className='h-5 w-5' />
              ) : (
                <Menu className='h-5 w-5' />
              )}
            </Button>

            <Link href='/' className='flex items-center space-x-2 hover-scale'>
              <div className='w-8 h-8 bg-gradient-to-br from-gray-900 to-gray-700 rounded-lg flex items-center justify-center shadow'>
                <span className='text-white font-bold text-sm'>W</span>
              </div>
              <span className='text-lg font-bold text-gray-900 hidden sm:inline'>
                WhoGoWin
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className='hidden lg:flex items-center space-x-1'>
            {navigationItems.map((item) => (
              <Button
                key={item.href}
                variant='ghost'
                asChild
                className='text-gray-600 hover:text-gray-900 font-medium px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors'
              >
                <Link href={item.href}>
                  <item.icon className='w-4 h-4 mr-2' />
                  {item.label}
                </Link>
              </Button>
            ))}
          </div>

          {/* User Controls */}
          <div className='flex items-center space-x-2 sm:space-x-3'>
            {user ? (
              <>
                {/* Wallet Balance */}
                <Link
                  href='/wallet'
                  className='hidden sm:flex items-center space-x-2 bg-green-50 hover:bg-green-100 px-3 py-2 rounded-lg transition-colors border border-green-200 hover-scale'
                >
                  <Wallet className='w-4 h-4 text-green-600' />
                  <span className='text-green-700 font-semibold text-sm'>
                    ₦{user.wallet_balance?.toLocaleString() || '0.00'}
                  </span>
                </Link>

                {/* User Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant='ghost'
                      className='relative h-9 w-9 rounded-full focus-ring hover-scale'
                    >
                      <Avatar className='h-9 w-9'>
                        <AvatarFallback className='bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold'>
                          {user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className='w-56 bg-white border-gray-200 shadow-lg rounded-lg'
                    align='end'
                    forceMount
                  >
                    <div className='flex items-center gap-3 p-3 border-b border-gray-100'>
                      <Avatar className='h-9 w-9'>
                        <AvatarFallback className='bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold'>
                          {user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className='flex flex-col'>
                        <p className='font-medium text-gray-900 truncate'>
                          {user.name}
                        </p>
                        <p className='text-sm text-gray-500 truncate'>
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <DropdownMenuItem asChild>
                      <Link
                        href='/dashboard'
                        className='cursor-pointer flex items-center px-3 py-2.5 hover:bg-gray-50 rounded'
                      >
                        <User className='mr-2 h-4 w-4 text-gray-500' />
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href='/wallet'
                        className='cursor-pointer flex items-center px-3 py-2.5 hover:bg-gray-50 rounded'
                      >
                        <Wallet className='mr-2 h-4 w-4 text-gray-500' />
                        <span>Wallet</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={logout}
                      className='cursor-pointer text-red-600 flex items-center px-3 py-2.5 hover:bg-red-50 rounded'
                    >
                      <LogOut className='mr-2 h-4 w-4' />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className='hidden md:flex items-center space-x-2'>
                <Button
                  variant='ghost'
                  asChild
                  className='text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                >
                  <Link href='/auth/login'>Sign in</Link>
                </Button>
                <Button
                  asChild
                  className='bg-blue-600 hover:bg-blue-700 text-white'
                >
                  <Link href='/auth/register'>Get Started</Link>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className='lg:hidden py-3 border-t border-gray-100 animate-fade-in bg-white'>
            <div className='flex flex-col space-y-1 px-2'>
              {navigationItems.map((item) => (
                <Button
                  key={item.href}
                  variant='ghost'
                  asChild
                  className='justify-start px-3 py-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-50 font-medium'
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Link href={item.href}>
                    <item.icon className='w-4 h-4 mr-3' />
                    {item.label}
                  </Link>
                </Button>
              ))}

              {user ? (
                <>
                  <div className='px-3 py-2.5 mt-2'>
                    <Link
                      href='/wallet'
                      className='flex items-center space-x-3 bg-green-50 hover:bg-green-100 p-3 rounded-lg border border-green-200 transition-colors'
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Wallet className='w-5 h-5 text-green-600' />
                      <div>
                        <div className='text-sm text-gray-600'>
                          Wallet Balance
                        </div>
                        <div className='text-green-700 font-semibold'>
                          ₦{user.wallet_balance?.toLocaleString() || '0.00'}
                        </div>
                      </div>
                    </Link>
                  </div>
                  <Button
                    variant='ghost'
                    className='justify-start px-3 py-2.5 text-red-600 hover:bg-red-50'
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className='w-4 h-4 mr-3' />
                    Sign out
                  </Button>
                </>
              ) : (
                <div className='flex flex-col space-y-2 mt-4 px-1'>
                  <Button
                    variant='ghost'
                    asChild
                    className='justify-start px-3 py-2.5'
                  >
                    <Link
                      href='/auth/login'
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign in
                    </Link>
                  </Button>
                  <Button
                    asChild
                    className='bg-blue-600 hover:bg-blue-700 text-white'
                  >
                    <Link
                      href='/auth/register'
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
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
  );
}
