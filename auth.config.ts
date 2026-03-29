/**
 * Auth.js Configuration (Edge Runtime Compatible)
 * 
 * This file contains the edge-safe configuration for Auth.js.
 * It's used by middleware.ts which runs in the Edge Runtime.
 * 
 * Why Separate from auth.ts?
 * - Edge Runtime has limitations: cannot use Node.js APIs like Prisma or bcrypt
 * - auth.ts uses Prisma and bcrypt (Node.js only) for password verification
 * - This file is edge-compatible and can run in middleware
 * 
 * What This File Does:
 * - Defines callbacks for JWT and session handling
 * - Configures custom login page route
 * - Declares providers (authorize is no-op - never called in middleware)
 * 
 * How It Works:
 * - Middleware uses this config to verify JWT tokens (not to authenticate)
 * - Actual authentication (password verification) happens in auth.ts
 * - Middleware only checks if a valid JWT exists, not how it was created
 */
import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"

export default {
  /**
   * Authentication Providers
   * 
   * Declares the Credentials provider for type checking and configuration.
   * 
   * Important: The authorize function here is a no-op (returns null).
   * - Middleware never calls authorize() - it only verifies existing JWT tokens
   * - Actual password verification happens in auth.ts (Node.js runtime)
   * - This is safe because middleware runs AFTER authentication, not during
   * 
   * Why include it at all?
   * - Auth.js requires providers to be declared for type safety
   * - Middleware needs to know which providers exist to validate tokens
   */
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      // No-op authorize function - middleware never calls this
      // Real password verification is in auth.ts (uses Prisma + bcrypt)
      authorize: () => null,
    }),
  ],
  
  /**
   * Callbacks: JWT and Session Handling
   * 
   * These callbacks run when tokens are created/refreshed and sessions are accessed.
   * They ensure user.id is available in both JWT tokens and session objects.
   */
  callbacks: {
    /**
     * JWT Callback: Token Creation/Refresh
     * 
     * Runs when:
     * - User signs in (creates new JWT)
     * - Session is accessed (refreshes JWT)
     * 
     * Purpose:
     * - Store user.id in the JWT token
     * - This allows us to access user.id in Server Components via session
     * 
     * @param token - The JWT token being created/refreshed
     * @param user - The user object (only present on initial sign-in)
     * @returns Modified token with user.id included
     */
    jwt({ token, user }) {
      // On initial sign-in, user object is available
      // Store user.id in the token for later use
      if (user) {
        token.id = user.id
      }
      return token
    },
    
    /**
     * Session Callback: Session Object Creation
     * 
     * Runs when:
     * - Session is accessed in Server Components/Actions (via auth() function)
     * - Session is accessed in Client Components (via useSession hook)
     * 
     * Purpose:
     * - Transfer user.id from JWT token to session.user object
     * - Makes user.id available in session.user.id (for type safety)
     * 
     * @param session - The session object being created
     * @param token - The JWT token (contains user.id from jwt callback)
     * @returns Modified session with user.id included
     */
    session({ session, token }) {
      // Transfer user.id from token to session.user
      // This makes it available as session.user.id in your app
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    },
    
    /**
     * Authorized Callback: Route Protection
     * 
     * Runs when:
     * - Middleware checks if user is authorized to access a route
     * 
     * Purpose:
     * - Determines if user has valid session (is authenticated)
     * - Returns true if user exists, false otherwise
     * - Used by middleware.ts to protect routes
     * 
     * @param auth - Auth object containing user session (or null)
     * @returns true if user is authenticated, false otherwise
     */
    authorized({ auth }) {
      // Return true if user exists (authenticated), false if not
      // !! converts null/undefined to false, object to true
      return !!auth?.user
    },
  },
  
  /**
   * Custom Pages
   * 
   * Overrides default Auth.js page routes with custom ones.
   * 
   * signIn: Custom login page route
   * - Default: /api/auth/signin
   * - Custom: /login (matches your app/login/page.tsx)
   * 
   * When user is redirected to login (e.g., by middleware), they go to /login
   */
  pages: {
    signIn: "/login",
  },
} satisfies NextAuthConfig

