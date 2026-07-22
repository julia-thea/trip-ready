'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import Button from '../components/Button';
import AuthShell, { authInputClass } from '../components/AuthShell';
import {
  requestPasswordReset,
  type PasswordResetState,
} from '../actions/password-reset';

const initialState: PasswordResetState = {};

function ForgotPasswordForm() {
  const [state, formAction, isPending] = useActionState(requestPasswordReset, initialState);
  const isDev = process.env.NODE_ENV === 'development';

  if (state.ok) {
    return (
      <AuthShell>
        <div className='text-center space-y-5'>
          <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sky text-navy'>
            <Mail className='h-6 w-6' aria-hidden />
          </div>
          <div>
            <h1 className='text-2xl font-bold text-navy mb-2'>Check your email</h1>
            <p className='text-steel text-sm leading-relaxed'>
              If an account exists for that address, we sent a reset link. Check your inbox and spam
              folder. The link expires in 1 hour.
            </p>
          </div>
          {isDev && (
            <p className='text-xs text-steel/80 bg-ivory rounded-lg px-3 py-2 text-left'>
              Dev: without <code className='text-navy'>RESEND_API_KEY</code>, the reset URL is
              printed in the server console.
            </p>
          )}
          <Link href='/login' className='block pt-2'>
            <Button variant='primary' fullWidth>
              Back to log in
            </Button>
          </Link>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title='Forgot password'
      description="Enter your email and we'll send a reset link if an account exists."
    >
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
            className={authInputClass()}
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
    </AuthShell>
  );
}

export default ForgotPasswordForm;
