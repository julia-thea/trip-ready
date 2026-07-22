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
    <header className='sticky top-0 z-40 border-b border-silver/80 bg-ivory/90 backdrop-blur-md'>
      <div className='mx-auto flex max-w-6xl items-center justify-between px-8 py-4'>
        <Link href='/' className='flex items-center gap-2 text-xl font-semibold text-navy'>
          <Luggage className='w-6 h-6' />
          Trip Ready
        </Link>

        <div className='flex gap-3 items-center'>
          {status === 'loading' && <span className='text-sm text-steel'>Loading...</span>}

          {status === 'authenticated' && (
            <>
              <span className='hidden text-sm text-steel sm:inline'>{session.user?.email}</span>

              <Link href='/dashboard'>
                <Button variant='secondary'>Dashboard</Button>
              </Link>

              <Button variant='outline' onClick={() => signOut({ callbackUrl: '/' })}>
                Log Out
              </Button>
            </>
          )}

          {status === 'unauthenticated' && (
            <>
              <Link href='/login'>
                <Button variant='outline'>Login</Button>
              </Link>

              <Link href='/signup'>
                <Button variant='primary'>Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
