'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';

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
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
  
  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const emailError: string = validateEmail(email);
    const passwordError: string = validatePassword(password);

    if (emailError || passwordError) {
      setFieldErrors({ email: emailError, password: passwordError });
      return;
    }

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
      window.location.href = '/';
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-navy text-center mb-8">
          Welcome Back
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate mb-2">
              Email
            </label>
            <input
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="email"
              className={`w-full px-4 py-3 rounded-xl border ${
                fieldErrors.email 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-silver focus:border-navy focus:ring-navy'
              } focus:outline-none focus:ring-2 focus:ring-opacity-20 transition-all`}
              placeholder="you@example.com"
            />
            {fieldErrors.email && (
              <p className="mt-2 text-sm text-red-500">{fieldErrors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate mb-2">
              Password
            </label>
            <input
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
              className={`w-full px-4 py-3 rounded-xl border ${
                fieldErrors.password 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-silver focus:border-navy focus:ring-navy'
              } focus:outline-none focus:ring-2 focus:ring-opacity-20 transition-all`}
              placeholder="Your password"
            />
            {fieldErrors.password && (
              <p className="mt-2 text-sm text-red-500">{fieldErrors.password}</p>
            )}
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full px-7 py-3 bg-navy text-ivory text-sm font-semibold rounded-xl hover:bg-slate hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>

          {error && (
            <p className="text-center text-sm text-red-500">{error}</p>
          )}

          <p className="text-center text-sm text-steel">
            Don&apos;t have an account?{' '}
            <a href="/signup" className="text-navy font-medium hover:underline">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}

export default LoginForm;