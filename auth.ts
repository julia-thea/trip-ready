/**
 * Auth.js Configuration (Node.js Runtime)
 * 
 * This is the main Auth.js configuration file that runs in the Node.js runtime.
 * It handles authentication logic including password verification, session management,
 * and database operations.
 * 
 * Why Separate from auth.config.ts?
 * - This file uses Prisma and bcrypt which CANNOT run in Edge Runtime
 * - auth.config.ts is edge-compatible and used by middleware.ts
 * - This file is used by API routes, Server Components, and Server Actions
 * 
 * Exports:
 * - handlers: GET/POST handlers for /api/auth/* routes
 * - signIn: Function to sign in a user programmatically
 * - signOut: Function to sign out a user
 * - auth: Function to get current session (used in Server Components/Actions)
 * 
 * Authentication Flow:
 * 1. User submits email/password via login form
 * 2. Credentials provider calls authorize() function
 * 3. authorize() verifies email/password against database
 * 4. If valid, creates JWT session token
 * 5. Session is stored in JWT (not database) due to JWT strategy
 */
import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import authConfig from "./auth.config"

export const { handlers, signIn, signOut, auth } = NextAuth({
  // Spread auth.config.ts to get base configuration (callbacks, pages, etc.)
  ...authConfig,
  
  /**
   * Prisma Adapter
   * 
   * Connects Auth.js to Prisma for database operations.
   * Handles creating/updating User, Account, Session records.
   * 
   * Note: Even though we use JWT strategy (sessions in tokens, not DB),
   * the adapter is still needed for OAuth providers and user management.
   */
  adapter: PrismaAdapter(prisma),
  
  /**
   * Session Strategy: JWT
   * 
   * Required for Credentials provider (email/password auth).
   * Sessions are stored in JWT tokens, not in database.
   * 
   * Benefits:
   * - No database queries to check session validity
   * - Works with stateless authentication
   * - Faster session checks
   * 
   * Trade-offs:
   * - Can't revoke sessions from database (must wait for token expiry)
   * - Token size limits what can be stored in session
   */
  session: { strategy: "jwt" },
  
  /**
   * Authentication Providers
   * 
   * Defines how users can authenticate. Currently only Credentials (email/password).
   * Can add OAuth providers (Google, GitHub, etc.) here if needed.
   */
  providers: [
    /**
     * Credentials Provider: Email/Password Authentication
     * 
     * Allows users to sign in with email and password.
     * This is custom authentication (not OAuth).
     */
    Credentials({
      /**
       * Credentials Schema
       * 
       * Defines what fields the login form should provide.
       * Empty objects mean no validation here (we validate in authorize).
       */
      credentials: {
        email: {},
        password: {}
      },
      
      /**
       * Authorize Function: Password Verification
       * 
       * This function is called when user attempts to sign in.
       * It verifies the email/password combination.
       * 
       * Flow:
       * 1. Check credentials are provided
       * 2. Find user by email in database
       * 3. Verify user exists and has a password
       * 4. Compare provided password with hashed password in database
       * 5. Return user object if valid, null if invalid
       * 
       * Security:
       * - Returns null (not error message) to prevent email enumeration
       * - Uses bcrypt.compare() for secure password verification (timing-safe)
       * - Never returns password hash to client
       * 
       * @param credentials - Object with email and password from login form
       * @returns User object with id, email, name if valid, null if invalid
       */
      authorize: async (credentials) => {
        // Validation: Check that email and password are provided
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Find user in database by email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string }
        })

        // Check user exists and has a password (OAuth users might not have passwords)
        if (!user || !user.password) {
          return null
        }

        // Verify password using bcrypt.compare()
        // This compares the plain text password with the hashed password in database
        // bcrypt.compare() is timing-safe (prevents timing attacks)
        const passwordMatch = await bcrypt.compare(
          credentials.password as string,
          user.password
        )

        // If password doesn't match, return null (don't reveal which part failed)
        if (!passwordMatch) {
          return null
        }

        // Password is valid - return user object
        // This object will be stored in the JWT token
        // Only include safe fields (never include password!)
        return {
          id: user.id,
          email: user.email,
          name: user.name
        }
      }
    })
  ],
})
