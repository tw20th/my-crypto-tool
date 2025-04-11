'use client'

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence, // ✅ 追加
} from 'firebase/auth'
import { app } from '@/lib/firebase'
import { useRouter } from 'next/navigation'
import PortfolioDemo from '@/components/Portfolio/PortfolioDemo'
import PortfolioAlertDemo from '@/components/Portfolio/PortfolioAlertDemo'
import Button from '@/components/ui/Button'

export default function Home() {
  const router = useRouter()

  const handleLogin = async () => {
    const auth = getAuth(app)
    const provider = new GoogleAuthProvider()

    try {
      await setPersistence(auth, browserLocalPersistence) // ✅ 先に設定！
      await signInWithPopup(auth, provider)
      router.push('/portfolio')
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
        <Button onClick={handleLogin}>Googleでログイン</Button>
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
