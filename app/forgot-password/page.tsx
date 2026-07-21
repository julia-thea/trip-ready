'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import Button from '../components/Button';
import Navbar from '../components/Navbar';
import {
  requestPasswordReset,
  type PasswordResetState,
} from '../actions/password-reset';

const initialState: PasswordResetState = {};

function ForgotPasswordForm() {
  const [state, formAction, isPending] = useActionState(requestPasswordReset, initialState);
  const isDev = process.env.NODE_ENV === 'development';

  return (
    <div className='min-h-screen bg-gradient-to-b from-slate-50 to-white'>
      <Navbar />
      <main className='flex items-center justify-center px-4 py-12'>
        <div className='w-full max-w-md'>
          <div className='bg-white border border-silver rounded-2xl shadow-sm p-8 sm:p-10'>
            {state.ok ? (
              <div className='text-center space-y-5'>
                <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sky text-navy'>
                  <Mail className='h-6 w-6' aria-hidden />
                </div>
                <div>
                  <h1 className='text-2xl font-bold text-navy mb-2'>Check your email</h1>
                  <p className='text-steel text-sm leading-relaxed'>
                    If an account exists for that address, we sent a reset link. Check your inbox
                    and spam folder. The link expires in 1 hour.
                  </p>
                </div>
                {isDev && (
                  <p className='text-xs text-steel/80 bg-ivory rounded-lg px-3 py-2 text-left'>
                    Dev: without <code className='text-navy'>RESEND_API_KEY</code>, the reset URL
                    is printed in the server console.
                  </p>
                )}
                <Link href='/login' className='block pt-2'>
                  <Button variant='primary' fullWidth>
                    Back to log in
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                <div className='text-center mb-8'>
                  <h1 className='text-2xl font-bold text-navy mb-2'>Forgot password</h1>
                  <p className='text-steel text-sm leading-relaxed'>
                    Enter your email and we&apos;ll send a reset link if an account exists.
                  </p>
                </div>

                <form action={formAction} className='space-y-5'>
                  <div>
                    <label htmlFor='email' className='block text-sm font-medium text-slate mb-2'>
                      Email
                    </label>
                    <input
                      id='email'
                      name='email'
                      type='email'
                      required
                      autoComplete='email'
                      className='w-full px-4 py-3 rounded-xl border border-silver focus:border-navy focus:ring-navy focus:outline-none focus:ring-2 focus:ring-opacity-20 transition-all'
                      placeholder='you@example.com'
                    />
                  </div>

                  <Button type='submit' disabled={isPending} fullWidth>
                    {isPending ? 'Sending...' : 'Send reset link'}
                  </Button>

                  {state.error && (
                    <p className='text-center text-sm text-red-500' role='alert'>
                      {state.error}
                    </p>
                  )}

                  <p className='text-center text-sm text-steel pt-1'>
                    Remember your password?{' '}
                    <Link href='/login' className='text-navy font-medium hover:underline'>
                      Log in
                    </Link>
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default ForgotPasswordForm;
