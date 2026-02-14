'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Eye, EyeOff } from 'lucide-react';
import Button from '../components/Button';

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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const emailError: string = validateEmail(email);
    const passwordError: string = validatePassword(password);

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
      window.location.href = '/dashboard';
    }
  }
  return (
    <div className='min-h-screen flex items-center justify-center px-4'>
      <div className='w-full max-w-md'>
        <h1 className='text-3xl font-bold text-navy text-center mb-8'>Welcome Back</h1>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label htmlFor='email' className='block text-sm font-medium text-slate mb-2'>
              Email
            </label>
            <input
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type='email'
              className={`w-full px-4 py-3 rounded-xl border ${fieldErrors.email
                ? 'border-red-500 focus:ring-red-500'
                : 'border-silver focus:border-navy focus:ring-navy'
                } focus:outline-none focus:ring-2 focus:ring-opacity-20 transition-all`}
              placeholder='you@example.com'
            />
            {fieldErrors.email && <p className='mt-2 text-sm text-red-500'>{fieldErrors.email}</p>}
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
                className={`w-full px-4 py-3 pr-12 rounded-xl border ${fieldErrors.password
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-silver focus:border-navy focus:ring-navy'
                  } focus:outline-none focus:ring-2 focus:ring-opacity-20 transition-all`}
                placeholder='Your password'
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-steel hover:text-navy transition-colors'
              >
                {showPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
              </button>
            </div>
            {fieldErrors.password && (
              <p className='mt-2 text-sm text-red-500'>{fieldErrors.password}</p>
            )}
          </div>

          <Button type='submit' disabled={loading} fullWidth>
            {loading ? 'Logging in...' : 'Log In'}
          </Button>

          {error && <p className='text-center text-sm text-red-500'>{error}</p>}

          <p className='text-center text-sm text-steel'>
            Don&apos;t have an account?{' '}
            <a href='/signup' className='text-navy font-medium hover:underline'>
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
