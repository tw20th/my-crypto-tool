'use client'

import { useState } from 'react'
import PortfolioCoinList from './PortfolioCoinList'
import PortfolioPieChart from './PortfolioPieChart'

// デモ用コインデータ（任意で追加OK）
const demoCoins = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'btc',
    current_price: 60000,
    image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
    market_cap: 1000000000,
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'eth',
    current_price: 3000,
    image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
    market_cap: 500000000,
  },
  {
    id: 'xrp',
    name: 'XRP',
    symbol: 'xrp',
    current_price: 0.5,
    image:
      'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png',
    market_cap: 20000000,
  },
]

export default function PortfolioDemo() {
  // amount を useState で管理（保存されない）
  const [portfolio, setPortfolio] = useState([
    { coinId: 'bitcoin', amount: 0 },
    { coinId: 'ethereum', amount: 0 },
    { coinId: 'xrp', amount: 0 },
  ])

  const handleAmountChange = (coinId: string, rawValue: string) => {
    const amount = parseFloat(rawValue)
    setPortfolio((prev) =>
      prev.map((item) => (item.coinId === coinId ? { ...item, amount } : item))
    )
  }

  return (
    <div className="space-y-6">
      <PortfolioCoinList
        coins={demoCoins}
        portfolio={portfolio}
        onAmountChange={handleAmountChange}
      />
      <PortfolioPieChart coins={demoCoins} portfolio={portfolio} />

      <p className="text-center text-sm text-gray-500">
        ※ 体験版のため、保存はされません。
      </p>
    </div>
  )
}
