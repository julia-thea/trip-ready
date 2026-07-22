/**
 * Next.js Middleware: Route Protection
 * 
 * This middleware runs on the Edge Runtime before requests are processed.
 * It protects specific routes by checking if the user is authenticated.
 * 
 * How It Works:
 * 1. Runs before every request that matches the matcher pattern
 * 2. Checks if user has a valid session using Auth.js
 * 3. If not authenticated, redirects to login page (configured in auth.config.ts)
 * 4. If authenticated, allows request to proceed
 * 
 * Edge Runtime Compatibility:
 * - Must use auth.config.ts (edge-compatible) instead of auth.ts
 * - auth.ts contains Prisma/bcrypt which can't run in Edge Runtime
 * - auth.config.ts has edge-safe configuration only
 * 
 * Protected Routes:
 * - /dashboard - Redirects to /lists (legacy path)
 * - /lists - Dashboard (packing lists home)
 * - /create-list - Create new list page
 * - /create-item - Create new item page (if exists)
 * 
 * Note: Routes not in matcher are publicly accessible (e.g., /, /login, /signup)
 */
import NextAuth from "next-auth"
import authConfig from "./auth.config"

/**
 * Export Auth Middleware
 * 
 * NextAuth provides a middleware function that handles authentication checks.
 * We rename it to 'middleware' to match Next.js middleware naming convention.
 * 
 * This middleware will:
 * - Check for valid session on each request
 * - Redirect to login page if not authenticated (configured in auth.config.ts)
 * - Allow request to proceed if authenticated
 */
export const { auth: middleware } = NextAuth(authConfig)

/**
 * Middleware Configuration
 * 
 * matcher: Array of route patterns to apply middleware to
 * 
 * Patterns:
 * - Exact paths: "/dashboard" matches only /dashboard
 * - Wildcards: "/api/*" would match all /api routes
 * - Multiple patterns: Array allows protecting multiple routes
 * 
 * Routes NOT in matcher are publicly accessible:
 * - / (home page)
 * - /login
 * - /signup
 * - /api/auth/* (Auth.js handles its own routes)
 * 
 * Performance: Middleware only runs for matched routes, keeping it efficient
 */
export const config = {
  matcher: ["/dashboard", "/lists", "/create-list", "/create-item"],
}
