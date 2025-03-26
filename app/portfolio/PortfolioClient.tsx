// app/portfolio/PortfolioClient.tsx
'use client'

import { Coin } from '@/types/coin'
import { usePortfolio } from '@/hooks/usePortfolio'
import PortfolioChartFilter from '@/components/Portfolio/PortfolioChartFilter'
import PortfolioPieChart from '@/components/Portfolio/PortfolioPieChart'
import PortfolioHistoryChart from '@/components/Portfolio/PortfolioHistoryChart'
import PortfolioPasteForm from '@/components/Portfolio/PortfolioPasteForm'
import PortfolioCoinList from '@/components/Portfolio/PortfolioCoinList'

export type FilterType = 'all' | '30days' | '7days'

type Props = {
  coins: Coin[]
}

export default function PortfolioClient({ coins }: Props) {
  const {
    portfolio,
    totalValue,
    historyData,
    filter,
    setFilter,
    handleAmountChange,
    handlePasteSubmit,
  } = usePortfolio(coins)

  return (
    <div className="space-y-6">
      <PortfolioChartFilter filter={filter} setFilter={setFilter} />

      <div className="text-xl font-bold text-green-600">
        💰 合計評価額: $
        {totalValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
        <PortfolioHistoryChart data={historyData} />
      </div>

      <PortfolioPieChart coins={coins} portfolio={portfolio} />

      <PortfolioPasteForm onSubmit={handlePasteSubmit} />

      <PortfolioCoinList
        coins={coins}
        portfolio={portfolio}
        onAmountChange={handleAmountChange}
      />
    </div>
  )
}
