/**
 * Navbar Component
 *
 * Global navigation. Authenticated: email, Dashboard text link, Log out. Brand → /lists when signed in.
 */
'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Luggage } from 'lucide-react';
import Button from './Button';

export default function Navbar() {
  const { data: session, status } = useSession();
  const brandHref = status === 'authenticated' ? '/lists' : '/';

  return (
    <header className='sticky top-0 z-40 border-b border-silver/80 bg-ivory/90 backdrop-blur-md'>
      <div className='mx-auto flex max-w-6xl items-center justify-between px-8 py-4'>
        <Link href={brandHref} className='flex items-center gap-2 text-xl font-semibold text-navy'>
          <Luggage className='w-6 h-6' />
          Trip Ready
        </Link>

        <div className='flex gap-3 items-center'>
          {status === 'loading' && <span className='text-sm text-steel'>Loading...</span>}

          {status === 'authenticated' && (
            <>
              <span className='hidden text-sm text-steel sm:inline'>{session.user?.email}</span>

              <Link
                href='/lists'
                className='text-sm font-medium text-navy underline-offset-4 hover:underline'
              >
                Dashboard
              </Link>

              <Button variant='outline' onClick={() => signOut({ callbackUrl: '/' })}>
                Log out
              </Button>
            </>
          )}

          {status === 'unauthenticated' && (
            <>
              <Link href='/login'>
                <Button variant='outline'>Log in</Button>
              </Link>

              <Link href='/signup'>
                <Button variant='primary'>Sign up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
