'use client'

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

import { Coin } from '@/types/coin'
import { PortfolioItem } from '@/lib/portfolio'

const COLORS = [
  '#4ade80', // green-400
  '#60a5fa', // blue-400
  '#facc15', // yellow-400
  '#f87171', // red-400
  '#a78bfa', // purple-400
  '#34d399', // emerald-400
  '#fb923c', // orange-400
  '#f472b6', // pink-400
  '#38bdf8', // sky-400
  '#c084fc', // violet-400
]

type Props = {
  coins: Coin[]
  portfolio: PortfolioItem[]
}

export default function PortfolioPieChart({ coins, portfolio = [] }: Props) {
  const data = portfolio
    .map((item) => {
      const coin = coins.find((c) => c.id === item.coinId)
      if (!coin) return null
      return {
        name: coin.name,
        value: coin.current_price * item.amount,
      }
    })
    .filter(Boolean)

  const total = data.reduce((acc, item) => {
    if (!item) return acc
    return acc + item.value
  }, 0)

  if (data.length === 0)
    return <p className="text-gray-500">表示できるデータがありません</p>

  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold mb-2">📊 資産の内訳</h2>
      <div className="w-full h-80">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              dataKey="value"
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ name, value }) =>
                `${name} (${((value / total) * 100).toFixed(1)}%)`
              }
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) =>
                `$${value.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}`
              }
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
