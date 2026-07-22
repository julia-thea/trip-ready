/**
 * Root Layout Component
 * 
 * This is the root layout for the entire Next.js application.
 * It wraps all pages and is required in the App Router.
 * 
 * What It Does:
 * - Defines the HTML structure (<html>, <body>)
 * - Sets up global styles and fonts
 * - Wraps all pages with providers (SessionProvider, etc.)
 * - Exports metadata for SEO (title, description)
 * 
 * Component Type: Server Component (default)
 * - No 'use client' directive = Server Component
 * - Renders on server, can't use client-side hooks directly
 * - Can use Client Components as children (like Providers)
 * 
 * File Location: app/layout.tsx
 * - Must be in app directory
 * - Only one root layout per app
 * - All pages automatically use this layout
 */
import type { Metadata } from 'next';
import { Sora } from 'next/font/google';
import './globals.css';
import Providers from './providers';

/**
 * Font Loading: Sora (Google Fonts)
 * 
 * Next.js font optimization automatically:
 * - Downloads font at build time (not runtime)
 * - Self-hosts fonts (better performance, privacy)
 * - Optimizes font loading (reduces layout shift)
 * - Generates CSS variables for font family
 * 
 * Configuration:
 * - variable: CSS variable name (--font-sora)
 * - subsets: Which character sets to include (latin = English characters)
 * 
 * Usage:
 * - Font is available via CSS variable: var(--font-sora)
 * - Applied to body via className
 * - Can be used in Tailwind config or CSS
 */
const sora = Sora({
  variable: '--font-sora',
  subsets: ['latin'],
});

/**
 * Metadata Export
 * 
 * Defines metadata for the entire application.
 * Used for SEO, social sharing, and browser tabs.
 * 
 * Properties:
 * - title: Appears in browser tab, search results
 * - description: Used in search results, social media previews
 * 
 * Note: Can be overridden in individual pages using metadata export
 * 
 * Resources:
 * - https://nextjs.org/docs/app/building-your-application/optimizing/metadata
 */
export const metadata: Metadata = {
  title: 'Trip Ready',
  description: 'Never forget a charger again. Smart packing lists for every trip.',
};

/**
 * RootLayout Component
 * 
 * The root layout that wraps all pages in the application.
 * 
 * Structure:
 * - <html>: Root HTML element with lang attribute
 * - <body>: Body element with font and providers
 * - Providers: Client Component wrapper (SessionProvider, etc.)
 * - children: All page content (automatically passed by Next.js)
 * 
 * @param children - All page content (automatically injected by Next.js)
 * @returns Root HTML structure with providers and children
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      {/* 
        Body element with:
        - Font variable: Makes Sora font available via CSS variable
        - antialiased: Tailwind class for smooth font rendering
        - Providers: Wraps app with client-side providers (SessionProvider)
      */}
      <body
        className={`${sora.variable} antialiased`}
        style={{ fontFamily: 'var(--font-sora), system-ui, sans-serif' }}
      >
        {/* 
          Providers Component:
          - Client Component wrapper for SessionProvider
          - Makes session available to all Client Components via useSession()
          - Required because layout.tsx is Server Component, but SessionProvider needs client
        */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
