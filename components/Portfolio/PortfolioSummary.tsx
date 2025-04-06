'use client'

import PortfolioHistoryChart from './PortfolioHistoryChart'
import { PortfolioHistory } from '@/types/portfolio'
import Card from '@/components/ui/Card'

type Props = {
  totalValue: number
  historyData: PortfolioHistory[]
}

export default function PortfolioSummary({ totalValue, historyData }: Props) {
  const yesterdayValue =
    historyData.length >= 2 ? historyData[historyData.length - 2].totalValue : 0

  const diff = totalValue - yesterdayValue
  const diffPercent = yesterdayValue !== 0 ? (diff / yesterdayValue) * 100 : 0

  const isPositive = diff >= 0

  return (
    <Card variant="outlined" padding="lg">
      <h2 className="text-lg font-semibold mb-2">💰 合計評価額</h2>

      <div className="mb-4">
        <p className="text-3xl font-bold text-green-600 dark:text-green-400">
          ¥{totalValue.toLocaleString()}
        </p>

        <p
          className={`text-sm ${
            isPositive ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {isPositive ? '▲' : '▼'} ¥{Math.abs(diff).toLocaleString()}（
          {Math.abs(diffPercent).toFixed(2)}%）
        </p>
      </div>

      {/* 👇 グラフを下に移動するために分ける */}
      <PortfolioHistoryChart data={historyData} />
    </Card>
  )
}
