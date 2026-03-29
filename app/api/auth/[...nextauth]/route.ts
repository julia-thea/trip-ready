/**
 * Next.js API Route: Auth.js handlers
 * 
 * This catch-all route ([...nextauth]) exposes Auth.js handlers to Next.js API routes.
 * It handles all authentication-related requests like:
 * - GET: Sign in pages, session checks, provider callbacks
 * - POST: Sign in/out requests, CSRF token validation
 * 
 * The catch-all pattern allows Auth.js to handle multiple endpoints:
 * /api/auth/signin, /api/auth/signout, /api/auth/callback/[provider], etc.
 */
import { handlers } from '@/auth';

export const { GET, POST } = handlers;
