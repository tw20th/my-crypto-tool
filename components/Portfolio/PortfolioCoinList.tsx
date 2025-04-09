'use client'

import { useEffect } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { Coin } from '@/types/coin'
import { PortfolioItem } from '@/lib/portfolio'
import Card from '@/components/ui/Card'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

type Props = {
  coins: Coin[]
  portfolio: PortfolioItem[]
  onAmountChange: (coinId: string, rawValue: string) => void
}

function AnimatedNumber({ value }: { value: number }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) =>
    Math.floor(latest).toLocaleString()
  )

  useEffect(() => {
    const controls = animate(count, value, { duration: 0.6 })
    return controls.stop
  }, [value, count])

  return <motion.span>{rounded}</motion.span>
}

export default function PortfolioCoinList({
  coins,
  portfolio,
  onAmountChange,
}: Props) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {coins.map((coin) => {
          const item = portfolio.find((p) => p.coinId === coin.id)
          const amount = item?.amount ?? 0
          const value = coin.current_price * amount
          const isEmpty = item === undefined

          return (
            <Card key={coin.id}>
              <h2 className="font-bold text-lg mb-1">
                {coin.name}{' '}
                <span className="text-gray-500 dark:text-gray-400">
                  ({coin.symbol.toUpperCase()})
                </span>
              </h2>

              <p
                className="text-sm text-gray-600 mb-1"
                data-tooltip-id="global-tooltip"
                data-tooltip-content="この瞬間の仮想通貨の市場価格です"
              >
                現在価格: $<AnimatedNumber value={coin.current_price} />
              </p>

              <label
                className="block mb-2 text-sm text-gray-700"
                data-tooltip-id="global-tooltip"
                data-tooltip-content="あなたが持っているこのコインの数量です"
              >
                保有数:
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => onAmountChange(coin.id, e.target.value)}
                  className="mt-1 border rounded px-2 py-1 w-full"
                />
              </label>

              <p
                className="text-base font-semibold text-blue-700"
                data-tooltip-id="global-tooltip"
                data-tooltip-content="現在価格 × 保有数で算出される価値です"
              >
                評価額: $<AnimatedNumber value={value} />
              </p>

              {coin.price_change_percentage_24h !== undefined && (
                <p
                  className={`text-sm mt-1 ${
                    coin.price_change_percentage_24h >= 0
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {coin.price_change_percentage_24h >= 0 ? '▲' : '▼'}{' '}
                  {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                </p>
              )}

              {isEmpty && (
                <p className="text-xs text-gray-500 mt-1">
                  ※ 未追加の状態です（追加すると保存されます）
                </p>
              )}
            </Card>
          )
        })}

        {/* ✅ Tooltip を map の外に1回だけ配置！ */}
        <Tooltip
          id="global-tooltip"
          place="top"
          style={{
            backgroundColor: '#333',
            color: '#fff',
            borderRadius: '6px',
            fontSize: '12px',
            padding: '6px 10px',
            maxWidth: '220px',
            whiteSpace: 'pre-wrap',
          }}
        />
      </div>
    </div>
  )
}
