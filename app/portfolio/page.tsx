import PortfolioClient from './PortfolioClient'
import { fetchTopCoins } from '@/lib/api/coingecko'

export default async function PortfolioPage() {
  const coins = await fetchTopCoins()

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">ポートフォリオ</h1>
      <PortfolioClient coins={coins} />
    </main>
  )
}
