/**
 * Login Page Component
 * 
 * Client-side form for user authentication.
 * Handles email/password login using Auth.js (NextAuth).
 * 
 * Component Type: Client Component
 * - Uses 'use client' directive
 * - Requires client-side because it uses:
 *   - useState hooks for form state
 *   - Event handlers (onChange, onSubmit)
 *   - signIn() from next-auth/react (client-side only)
 *   - Browser APIs (window.location)
 * 
 * Flow:
 * 1. User enters email and password
 * 2. Client-side validation runs on submit
 * 3. If valid, calls signIn() from next-auth/react
 * 4. signIn() calls the authorize function in auth.ts (password verification)
 * 5. On success, creates session and redirects to /dashboard
 * 6. On error, displays error message
 * 
 * Key Difference from Signup:
 * - Uses signIn() from next-auth/react (not fetch to API route)
 * - Auth.js handles session creation automatically
 * - No success state needed (redirects immediately on success)
 * 
 * Features:
 * - Real-time form validation
 * - Password show/hide toggle
 * - Loading states
 * - Error handling
 * - Automatic session creation on success
 */
'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Eye, EyeOff } from 'lucide-react';
import Button from '../components/Button';

/**
 * Email Validation Function
 * 
 * Validates email format on the client side.
 * Provides instant feedback before authentication attempt.
 * 
 * Rules:
 * - Email is required (not empty)
 * - Must contain @ symbol
 * - Must contain . (dot)
 * 
 * Note: This is basic validation. Server-side validation in auth.ts
 * is the source of truth for security.
 * 
 * @param email - Email string to validate
 * @returns Error message string if invalid, empty string if valid
 */
function validateEmail(email: string): string {
  if (!email) return 'Email is required';
  if (!email.includes('@') || !email.includes('.')) return 'Invalid email format';
  return '';
}

/**
 * Password Validation Function
 * 
 * Validates password on the client side.
 * Provides instant feedback before authentication attempt.
 * 
 * Rules:
 * - Password is required (not empty)
 * 
 * Note: Unlike signup, login doesn't check password length.
 * We just verify it's not empty - the server verifies the actual password.
 * 
 * @param password - Password string to validate
 * @returns Error message string if invalid, empty string if valid
 */
function validatePassword(password: string): string {
  if (!password) return 'Password is required';
  return '';
}

/**
 * LoginForm Component
 * 
 * Main login form component with state management and authentication.
 * 
 * State:
 * - email, password: Form input values (controlled components)
 * - loading: Loading state during authentication
 * - error: Authentication error message
 * - showPassword: Toggle for password visibility
 * - fieldErrors: Client-side validation errors per field
 */
function LoginForm() {
  // Form input state (controlled components)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Validation errors (per field)
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});

  /**
   * Form Submit Handler
   * 
   * Handles form submission with validation and authentication.
   * 
   * Flow:
   * 1. Prevent default form submission
   * 2. Run client-side validation
   * 3. If validation fails, show errors and return
   * 4. If valid, call signIn() from next-auth/react
   * 5. signIn() calls authorize() in auth.ts (password verification)
   * 6. On success: Auth.js creates session, redirect to dashboard
   * 7. On error: display error message
   * 
   * Key: signIn() with redirect: false
   * - Prevents automatic redirect on error
   * - Allows us to handle errors manually
   * - We manually redirect on success
   * 
   * @param event - Form submit event
   */
  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    // Run client-side validation
    const emailError: string = validateEmail(email);
    const passwordError: string = validatePassword(password);

    // If validation fails, show errors and stop
    if (emailError || passwordError) {
      setFieldErrors({ email: emailError, password: passwordError });
      return;
    }

    // Clear previous errors and start loading
    setFieldErrors({});
    setLoading(true);
    setError('');

    /**
     * signIn() from next-auth/react
     * 
     * This function:
     * 1. Calls the Credentials provider's authorize() function (auth.ts)
     * 2. authorize() verifies email/password against database
     * 3. If valid, creates JWT session token
     * 4. Returns result object with error or success
     * 
     * Parameters:
     * - 'credentials': Provider name (matches Credentials provider in auth.ts)
     * - email, password: Credentials to verify
     * - redirect: false - Don't auto-redirect, let us handle it
     */
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      // Authentication failed (invalid email/password)
      // Don't reveal which field is wrong (security best practice)
      setError('Invalid email or password');
      setLoading(false);
    } else {
      // Authentication successful
      // Auth.js has created the session automatically
      // Redirect to dashboard
      window.location.href = '/dashboard';
    }
  }

  /**
   * Main Form View
   * 
   * Renders the login form with email and password fields.
   */
  return (
    <div className='min-h-screen flex items-center justify-center px-4'>
      <div className='w-full max-w-md'>
        <h1 className='text-3xl font-bold text-navy text-center mb-8'>Welcome Back</h1>

        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* Email Input Field */}
          <div>
            <label htmlFor='email' className='block text-sm font-medium text-slate mb-2'>
              Email
            </label>
            <input
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type='email'
              // Conditional styling: red border if validation error
              className={`w-full px-4 py-3 rounded-xl border ${fieldErrors.email
                ? 'border-red-500 focus:ring-red-500'
                : 'border-silver focus:border-navy focus:ring-navy'
                } focus:outline-none focus:ring-2 focus:ring-opacity-20 transition-all`}
              placeholder='you@example.com'
            />
            {/* Display validation error if present */}
            {fieldErrors.email && <p className='mt-2 text-sm text-red-500'>{fieldErrors.email}</p>}
          </div>

          {/* Password Input Field */}
          <div>
            <label htmlFor='password' className='block text-sm font-medium text-slate mb-2'>
              Password
            </label>
            {/* Relative container for password toggle button */}
            <div className='relative'>
              <input
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                // Toggle between 'password' and 'text' type for show/hide
                type={showPassword ? 'text' : 'password'}
                // Conditional styling: red border if validation error
                className={`w-full px-4 py-3 pr-12 rounded-xl border ${fieldErrors.password
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-silver focus:border-navy focus:ring-navy'
                  } focus:outline-none focus:ring-2 focus:ring-opacity-20 transition-all`}
                placeholder='Your password'
              />
              {/* Password visibility toggle button */}
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-steel hover:text-navy transition-colors'
              >
                {showPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
              </button>
            </div>
            {/* Display validation error if present */}
            {fieldErrors.password && (
              <p className='mt-2 text-sm text-red-500'>{fieldErrors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button type='submit' disabled={loading} fullWidth>
            {loading ? 'Logging in...' : 'Log In'}
          </Button>

          {/* Authentication Error Message */}
          {error && <p className='text-center text-sm text-red-500'>{error}</p>}

          {/* Link to Signup Page */}
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
