// app/login/page.tsx
'use client'

import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { app } from '@/lib/firebase'

export default function LoginPage() {
  const router = useRouter()

  const handleLogin = async () => {
    const auth = getAuth(app)
    const provider = new GoogleAuthProvider()

    try {
      await signInWithPopup(auth, provider)
      console.log('✅ ログイン成功')
      router.push('/portfolio') // ログイン後にポートフォリオページへ遷移
    } catch (error) {
      console.error('❌ ログインエラー:', error)
    }
  }

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">ログイン</h1>
      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Googleでログイン
      </button>
    </div>
  )
}
