'use client'

import { useState } from 'react'
import { Alert } from '@/types/alert'
import { db } from '@/lib/firebase'
import { useUser } from '@/lib/auth'
import { doc, deleteDoc, updateDoc } from 'firebase/firestore'
import Card from '@/components/ui/Card' // ✅ 追加
import Input from '@/components/ui/Input'

type Props = {
  alert: Alert
  onDeleted?: (id: string) => void
}

export default function AlertItem({ alert, onDeleted }: Props) {
  const { user } = useUser()
  const [isEditing, setIsEditing] = useState(false)
  const [price, setPrice] = useState(alert.price)

  const handleDelete = async () => {
    if (!user) return
    await deleteDoc(doc(db, 'users', user.uid, 'alerts', alert.id))
    onDeleted?.(alert.id)
  }

  const handleUpdate = async () => {
    if (!user) return
    await updateDoc(doc(db, 'users', user.uid, 'alerts', alert.id), {
      price,
    })
    setIsEditing(false)
  }

  return (
    <Card variant="outlined" padding="sm">
      {isEditing ? (
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
          <Input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
          <div className="flex space-x-2">
            <button
              onClick={handleUpdate}
              className="text-blue-600 text-sm hover:underline"
            >
              保存
            </button>
            <button
              onClick={() => {
                setIsEditing(false)
                setPrice(alert.price)
              }}
              className="text-gray-500 text-sm hover:underline"
            >
              キャンセル
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <span className="mb-2 sm:mb-0">
            {alert.coinId} が{' '}
            {alert.condition === 'over' ? '上回った' : '下回った'}{' '}
            {alert.price.toLocaleString()} USD
          </span>
          <div className="flex space-x-2">
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-500 text-sm hover:underline"
            >
              編集
            </button>
            <button
              onClick={handleDelete}
              className="text-red-500 text-sm hover:underline"
            >
              削除
            </button>
          </div>
        </div>
      )}
    </Card>
  )
}
