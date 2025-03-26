'use client'

import { auth } from '@/lib/firebase'
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth'
import { useEffect, useState } from 'react'

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
    return () => unsubscribe()
  }, [])

  const login = async () => {
    const provider = new GoogleAuthProvider()
    await signInWithPopup(auth, provider)
  }

  const logout = async () => {
    await signOut(auth)
  }

  return (
    <div className="p-4 text-sm">
      {user ? (
        <div className="flex items-center gap-2">
          <p>こんにちは、{user.displayName}</p>
          <button onClick={logout} className="text-red-500 underline">
            ログアウト
          </button>
        </div>
      ) : (
        <button onClick={login} className="text-blue-500 underline">
          Googleでログイン
        </button>
      )}
    </div>
  )
}
