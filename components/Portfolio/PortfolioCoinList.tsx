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
      {/* カード表示 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {coins.map((coin) => {
          const item = portfolio.find((p) => p.coinId === coin.id)
          const amount = item?.amount ?? 0
          const value = coin.current_price * amount
          const isEmpty = item === undefined

          return (
            <div
              key={coin.id}
              className={`p-4 rounded-2xl border transition ${
                isEmpty
                  ? 'bg-gray-50 opacity-60'
                  : 'bg-white shadow hover:shadow-md'
              }`}
            >
              <h2 className="font-bold text-lg mb-1">
                {coin.name}{' '}
                <span className="text-gray-500">
                  ({coin.symbol.toUpperCase()})
                </span>
              </h2>
              <p className="text-sm text-gray-600 mb-1">
                現在価格:{' '}
                <span className="font-medium">
                  ${coin.current_price.toLocaleString()}
                </span>
              </p>

              <label className="block mb-2 text-sm text-gray-700">
                保有数:
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => onAmountChange(coin.id, e.target.value)}
                  className="mt-1 border rounded px-2 py-1 w-full"
                />
              </label>

              <p className="text-base font-semibold text-blue-700">
                評価額: $
                {value.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
              </p>

              {isEmpty && (
                <p className="text-xs text-gray-500 mt-1">
                  ※ 未追加の状態です（追加すると保存されます）
                </p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
