/**
 * TypeScript Declaration File: Auth.js Type Extensions
 * 
 * This file extends Auth.js's TypeScript types to include custom fields.
 * It tells TypeScript that Session.user and JWT tokens can have an `id` field.
 * 
 * Why This File Exists:
 * - Auth.js's default types don't include `user.id` in Session
 * - We add `user.id` in the session callback (auth.config.ts)
 * - We add `id` to JWT tokens in the jwt callback (auth.config.ts)
 * - TypeScript needs to know about these custom fields for type safety
 * 
 * How It Works:
 * - TypeScript's "module augmentation" allows extending existing types
 * - We're extending the "next-auth" and "next-auth/jwt" modules
 * - This makes `session.user.id` and `token.id` type-safe throughout the app
 * 
 * Usage:
 * - In Server Components: `const session = await auth(); session.user.id`
 * - In Client Components: `const { data: session } = useSession(); session.user.id`
 * - TypeScript will autocomplete and type-check these fields
 */
import "next-auth"

/**
 * Extend NextAuth Session Interface
 * 
 * Adds `id` field to `session.user` object.
 * This matches what we do in the session callback (auth.config.ts).
 * 
 * The `id` field is:
 * - Required (not optional) - we always set it in the callback
 * - Type: string - matches user.id from database
 * 
 * Other fields (name, email, image) are already in Auth.js types,
 * but we redeclare them here to show the complete structure.
 */
declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }
}

/**
 * Extend NextAuth JWT Interface
 * 
 * Adds `id` field to JWT token object.
 * This matches what we do in the jwt callback (auth.config.ts).
 * 
 * The `id` field is:
 * - Optional (id?: string) - only set after user signs in
 * - Stored in JWT token when user authenticates
 * - Transferred to session.user.id in session callback
 * 
 * Flow:
 * 1. User signs in → jwt callback sets token.id = user.id
 * 2. Session accessed → session callback reads token.id and sets session.user.id
 * 3. App code uses session.user.id (type-safe thanks to this declaration)
 */
declare module "next-auth/jwt" {
  interface JWT {
    id?: string
  }
}

