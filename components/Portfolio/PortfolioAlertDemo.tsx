'use client'

import { useState } from 'react'

const demoCoinOptions = [
  { id: 'bitcoin', name: 'Bitcoin' },
  { id: 'ethereum', name: 'Ethereum' },
  { id: 'xrp', name: 'XRP' },
]

type Alert = {
  coinId: string
  condition: 'above' | 'below'
  price: number
}

export default function PortfolioAlertDemo() {
  const [selectedCoin, setSelectedCoin] = useState('')
  const [condition, setCondition] = useState<'above' | 'below'>('above')
  const [price, setPrice] = useState('')
  const [alerts, setAlerts] = useState<Alert[]>([])

  const handleAddAlert = () => {
    if (!selectedCoin || !price) return
    const newAlert: Alert = {
      coinId: selectedCoin,
      condition,
      price: parseFloat(price),
    }
    setAlerts((prev) => [...prev, newAlert])
    setSelectedCoin('')
    setCondition('above')
    setPrice('')
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">🔔 アラートを体験してみる</h2>

      {/* 入力フォーム */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
        <select
          value={selectedCoin}
          onChange={(e) => setSelectedCoin(e.target.value)}
          className="border rounded px-3 py-1 text-sm"
        >
          <option value="">通貨を選択</option>
          {demoCoinOptions.map((coin) => (
            <option key={coin.id} value={coin.id}>
              {coin.name}
            </option>
          ))}
        </select>

        <select
          value={condition}
          onChange={(e) => setCondition(e.target.value as 'above' | 'below')}
          className="border rounded px-3 py-1 text-sm"
        >
          <option value="above">上回ったら通知</option>
          <option value="below">下回ったら通知</option>
        </select>

        <input
          type="number"
          placeholder="価格 (USD)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border rounded px-3 py-1 text-sm w-40"
        />

        <button
          onClick={handleAddAlert}
          className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
        >
          アラート追加
        </button>
      </div>

      {/* 登録済みっぽい表示 */}
      <div className="space-y-1">
        {alerts.length > 0 ? (
          alerts.map((alert, i) => (
            <p key={i} className="text-sm text-gray-700">
              {demoCoinOptions.find((c) => c.id === alert.coinId)?.name} が{' '}
              {alert.condition === 'above' ? '上回ったら' : '下回ったら'}{' '}
              {alert.price.toLocaleString()} USD
            </p>
          ))
        ) : (
          <p className="text-sm text-gray-400">※ アラートはまだありません</p>
        )}
      </div>

      <p className="text-xs text-gray-400 mt-2">
        ※ この体験版ではアラートは保存されません
      </p>
    </div>
  )
}
