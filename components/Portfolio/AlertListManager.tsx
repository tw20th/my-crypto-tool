'use client'

import { useUserAlerts } from '@/hooks/useUserAlerts'

export default function AlertListManager() {
  const { alerts, deleteAlert } = useUserAlerts()

  if (alerts.length === 0) {
    return (
      <p className="text-sm text-gray-500">登録されたアラートはありません。</p>
    )
  }

  return (
    <div className="space-y-2">
      <h2 className="font-bold text-lg">📋 登録済みアラート一覧</h2>
      <ul className="space-y-1">
        {alerts.map((alert) => (
          <li
            key={alert.id}
            className="flex justify-between items-center border p-2 rounded"
          >
            <span>
              {alert.coinId} が{' '}
              {alert.condition === 'over' ? '上回った' : '下回った'}{' '}
              {alert.price.toLocaleString()} USD
            </span>
            <button
              onClick={() => deleteAlert(alert.id)}
              className="text-sm text-red-500 hover:underline"
            >
              削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
