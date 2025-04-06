'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { collection, onSnapshot, doc, setDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useUser } from '@/lib/auth'
import { Alert } from '@/types/alert'
import AlertItem from './AlertItem'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import { toast } from 'react-hot-toast'

type Props = {
  coinOptions: string[]
}

// ✅ スキーマを zod で定義
const schema = z.object({
  coinId: z.string().min(1, '通貨を選択してください'),
  condition: z.enum(['over', 'under']),
  price: z
    .number({ invalid_type_error: '価格は数値で入力してください' })
    .positive('価格は1以上を入力してください'),
})

type FormData = z.infer<typeof schema>

export default function AlertForm({ coinOptions }: Props) {
  const { user } = useUser()
  const [alerts, setAlerts] = useState<Alert[]>([])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      coinId: '',
      condition: 'over',
      price: 0,
    },
  })

  // Firestore の監視
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

  // 送信処理
  const onSubmit = async (data: FormData) => {
    if (!user) return
    const id = crypto.randomUUID()
    const ref = doc(db, 'users', user.uid, 'alerts', id)

    await setDoc(ref, {
      ...data,
      notified: false,
    })
    toast.success('✅ アラートを追加しました！', {
      duration: 10000, // ← 10秒に変更
    })

    reset()
  }

  return (
    <Card variant="outlined" padding="lg">
      <h2 className="font-bold mb-2">🔔 アラートの追加</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        {/* 通貨 */}
        <div>
          <Select {...register('coinId')}>
            <option value="">-- 通貨を選択 --</option>
            {coinOptions.map((coin) => (
              <option key={coin} value={coin}>
                {coin}
              </option>
            ))}
          </Select>
          {errors.coinId && (
            <p className="text-sm text-red-500 mt-1">{errors.coinId.message}</p>
          )}
        </div>

        {/* 条件 */}
        <Select {...register('condition')}>
          <option value="over">上回ったら通知</option>
          <option value="under">下回ったら通知</option>
        </Select>

        {/* 価格 */}
        <div>
          <Input
            type="number"
            step="any"
            placeholder="通知する価格（USD）"
            {...register('price', { valueAsNumber: true })}
          />
          {errors.price && (
            <p className="text-sm text-red-500 mt-1">{errors.price.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full">
          アラートを追加
        </Button>
      </form>

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
    </Card>
  )
}
