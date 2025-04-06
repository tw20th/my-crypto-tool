'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/lib/auth'

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
import PortfolioMessage from '@/components/Portfolio/PortfolioMessage'

export type FilterType = 'all' | '30days' | '7days'

type Props = {
  coins: Coin[]
}

export default function PortfolioClient({ coins }: Props) {
  const { user } = useUser()
  const router = useRouter()

  // ✅ Hooksはすべて最初に呼び出す！
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

  // ✅ ログイン状態の確認とリダイレクト
  useEffect(() => {
    // undefined のときは何もしない（判定中）
    if (user === undefined) return

    // null（未ログイン）だったら login へ遷移
    if (user === null) {
      router.push('/login')
    }
  }, [user, router])

  if (!user) {
    return (
      <div className="text-center py-12 text-gray-500">
        ログイン状態を確認中...
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* アラート発動 */}
      {visibleAlerts.length > 0 && (
        <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 px-4 py-2 rounded-md text-sm">
          📢 アラート発動中！{visibleAlerts.length} 件のアラートがあります
        </div>
      )}

      {/* アラートリスト */}
      <AlertList
        alerts={visibleAlerts}
        onClose={onClose}
        onCloseAll={onCloseAll}
      />

      {/* 今日のひとこと（追加予定） */}
      <PortfolioMessage />

      {/* フィルター（資産推移用） */}
      <PortfolioChartFilter filter={filter} setFilter={setFilter} />

      {/* 総資産・推移グラフ */}
      <PortfolioSummary totalValue={totalValue} historyData={historyData} />

      {/* 資産構成（円グラフ） */}
      <PortfolioPieChart coins={coins} portfolio={portfolio} />

      {/* アラート登録フォーム */}
      <AlertForm coinOptions={coins.map((c) => c.id)} />

      {/* コピー貼り付けフォーム */}
      <PortfolioPasteForm onSubmit={handlePasteSubmit} />

      {/* 保有通貨リスト */}
      <PortfolioCoinList
        coins={coins}
        portfolio={portfolio}
        onAmountChange={handleAmountChange}
      />
    </div>
  )
}
