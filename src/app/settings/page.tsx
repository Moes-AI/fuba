'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

export default function Settings() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status === 'unauthenticated') {
    redirect('/')
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Profile</h2>
          <p>Email: {session?.user?.email}</p>
        </div>
      </div>
    </div>
  )
}
