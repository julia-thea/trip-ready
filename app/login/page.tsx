/**
 * Login Page Component
 *
 * Client-side form for user authentication.
 * Handles email/password login using Auth.js (NextAuth).
 * Signed-in users are redirected to the dashboard.
 */
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { Eye, EyeOff } from 'lucide-react';
import Button from '../components/Button';
import AuthShell, {
  authInputClass,
  authPasswordToggleClass,
} from '../components/AuthShell';

function validateEmail(email: string): string {
  if (!email) return 'Email is required';
  if (!email.includes('@') || !email.includes('.')) return 'Invalid email format';
  return '';
}

function validatePassword(password: string): string {
  if (!password) return 'Password is required';
  return '';
}

function LoginForm() {
  const { status } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});

  useEffect(() => {
    if (status === 'authenticated') {
      window.location.replace('/lists');
    }
  }, [status]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      setFieldErrors({ email: emailError, password: passwordError });
      return;
    }

    setFieldErrors({});
    setLoading(true);
    setError('');

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError('Invalid email or password');
      setLoading(false);
    } else {
      window.location.href = '/lists';
    }
  }

  if (status === 'loading' || status === 'authenticated') {
    return (
      <AuthShell>
        <p className='text-center text-steel text-sm'>
          {status === 'authenticated' ? 'Taking you to your dashboard...' : 'Loading...'}
        </p>
      </AuthShell>
    );
  }

  return (
    <AuthShell title='Log in' description='Pick up where you left your packing list.'>
      <form onSubmit={handleSubmit} className='space-y-5'>
        <div>
          <label htmlFor='email' className='block text-sm font-medium text-slate mb-2'>
            Email
          </label>
          <input
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            autoComplete='email'
            className={authInputClass(!!fieldErrors.email)}
            placeholder='you@example.com'
          />
          {fieldErrors.email && (
            <p className='mt-2 text-sm text-red-500' role='alert'>
              {fieldErrors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor='password' className='block text-sm font-medium text-slate mb-2'>
            Password
          </label>
          <div className='relative'>
            <input
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? 'text' : 'password'}
              autoComplete='current-password'
              className={authInputClass(!!fieldErrors.password, true)}
              placeholder='Your password'
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
          {fieldErrors.password && (
            <p className='mt-2 text-sm text-red-500' role='alert'>
              {fieldErrors.password}
            </p>
          )}
          <p className='mt-2 text-right'>
            <Link href='/forgot-password' className='text-sm text-navy font-medium hover:underline'>
              Forgot password?
            </Link>
          </p>
        </div>

        <Button type='submit' disabled={loading} fullWidth>
          {loading ? 'Logging in...' : 'Log in'}
        </Button>

        {error && (
          <p className='text-center text-sm text-red-500' role='alert'>
            {error}
          </p>
        )}

        <p className='text-center text-sm text-steel pt-1'>
          Don&apos;t have an account?{' '}
          <Link href='/signup' className='text-navy font-medium hover:underline'>
            Sign up
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}

export default LoginForm;
