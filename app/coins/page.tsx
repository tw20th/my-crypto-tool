import { fetchTopCoins } from '@/lib/api/coingecko'
import CoinsClient from './CoinsClient'

export default async function CoinsPage() {
  const coins = await fetchTopCoins()

  return <CoinsClient coins={coins} />
}
