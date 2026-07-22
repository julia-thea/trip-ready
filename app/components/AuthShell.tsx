'use client';

import Navbar from './Navbar';

/**
 * Shared input styles for auth forms.
 * Error state swaps border/ring to red; default uses navy focus.
 */
export function authInputClass(hasError = false, withPasswordToggle = false): string {
  const padding = withPasswordToggle ? 'pr-12' : '';
  const border = hasError
    ? 'border-red-500 focus:ring-red-500'
    : 'border-silver focus:border-navy focus:ring-navy';

  return [
    'w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-opacity-20 transition-all',
    padding,
    border,
  ]
    .filter(Boolean)
    .join(' ');
}

/** Hit area for password visibility toggles. */
export const authPasswordToggleClass =
  'absolute right-1 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center text-steel hover:text-navy transition-colors';

type AuthShellProps = {
  children: React.ReactNode;
  /** Optional page title rendered above children inside the card */
  title?: string;
  /** Optional subcopy under the title */
  description?: string;
};

/**
 * Shared shell for login, signup, and password-reset pages.
 * Navbar + soft gradient + centered white card.
 */
export default function AuthShell({ children, title, description }: AuthShellProps) {
  return (
    <div className='min-h-screen bg-gradient-to-b from-slate-50 to-white'>
      <Navbar />
      <main className='flex items-center justify-center px-4 py-12'>
        <div className='w-full max-w-md'>
          <div className='bg-white border border-silver rounded-2xl shadow-sm p-8 sm:p-10'>
            {(title || description) && (
              <div className='text-center mb-8'>
                {title && <h1 className='text-2xl font-bold text-navy mb-2'>{title}</h1>}
                {description && (
                  <p className='text-steel text-sm leading-relaxed'>{description}</p>
                )}
              </div>
            )}
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
