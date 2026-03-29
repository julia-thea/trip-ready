/**
 * Dashboard Page Component
 * 
 * Protected page that displays user's dashboard after login.
 * Shows welcome message and navigation links to main features.
 * 
 * Component Type: Server Component
 * - No 'use client' directive = Server Component
 * - Uses auth() function to check session server-side
 * - Renders on server, sent as HTML to client
 * - Protected by middleware.ts (additional layer of protection)
 * 
 * Authentication:
 * - Uses auth() from @/auth to get current session
 * - If no session, redirects to /login page
 * - Session contains user info (id, email, name)
 * 
 * Route Protection:
 * - Protected by middleware.ts (runs before page loads)
 * - Additional check here for server-side safety
 * - Double protection ensures unauthorized access is prevented
 */
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Navbar from '../components/Navbar';

/**
 * Dashboard Component
 * 
 * Displays user dashboard with welcome message and navigation cards.
 * 
 * @returns JSX for the dashboard page, or redirects to login if not authenticated
 */
export default async function Dashboard() {
  /**
   * Get Current Session
   * 
   * auth() function from @/auth:
   * - Reads JWT token from cookies
   * - Validates token signature
   * - Returns session object with user info if valid
   * - Returns null if no session or invalid token
   * 
   * Session Object Structure:
   * {
   *   user: {
   *     id: string,
   *     email: string,
   *     name: string | null,
   *     image: string | null
   *   }
   * }
   */
  const session = await auth();

  /**
   * Authentication Check
   * 
   * If no session exists, redirect to login page.
   * This is a server-side check (happens before page renders).
   * 
   * Note: middleware.ts also protects this route, but this check
   * provides an additional safety layer in case middleware is bypassed.
   */
  if (!session) {
    redirect('/login');
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-slate-50 to-white'>
      {/* Global Navigation */}
      <Navbar />

      <main className='max-w-4xl mx-auto px-8 pt-12'>
        {/* Welcome Message */}
        {/* 
          Displays personalized welcome message:
          - Shows user's name if available
          - Falls back to generic "Welcome back" if name is null
          - Uses optional chaining (?.) for safe access
        */}
        <h1 className='text-3xl font-bold text-navy mb-2'>
          Welcome back{session.user?.name ? `, ${session.user.name}` : ''}
        </h1>

        {/* User Email */}
        <p className='text-steel mb-8'>{session.user?.email}</p>

        {/* Navigation Cards Grid */}
        {/* 
          Responsive grid: 1 column on mobile, 2 columns on md+ screens
          Currently has one card (My Lists), but grid allows easy addition of more
        */}
        <div className='grid md:grid-cols-2 gap-6'>
          {/* My Lists Card */}
          {/* 
            Navigation card linking to lists page
            Styled as clickable card with hover effects
          */}
          <a
            href='/lists'
            className='p-6 bg-white rounded-xl border border-silver hover:border-navy/30 hover:shadow-md transition-all'
          >
            <h2 className='text-lg font-semibold text-navy mb-2'>My Lists</h2>
            <p className='text-steel text-sm'>View and manage your packing lists</p>
          </a>
        </div>
      </main>
    </div>
  );
}
