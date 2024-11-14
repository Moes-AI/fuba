'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

export function LoginButton() {
  const { data: session } = useSession()

  if (session) {
    return (
      <div className="flex gap-4 items-center">
        <Link 
          href="/settings" 
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Settings
        </Link>
        <button
          onClick={() => signOut()}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Sign Out
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => signIn('github')}
      className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded"
    >
      Sign In with GitHub
    </button>
  )
}
