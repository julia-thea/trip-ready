/**
 * Home Page (Landing Page)
 * 
 * This is the root page of the application (app/page.tsx).
 * It serves as the landing page that users see when they visit the site.
 * 
 * Component Type: Server Component (default in Next.js App Router)
 * - No 'use client' directive = Server Component
 * - Renders on server, sent as HTML to client
 * - Can use Server Components and Client Components as children
 * 
 * Page Structure:
 * 1. Navbar - Global navigation (Client Component)
 * 2. Hero Section - Main headline and CTA button
 * 3. Features Section - Three feature cards highlighting app benefits
 * 
 * Styling:
 * - Uses Tailwind CSS utility classes
 * - Custom colors from tailwind.config.ts (navy, slate, etc.)
 * - Responsive design with md: breakpoint
 * - Gradient background for visual appeal
 */
import Link from 'next/link';
import Button from './components/Button';
import Navbar from './components/Navbar';

/**
 * HomePage Component
 * 
 * Renders the landing page with hero section and features.
 * 
 * @returns JSX for the home page
 */
export default function HomePage() {
  return (
    <main className='min-h-screen bg-gradient-to-b from-slate-50 to-white'>
      {/* Global Navigation Bar */}
      {/* Navbar is a Client Component (uses useSession hook) */}
      <Navbar />

      {/* Hero Section: Main Value Proposition */}
      {/* 
        Purpose: First thing users see - communicates app's value
        Layout: Centered, large heading, descriptive text, CTA button
        Styling: Large text (text-7xl), navy color, gradient background
      */}
      <section className='mx-auto px-8 pt-24 pb-20 text-center'>
        {/* Main Headline */}
        <h1 className='text-7xl font-bold text-navy leading-tight mb-8'>
          Smart Packing Lists for Every Trip
        </h1>

        {/* Value Proposition Text */}
        <p className='text-xl text-slate/80 leading-relaxed mb-12 max-w-2xl mx-auto'>
          Never forget an item again. Create customized packing lists in seconds and travel with
          confidence.
        </p>

        {/* Call-to-Action Button */}
        {/* Links to create-list page to start user journey */}
        <Link href='/create-list'>
          <Button variant='primary'>Create Your List</Button>
        </Link>
      </section>

      {/* Features Section: Key Benefits */}
      {/* 
        Purpose: Highlights main features/benefits of the app
        Layout: 3-column grid on medium+ screens, stacked on mobile
        Content: Icon, title, description for each feature
      */}
      <section className='max-w-6xl mx-auto px-8 pt-10'>
        {/* Responsive Grid: 1 column on mobile, 3 columns on md+ screens */}
        <div className='grid md:grid-cols-3 gap-12'>
          {/* Feature 1: AI-Powered Suggestions */}
          <div className='text-center'>
            <div className='text-4xl mb-4'>🤖</div>
            <h3 className='text-lg font-semibold text-navy mb-3'>AI-Powered Suggestions</h3>
            <p className='text-slate/70 leading-relaxed'>
              Smart recommendations based on your destination and trip type.
            </p>
          </div>

          {/* Feature 2: Trip-Specific Lists */}
          <div className='text-center'>
            <div className='text-4xl mb-4'>⚙️</div>
            <h3 className='text-lg font-semibold text-navy mb-3'>Trip-Specific Lists</h3>
            <p className='text-slate/70 leading-relaxed'>
              Tailored for beach trips, business travel, or adventures.
            </p>
          </div>

          {/* Feature 3: Save and Reuse */}
          <div className='text-center'>
            <div className='text-4xl mb-4'>💾</div>
            <h3 className='text-lg font-semibold text-navy mb-3'>Save and Reuse</h3>
            <p className='text-slate/70 leading-relaxed'>
              Build once, reuse for every future trip.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
