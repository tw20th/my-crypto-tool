'use client'

import { Alert } from '@/types/alert'

type Props = {
  alerts: Alert[]
  onClose: (id: string) => void
  onCloseAll: () => void
}

export default function AlertList({ alerts, onClose, onCloseAll }: Props) {
  if (alerts.length === 0) return null

  return (
    <div className="bg-yellow-100 p-4 rounded border text-yellow-800">
      <div className="flex items-center justify-between">
        <p className="font-bold">📢 アラート発動！</p>
        {alerts.length > 1 && (
          <button
            onClick={onCloseAll}
            className="text-sm text-blue-600 underline"
          >
            すべて閉じる
          </button>
        )}
      </div>
      <ul className="list-disc pl-5 space-y-1 mt-2">
        {alerts.map((alert) => (
          <li key={alert.id} className="flex justify-between items-start">
            <span>
              {alert.coinId} が{' '}
              {alert.condition === 'over' ? '上回った' : '下回った'}{' '}
              {alert.price.toLocaleString()} USD
            </span>
            <button
              onClick={() => onClose(alert.id)}
              className="ml-4 text-sm text-gray-500 hover:underline"
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
