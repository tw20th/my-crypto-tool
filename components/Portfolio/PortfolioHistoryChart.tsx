// components/Portfolio/PortfolioHistoryChart.tsx

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { Timestamp } from 'firebase/firestore'

const calculateMovingAverage = (
  data: { date: string; value: number }[],
  windowSize: number = 7
) => {
  return data.map((_, i) => {
    const window = data.slice(Math.max(0, i - windowSize + 1), i + 1)
    const avg = window.reduce((sum, d) => sum + d.value, 0) / window.length
    return {
      ...data[i],
      movingAvg: parseFloat(avg.toFixed(2)),
    }
  })
}

export type PortfolioHistory = {
  id: string
  createdAt: Timestamp
  totalValue: number
}

type Props = {
  data: PortfolioHistory[]
}

export default function PortfolioHistoryChart({ data }: Props) {
  const rawData = data.map((item) => ({
    date: item.createdAt.toDate().toLocaleDateString(),
    value: item.totalValue,
  }))

  const chartData = calculateMovingAverage(rawData)

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <XAxis dataKey="date" />
          <YAxis
            tickFormatter={(value) =>
              `$${value.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}`
            }
          />
          <Tooltip
            formatter={(value: number, name: string) => [
              `$${value.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}`,
              name,
            ]}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#10b981"
            name="評価額"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="movingAvg"
            stroke="#3b82f6"
            strokeDasharray="5 5"
            name="7日間平均"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
