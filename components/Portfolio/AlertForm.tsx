'use client'

import { useEffect, useState } from 'react'
import { collection, onSnapshot, doc, setDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useUser } from '@/lib/auth'
import { Alert } from '@/types/alert'
import AlertItem from './AlertItem' // ✅ 必要です

type Props = {
  coinOptions: string[]
}

export default function AlertForm({ coinOptions }: Props) {
  const { user } = useUser()
  const [coinId, setCoinId] = useState('')
  const [condition, setCondition] = useState<'over' | 'under'>('over')
  const [price, setPrice] = useState('')
  const [alerts, setAlerts] = useState<Alert[]>([]) // ✅ 一覧用

  // ✅ Firestore からリアルタイムで取得
  useEffect(() => {
    if (!user) return
    const ref = collection(db, 'users', user.uid, 'alerts')
    const unsubscribe = onSnapshot(ref, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Alert[]
      setAlerts(data)
    })

    return () => unsubscribe()
  }, [user])

  const handleSubmit = async () => {
    if (!user || !coinId || !price) return

    const id = crypto.randomUUID()
    const ref = doc(db, 'users', user.uid, 'alerts', id)

    await setDoc(ref, {
      coinId,
      condition,
      price: Number(price),
    })

    setCoinId('')
    setPrice('')
  }

  return (
    <div className="p-4 border rounded-lg space-y-4 bg-white">
      <h2 className="font-bold">🔔 アラートの追加</h2>

      {/* 入力フォーム */}
      <select
        value={coinId}
        onChange={(e) => setCoinId(e.target.value)}
        className="border px-2 py-1 rounded w-full"
      >
        <option value="">-- 通貨を選択 --</option>
        {coinOptions.map((coin) => (
          <option key={coin} value={coin}>
            {coin}
          </option>
        ))}
      </select>

      <select
        value={condition}
        onChange={(e) => setCondition(e.target.value as 'over' | 'under')}
        className="border px-2 py-1 rounded w-full"
      >
        <option value="over">上回ったら通知</option>
        <option value="under">下回ったら通知</option>
      </select>

      <input
        type="number"
        placeholder="通知する価格（USD）"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="border px-2 py-1 rounded w-full"
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
      >
        アラートを追加
      </button>

      {/* ✅ 登録済みアラート一覧 */}
      {alerts.length > 0 && (
        <div className="space-y-2 mt-6">
          <h3 className="font-bold mb-1">📋 登録済みアラート一覧</h3>
          {alerts.map((alert) => (
            <AlertItem
              key={alert.id}
              alert={alert}
              onDeleted={(id) =>
                setAlerts((prev) => prev.filter((a) => a.id !== id))
              }
            />
          ))}
        </div>
      )}
    </div>
  )
}
