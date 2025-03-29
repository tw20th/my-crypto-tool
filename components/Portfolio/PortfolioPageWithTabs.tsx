'use client'

import { useState } from 'react'
import clsx from 'clsx'
import { Coin } from '@/types/coin'
import { usePortfolio } from '@/hooks/usePortfolio'
import { useAlerts } from '@/hooks/useAlerts'
import { useVisibleAlerts } from '@/hooks/useVisibleAlerts'

import PortfolioCoinList from '@/components/Portfolio/PortfolioCoinList'
import PortfolioPieChart from '@/components/Portfolio/PortfolioPieChart'
import PortfolioPasteForm from '@/components/Portfolio/PortfolioPasteForm'
import AlertForm from '@/components/Portfolio/AlertForm'
import AlertList from '@/components/Portfolio/AlertList'

type Props = {
  coins: Coin[]
}

export default function PortfolioPageWithTabs({ coins }: Props) {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'alerts'>(
    'portfolio'
  )

  const { portfolio, handleAmountChange, handlePasteSubmit } =
    usePortfolio(coins)
  const { matchedAlerts } = useAlerts(coins)
  const { visibleAlerts, onClose, onCloseAll } = useVisibleAlerts(matchedAlerts)

  return (
    <div className="space-y-6">
      {/* タブ切り替え */}
      <div className="flex flex-wrap sm:flex-nowrap gap-4 border-b">
        <button
          onClick={() => setActiveTab('portfolio')}
          className={clsx(
            'px-3 py-2 text-sm font-medium',
            activeTab === 'portfolio'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-600'
          )}
        >
          ポートフォリオ
        </button>
        <button
          onClick={() => setActiveTab('alerts')}
          className={clsx(
            'px-3 py-2 text-sm font-medium',
            activeTab === 'alerts'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-600'
          )}
        >
          アラート
        </button>
      </div>

      {/* 補足テキスト */}
      <p className="text-sm text-gray-500">
        保有資産の入力やアラートの管理をこのページで行えます。
      </p>

      {/* タブ内容 */}
      {activeTab === 'portfolio' && (
        <>
          <PortfolioPieChart coins={coins} portfolio={portfolio} />
          <PortfolioPasteForm onSubmit={handlePasteSubmit} />
          <PortfolioCoinList
            coins={coins}
            portfolio={portfolio}
            onAmountChange={handleAmountChange}
          />
        </>
      )}

      {activeTab === 'alerts' && (
        <>
          <AlertForm coinOptions={coins.map((c) => c.id)} />
          <AlertList
            alerts={visibleAlerts}
            onClose={onClose}
            onCloseAll={onCloseAll}
          />
        </>
      )}
    </div>
  )
}
