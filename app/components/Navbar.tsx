'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Luggage } from 'lucide-react'
import Button from './Button'

export default function Navbar() {
  const { data: session, status } = useSession()

  return (
    <header className="mx-auto px-8 py-6 flex justify-between items-center">
      <Link href="/" className="flex items-center gap-2 text-xl font-semibold text-navy">
        <Luggage className="w-6 h-6" />
        Trip Ready
      </Link>
      <div className="flex gap-3 items-center">
        {status === 'loading' && (
          <span className="text-sm text-steel">Loading...</span>
        )}
        {status === 'authenticated' && (
          <>
            <span className="text-sm text-steel">{session.user?.email}</span>
            <Button variant="outline" onClick={() => signOut({ callbackUrl: '/' })}>
              Log Out
            </Button>
          </>
        )}
        {status === 'unauthenticated' && (
          <>
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/signup">
              <Button variant="primary">Sign Up</Button>
            </Link>
          </>
        )}
      </div>
    </header>
  )
}
