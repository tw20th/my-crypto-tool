// app/portfolio/page.tsx

import { fetchTopCoins } from '@/lib/api/coingecko'
import PortfolioPageWrapper from '@/components/Portfolio/PortfolioPageWrapper' // ✅ 差し替え！

export default async function PortfolioPage() {
  const coins = await fetchTopCoins()

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">ポートフォリオ</h1>
      <PortfolioPageWrapper coins={coins} /> {/* ✅ ラップして使う */}
    </main>
  )
}
