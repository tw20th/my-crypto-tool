'use client'

import { Coin } from '@/types/coin'
import { usePortfolio } from '@/hooks/usePortfolio'
import { useAlerts } from '@/hooks/useAlerts'
import { useVisibleAlerts } from '@/hooks/useVisibleAlerts'

import PortfolioChartFilter from '@/components/Portfolio/PortfolioChartFilter'
import PortfolioPieChart from '@/components/Portfolio/PortfolioPieChart'
import PortfolioPasteForm from '@/components/Portfolio/PortfolioPasteForm'
import PortfolioCoinList from '@/components/Portfolio/PortfolioCoinList'
import AlertForm from '@/components/Portfolio/AlertForm'
import AlertList from '@/components/Portfolio/AlertList'

import PortfolioSummary from '@/components/Portfolio/PortfolioSummary'

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

  const { matchedAlerts } = useAlerts(coins)
  const { visibleAlerts, onClose, onCloseAll } = useVisibleAlerts(matchedAlerts)

  return (
    <div className="space-y-6">
      {/* ✅ アラート通知バーを先に表示 */}
      {visibleAlerts.length > 0 && (
        <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 px-4 py-2 rounded-md text-sm">
          📢 アラート発動中！{visibleAlerts.length} 件のアラートがあります
        </div>
      )}

      {/* アラートの詳細リスト */}
      <AlertList
        alerts={visibleAlerts}
        onClose={onClose}
        onCloseAll={onCloseAll}
      />

      {/* 他の要素はそのまま */}
      <PortfolioChartFilter filter={filter} setFilter={setFilter} />
      <PortfolioSummary totalValue={totalValue} historyData={historyData} />
      <PortfolioPieChart coins={coins} portfolio={portfolio} />
      <AlertForm coinOptions={coins.map((c) => c.id)} />
      <PortfolioPasteForm onSubmit={handlePasteSubmit} />
      <PortfolioCoinList
        coins={coins}
        portfolio={portfolio}
        onAmountChange={handleAmountChange}
      />
    </div>
  )
}
