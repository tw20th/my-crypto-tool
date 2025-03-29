// app/page.tsx

'use client'

import PortfolioDemo from '@/components/Portfolio/PortfolioDemo'
import PortfolioAlertDemo from '@/components/Portfolio/PortfolioAlertDemo'
import { signIn } from 'next-auth/react'

export default function Home() {
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
          onClick={() => signIn('google', { callbackUrl: '/portfolio' })}
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
