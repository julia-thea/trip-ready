'use client';

import { Suspense, useActionState, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import Button from '../components/Button';
import AuthShell, {
  authInputClass,
  authPasswordToggleClass,
} from '../components/AuthShell';
import { resetPassword, type PasswordResetState } from '../actions/password-reset';

const initialState: PasswordResetState = {};

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') ?? '';
  const email = searchParams.get('email') ?? '';

  const [state, formAction, isPending] = useActionState(resetPassword, initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  if (!token || !email) {
    return (
      <AuthShell title='Invalid reset link'>
        <div className='text-center space-y-4'>
          <p className='text-steel text-sm'>
            This link is missing required information. Request a new password reset.
          </p>
          <Link href='/forgot-password' className='block'>
            <Button variant='primary' fullWidth>
              Request a new link
            </Button>
          </Link>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title='Set a new password'
      description='Choose a password with at least 8 characters.'
    >
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
              className={authInputClass(false, true)}
              placeholder='At least 8 characters'
            />
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className={authPasswordToggleClass}
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
              className={authInputClass(false, true)}
              placeholder='Repeat password'
            />
            <button
              type='button'
              onClick={() => setShowConfirm(!showConfirm)}
              className={authPasswordToggleClass}
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
    </AuthShell>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <AuthShell>
          <p className='text-center text-steel'>Loading...</p>
        </AuthShell>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
