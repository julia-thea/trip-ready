'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Button from '../components/Button';

/**
 * Error UI for the /lists segment.
 * Must be a Client Component.
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/error
 */
export default function ListsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[lists] error boundary:', error);
  }, [error]);

  return (
    <div className='min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-4'>
      <div className='w-full max-w-md bg-white border border-silver rounded-2xl shadow-sm p-8 text-center space-y-4'>
        <h1 className='text-2xl font-bold text-navy'>Something went wrong</h1>
        <p className='text-sm text-steel'>
          We couldn&apos;t load your lists. You can try again or go back home.
        </p>
        <div className='flex flex-col sm:flex-row gap-3 pt-2'>
          <Button type='button' variant='primary' fullWidth onClick={reset}>
            Try again
          </Button>
          <Link href='/' className='w-full'>
            <Button type='button' variant='outline' fullWidth>
              Go home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
