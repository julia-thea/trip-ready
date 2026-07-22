/**
 * Signup Page Component
 *
 * Client-side form for user registration.
 * Handles email/password signup with validation and error handling.
 */
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, Eye, EyeOff } from 'lucide-react';
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
  if (password.length < 8) return 'Password must be at least 8 characters';
  return '';
}

function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});

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

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          window.location.href = '/login';
        }, 1500);
      } else {
        const data = await response.json();
        setError(data.error || 'Signup failed');
      }
    } catch {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <AuthShell>
        <div className='text-center space-y-5'>
          <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sky text-navy'>
            <Check className='h-6 w-6' aria-hidden />
          </div>
          <div>
            <h1 className='text-2xl font-bold text-navy mb-2'>Account created</h1>
            <p className='text-steel text-sm leading-relaxed'>
              Your account is ready. Continue to log in to start packing.
            </p>
          </div>
          <Link href='/login' className='block pt-2'>
            <Button variant='primary' fullWidth>
              Continue to log in
            </Button>
          </Link>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title='Create account'
      description='Save packing lists and pack from any device.'
    >
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
              autoComplete='new-password'
              className={authInputClass(!!fieldErrors.password, true)}
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
          <p className='mt-2 text-sm text-steel'>At least 8 characters.</p>
          {fieldErrors.password && (
            <p className='mt-2 text-sm text-red-500' role='alert'>
              {fieldErrors.password}
            </p>
          )}
        </div>

        <Button type='submit' disabled={loading} fullWidth>
          {loading ? 'Creating account...' : 'Sign up'}
        </Button>

        {error && (
          <p className='text-center text-sm text-red-500' role='alert'>
            {error}
          </p>
        )}

        <p className='text-center text-sm text-steel pt-1'>
          Already have an account?{' '}
          <Link href='/login' className='text-navy font-medium hover:underline'>
            Log in
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}

export default SignupForm;
