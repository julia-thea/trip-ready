import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"

/**
 * Edge-safe auth config. No Prisma, no bcrypt — those are Node.js only.
 * The authorize function here is a no-op; the real one lives in auth.ts.
 * Middleware only needs providers declared to verify the JWT, not to run authorize.
 */
export default {
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      // Middleware never calls authorize — it only checks the JWT token.
      // The real authorize with Prisma + bcrypt is in auth.ts.
      authorize: () => null,
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    },
    authorized({ auth }) {
      return !!auth?.user
    },
  },
  pages: {
    signIn: "/login",
  },
} satisfies NextAuthConfig

