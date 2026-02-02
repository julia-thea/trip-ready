import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "./app/generated/prisma"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

// The flow:
// User fills login form with email and password
// Form submits to /api/auth/signin
// Auth.js calls YOUR authorize function
// Auth.js passes the form values as credentials
// You access credentials.email and credentials.password
// You query database with that email

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {}
      },
      authorize: async (credentials) => {
        // Check credentials exist
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Find user by email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string }
        })

        // No user found
        if (!user || !user.password) {
          return null
        }

        // Compare password
        const passwordMatch = await bcrypt.compare(
          credentials.password as string,
          user.password
        )

        // Wrong password
        if (!passwordMatch) {
          return null
        }

        // Success - return user object
        return {
          id: user.id,
          email: user.email,
          name: user.name
        }
      }
    })
  ],
    callbacks: {
    session({ session, user }) {
      session.user.id = user.id
      return session
    },
  }
})

