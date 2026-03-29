/**
 * Signup Page Component
 * 
 * Client-side form for user registration.
 * Handles email/password signup with validation and error handling.
 * 
 * Component Type: Client Component
 * - Uses 'use client' directive
 * - Requires client-side because it uses:
 *   - useState hooks for form state
 *   - Event handlers (onChange, onSubmit)
 *   - Browser APIs (fetch, window.location)
 * 
 * Flow:
 * 1. User enters email and password
 * 2. Client-side validation runs on submit
 * 3. If valid, sends POST request to /api/auth/signup
 * 4. On success, shows success message and redirects to /login
 * 5. On error, displays error message
 * 
 * Features:
 * - Real-time form validation
 * - Password show/hide toggle
 * - Loading states
 * - Error handling
 * - Success state with redirect
 */
'use client';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Button from '../components/Button';

/**
 * Email Validation Function
 * 
 * Validates email format on the client side.
 * Provides instant feedback before API call.
 * 
 * Rules:
 * - Email is required (not empty)
 * - Must contain @ symbol
 * - Must contain . (dot)
 * 
 * Note: This is basic validation. Server-side validation in API route
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
 * Provides instant feedback before API call.
 * 
 * Rules:
 * - Password is required (not empty)
 * - Must be at least 8 characters long
 * 
 * Note: This is basic validation. Server-side validation in API route
 * is the source of truth for security.
 * 
 * @param password - Password string to validate
 * @returns Error message string if invalid, empty string if valid
 */
function validatePassword(password: string): string {
  if (!password) return 'Password is required';
  if (password.length < 8) return 'Password must be at least 8 characters';
  return '';
}

/**
 * SignupForm Component
 * 
 * Main signup form component with state management and form handling.
 * 
 * State:
 * - email, password: Form input values (controlled components)
 * - loading: Loading state during API call
 * - error: Server error message
 * - success: Success state (shows success message)
 * - showPassword: Toggle for password visibility
 * - fieldErrors: Client-side validation errors per field
 */
function SignupForm() {
  // Form input state (controlled components)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Validation errors (per field)
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});

  /**
   * Form Submit Handler
   * 
   * Handles form submission with validation and API call.
   * 
   * Flow:
   * 1. Prevent default form submission
   * 2. Run client-side validation
   * 3. If validation fails, show errors and return
   * 4. If valid, call signup API endpoint
   * 5. On success: show success message, redirect to login
   * 6. On error: display error message
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

    try {
      // Call signup API endpoint
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Success: show success message and redirect
        setSuccess(true);
        setTimeout(() => {
          window.location.href = '/login';
        }, 1500);
      } else {
        // Server error: display error message
        const data = await response.json();
        setError(data.error || 'Signup failed');
      }
    } catch {
      // Network error or other exception
      setError('Something went wrong');
    } finally {
      // Always stop loading state
      setLoading(false);
    }
  }

  /**
   * Success State View
   * 
   * Shows success message after account creation.
   * Automatically redirects to login page after 1.5 seconds.
   */
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

  /**
   * Main Form View
   * 
   * Renders the signup form with email and password fields.
   */
  return (
    <div className='min-h-screen flex items-center justify-center px-4'>
      <div className='w-full max-w-md'>
        <h1 className='text-3xl font-bold text-navy text-center mb-8'>Create Your Account</h1>

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
                placeholder='At least 8 characters'
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
            {loading ? 'Creating Account...' : 'Sign Up'}
          </Button>

          {/* Server Error Message */}
          {error && <p className='text-center text-sm text-red-500'>{error}</p>}

          {/* Link to Login Page */}
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
