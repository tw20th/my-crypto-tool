// lib/auth.ts
import { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged, User } from 'firebase/auth'
import { app } from './firebase'

const auth = getAuth(app)

export function useUser() {
  const [user, setUser] = useState<User | null | undefined>(undefined)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      console.log('🧩 Firebase onAuthStateChanged:', u) // ここがポイント！

      setUser(u)
    })
    return () => unsubscribe()
  }, [])

  return { user }
}
