import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "./app/generated/prisma"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {}
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string }
        })

        if (!user || !user.password) {
          return null
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password as string,
          user.password
        )

        if (!passwordMatch) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name
        }
      }
    })
  ],
  callbacks: {
    jwt({ token, user }) {
      // On initial sign-in, user object is available
      if (user) {
        token.id = user.id
      }
      return token
    },
    session({ session, token }) {
      // Pass user id from token to session
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    }
  },
  pages: {
    signIn: "/login",
  }
})
