'use client'

import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { app } from '@/lib/firebase'
import { useRouter } from 'next/navigation'
import PortfolioDemo from '@/components/Portfolio/PortfolioDemo'
import PortfolioAlertDemo from '@/components/Portfolio/PortfolioAlertDemo'

export default function Home() {
  const router = useRouter()

  const handleLogin = async () => {
    const auth = getAuth(app)
    const provider = new GoogleAuthProvider()

    try {
      await signInWithPopup(auth, provider)
      router.push('/portfolio') // ログイン後に遷移
    } catch (error) {
      console.error('❌ ログイン失敗:', error)
    }
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8 space-y-10">
      <h1 className="text-2xl font-bold text-center">
        仮想通貨をスマートに管理
      </h1>
      <p className="text-center text-gray-500">
        ポートフォリオとアラートをひとつに。
      </p>

      <div className="text-center">
        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Googleでログイン
        </button>
      </div>

      <section>
        <h2 className="text-xl font-semibold mb-2">かんたん体験してみる</h2>
        <PortfolioDemo />
      </section>

      <section>
        <PortfolioAlertDemo />
      </section>
    </main>
  )
}
