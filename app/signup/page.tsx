'use client';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

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
    const emailError: string = validateEmail(email);
    const passwordError: string = validatePassword(password);

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
      <div className='min-h-screen flex items-center justify-center px-4'>
        <div className='text-center'>
          <div className='text-4xl mb-4'>✓</div>
          <h2 className='text-2xl font-bold text-navy mb-2'>Account Created</h2>
          <p className='text-steel'>Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen flex items-center justify-center px-4'>
      <div className='w-full max-w-md'>
        <h1 className='text-3xl font-bold text-navy text-center mb-8'>Create Your Account</h1>

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
                placeholder='At least 8 characters'
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

          <button
            type='submit'
            disabled={loading}
            className='w-full px-7 py-3 bg-navy text-ivory text-sm font-semibold rounded-xl hover:bg-slate hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none'
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>

          {error && <p className='text-center text-sm text-red-500'>{error}</p>}

          <p className='text-center text-sm text-steel'>
            Already have an account?{' '}
            <a href='/login' className='text-navy font-medium hover:underline'>
              Log in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
