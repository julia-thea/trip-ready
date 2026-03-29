/**
 * Client Component: Providers Wrapper
 * 
 * This component wraps the application with client-side providers.
 * It's a Client Component because SessionProvider uses React Context,
 * which only works in client components.
 * 
 * Why This File Exists:
 * - Next.js App Router uses Server Components by default
 * - layout.tsx is a Server Component (can't use client-side providers directly)
 * - SessionProvider requires React Context (client-side only)
 * - This wrapper pattern allows using client providers in server component trees
 * 
 * How It Works:
 * 1. This component is marked as 'use client' (Client Component)
 * 2. It wraps children with SessionProvider (provides session context)
 * 3. layout.tsx (Server Component) imports and uses this wrapper
 * 4. Children can now use useSession() hook in Client Components
 * 
 * Usage:
 * - Imported in app/layout.tsx: <Providers>{children}</Providers>
 * - Makes session available to all Client Components via useSession() hook
 * 
 * What SessionProvider Provides:
 * - Session context accessible via useSession() hook
 * - Automatic session refresh
 * - Session state management
 * - Sign in/out functionality in Client Components
 */
'use client';

import { SessionProvider } from 'next-auth/react';

/**
 * Providers Component
 * 
 * Wraps the application with SessionProvider to make authentication
 * session available to all Client Components.
 * 
 * @param children - React children (the rest of the app)
 * @returns SessionProvider wrapping the children
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
