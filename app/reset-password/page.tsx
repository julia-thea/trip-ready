'use client';

import { Suspense, useActionState, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import Button from '../components/Button';
import Navbar from '../components/Navbar';
import { resetPassword, type PasswordResetState } from '../actions/password-reset';

const initialState: PasswordResetState = {};

function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className='min-h-screen bg-gradient-to-b from-slate-50 to-white'>
      <Navbar />
      <main className='flex items-center justify-center px-4 py-12'>
        <div className='w-full max-w-md'>{children}</div>
      </main>
    </div>
  );
}

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') ?? '';
  const email = searchParams.get('email') ?? '';

  const [state, formAction, isPending] = useActionState(resetPassword, initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  if (!token || !email) {
    return (
      <PageShell>
        <div className='bg-white border border-silver rounded-2xl shadow-sm p-8 sm:p-10 text-center space-y-4'>
          <h1 className='text-2xl font-bold text-navy'>Invalid reset link</h1>
          <p className='text-steel text-sm'>
            This link is missing required information. Request a new password reset.
          </p>
          <Link href='/forgot-password' className='text-navy font-medium hover:underline'>
            Request a new link
          </Link>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className='bg-white border border-silver rounded-2xl shadow-sm p-8 sm:p-10'>
        <div className='text-center mb-8'>
          <h1 className='text-2xl font-bold text-navy mb-2'>Set a new password</h1>
          <p className='text-steel text-sm'>Choose a password with at least 8 characters.</p>
        </div>

        <form action={formAction} className='space-y-5'>
          <input type='hidden' name='token' value={token} />
          <input type='hidden' name='email' value={email} />

          <div>
            <label htmlFor='password' className='block text-sm font-medium text-slate mb-2'>
              New password
            </label>
            <div className='relative'>
              <input
                id='password'
                name='password'
                type={showPassword ? 'text' : 'password'}
                required
                minLength={8}
                autoComplete='new-password'
                className='w-full px-4 py-3 pr-12 rounded-xl border border-silver focus:border-navy focus:ring-navy focus:outline-none focus:ring-2 focus:ring-opacity-20 transition-all'
                placeholder='At least 8 characters'
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-steel hover:text-navy transition-colors'
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor='confirmPassword' className='block text-sm font-medium text-slate mb-2'>
              Confirm password
            </label>
            <div className='relative'>
              <input
                id='confirmPassword'
                name='confirmPassword'
                type={showConfirm ? 'text' : 'password'}
                required
                minLength={8}
                autoComplete='new-password'
                className='w-full px-4 py-3 pr-12 rounded-xl border border-silver focus:border-navy focus:ring-navy focus:outline-none focus:ring-2 focus:ring-opacity-20 transition-all'
                placeholder='Repeat password'
              />
              <button
                type='button'
                onClick={() => setShowConfirm(!showConfirm)}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-steel hover:text-navy transition-colors'
                aria-label={showConfirm ? 'Hide password' : 'Show password'}
              >
                {showConfirm ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
              </button>
            </div>
          </div>

          <Button type='submit' disabled={isPending} fullWidth>
            {isPending ? 'Saving...' : 'Update password'}
          </Button>

          {state.error && (
            <p className='text-center text-sm text-red-500' role='alert'>
              {state.error}
            </p>
          )}

          <p className='text-center text-sm text-steel pt-1'>
            <Link href='/login' className='text-navy font-medium hover:underline'>
              Back to log in
            </Link>
          </p>
        </form>
      </div>
    </PageShell>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className='min-h-screen bg-gradient-to-b from-slate-50 to-white'>
          <Navbar />
          <main className='flex items-center justify-center px-4 py-12'>
            <p className='text-steel'>Loading...</p>
          </main>
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
