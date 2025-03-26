'use client'

import { Coin } from '@/types/coin'
import { PortfolioItem } from '@/lib/portfolio'

type Props = {
  coins: Coin[]
  portfolio: PortfolioItem[]
  onAmountChange: (coinId: string, rawValue: string) => void
}

export default function PortfolioCoinList({
  coins,
  portfolio,
  onAmountChange,
}: Props) {
  return (
    <div className="space-y-4">
      {coins.map((coin) => {
        const item = portfolio.find((p) => p.coinId === coin.id)
        const amount = item?.amount ?? 0
        const value = coin.current_price * amount

        return (
          <div
            key={coin.id}
            className="p-4 border rounded-xl shadow-sm space-y-1"
          >
            <h2 className="font-bold text-lg">
              {coin.name} ({coin.symbol.toUpperCase()})
            </h2>
            <p>現在の価格: ${coin.current_price.toLocaleString()}</p>
            <label className="block">
              保有数:{' '}
              <input
                type="number"
                value={amount}
                onChange={(e) => onAmountChange(coin.id, e.target.value)}
                className="border rounded px-2 py-1 w-32"
              />
            </label>
            <p>
              評価額: $
              {value.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
        )
      })}
    </div>
  )
}
