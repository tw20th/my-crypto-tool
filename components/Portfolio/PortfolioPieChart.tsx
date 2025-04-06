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
import Card from '@/components/ui/Card'

const COLORS = [
  '#4ade80',
  '#60a5fa',
  '#facc15',
  '#f87171',
  '#a78bfa',
  '#34d399',
  '#fb923c',
  '#f472b6',
  '#38bdf8',
  '#c084fc',
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

  const total = data.reduce((acc, item) => acc + (item?.value || 0), 0)

  if (data.length === 0)
    return (
      <Card>
        <p className="text-gray-500 dark:text-gray-400">
          表示できるデータがありません
        </p>
      </Card>
    )

  return (
    <Card variant="outlined" padding="lg">
      <h2 className="text-lg font-semibold mb-4">📊 資産の内訳</h2>
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
    </Card>
  )
}
