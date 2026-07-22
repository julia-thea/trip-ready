'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Button from './Button';

/**
 * Landing hero CTAs. Uses client session so they match the Navbar
 * (avoids stale static HTML where auth() was null at render time).
 */
export default function HeroAuthActions() {
  const { status } = useSession();

  if (status === 'loading') {
    return (
      <div className='mt-8 h-12 w-48 animate-pulse rounded-xl bg-silver/50' aria-hidden />
    );
  }

  if (status === 'authenticated') {
    return (
      <div className='mt-8 flex flex-col gap-3 sm:flex-row sm:items-center'>
        <Link href='/lists' className='w-full sm:w-auto'>
          <Button variant='primary' fullWidth>
            Go to dashboard
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className='mt-8 flex flex-col gap-3 sm:flex-row sm:items-center'>
      <Link href='/lists' className='w-full sm:w-auto'>
        <Button variant='primary' fullWidth>
          Create your list
        </Button>
      </Link>
      <Link
        href='/login'
        className='text-center text-sm font-medium text-navy underline-offset-4 hover:underline sm:text-left sm:pl-2'
      >
        Already have an account? Log in
      </Link>
    </div>
  );
}
