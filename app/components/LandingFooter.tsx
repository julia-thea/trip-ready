'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Luggage } from 'lucide-react';

/**
 * Landing footer links. Client session so signed-in state matches Navbar.
 */
export default function LandingFooter() {
  const { status } = useSession();
  const isSignedIn = status === 'authenticated';

  return (
    <footer className='border-t border-silver bg-white'>
      <div className='mx-auto flex max-w-6xl flex-col gap-4 px-8 py-8 sm:flex-row sm:items-center sm:justify-between'>
        <Link
          href={isSignedIn ? '/lists' : '/'}
          className='inline-flex items-center gap-2 text-sm font-semibold text-navy'
        >
          <Luggage className='h-4 w-4' aria-hidden />
          Trip Ready
        </Link>
        <nav className='flex flex-wrap gap-x-5 gap-y-2 text-sm text-steel'>
          {isSignedIn ? (
            <Link href='/lists' className='hover:text-navy'>
              Dashboard
            </Link>
          ) : (
            <>
              <Link href='/lists' className='hover:text-navy'>
                Lists
              </Link>
              <Link href='/login' className='hover:text-navy'>
                Log in
              </Link>
              <Link href='/signup' className='hover:text-navy'>
                Sign up
              </Link>
            </>
          )}
        </nav>
      </div>
    </footer>
  );
}
