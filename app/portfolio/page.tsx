// app/portfolio/page.tsx

import { fetchTopCoins } from '@/lib/api/coingecko'
import PortfolioClient from '@/components/Portfolio/PortfolioClient'

export default async function PortfolioPage() {
  const coins = await fetchTopCoins()

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">ポートフォリオ</h1>
      <PortfolioClient coins={coins} />
    </main>
  )
}
