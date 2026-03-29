/**
 * Navbar Component
 * 
 * Global navigation bar that appears on all pages.
 * Dynamically shows different content based on authentication status.
 * 
 * Component Type: Client Component
 * - Uses 'use client' directive
 * - Requires client-side because it uses:
 *   - useSession() hook from next-auth/react
 *   - signOut() function (client-side only)
 * 
 * Authentication States:
 * - loading: Shows "Loading..." while checking session
 * - authenticated: Shows user email, Dashboard link, Log Out button
 * - unauthenticated: Shows Login and Sign Up buttons
 * 
 * Features:
 * - Logo/brand link to home page
 * - Conditional rendering based on auth status
 * - Sign out functionality with redirect
 */
'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Luggage } from 'lucide-react';
import Button from './Button';

/**
 * Navbar Component
 * 
 * Renders navigation bar with conditional content based on session status.
 * 
 * @returns JSX for the navigation bar
 */
export default function Navbar() {
  /**
   * Get Session Status
   * 
   * useSession() hook from next-auth/react:
   * - Returns current session data and status
   * - status: 'loading' | 'authenticated' | 'unauthenticated'
   * - data: Session object with user info (if authenticated)
   * 
   * This hook requires SessionProvider in the component tree
   * (provided by app/providers.tsx in layout.tsx)
   */
  const { data: session, status } = useSession();

  return (
    <header className='mx-auto px-8 py-6 flex justify-between items-center'>
      {/* Logo/Brand Link */}
      <Link href='/' className='flex items-center gap-2 text-xl font-semibold text-navy'>
        <Luggage className='w-6 h-6' />
        Trip Ready
      </Link>

      {/* Right Side: Authentication-Dependent Content */}
      <div className='flex gap-3 items-center'>
        {/* Loading State: Checking Session */}
        {status === 'loading' && <span className='text-sm text-steel'>Loading...</span>}

        {/* Authenticated State: User is logged in */}
        {status === 'authenticated' && (
          <>
            {/* User Email */}
            <span className='text-sm text-steel'>{session.user?.email}</span>

            {/* Dashboard Link */}
            <Link href='/dashboard'>
              <Button variant='secondary'>Dashboard</Button>
            </Link>

            {/* Log Out Button */}
            {/* 
              signOut() from next-auth/react:
              - Clears session cookie
              - Redirects to callbackUrl after sign out
              - callbackUrl: '/' means redirect to home page
            */}
            <Button variant='outline' onClick={() => signOut({ callbackUrl: '/' })}>
              Log Out
            </Button>
          </>
        )}

        {/* Unauthenticated State: User is not logged in */}
        {status === 'unauthenticated' && (
          <>
            {/* Login Link */}
            <Link href='/login'>
              <Button variant='outline'>Login</Button>
            </Link>

            {/* Sign Up Link */}
            <Link href='/signup'>
              <Button variant='primary'>Sign Up</Button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
