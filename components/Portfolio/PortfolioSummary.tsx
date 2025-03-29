'use client'

import PortfolioHistoryChart from './PortfolioHistoryChart'
import { PortfolioHistory } from '@/types/portfolio'

type Props = {
  totalValue: number
  historyData: PortfolioHistory[] // ✅ any[] → 明確な型へ
}

export default function PortfolioSummary({ totalValue, historyData }: Props) {
  return (
    <div className="text-xl font-bold text-green-600">
      💰 合計評価額: $
      {totalValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
      <PortfolioHistoryChart data={historyData} />
    </div>
  )
}
