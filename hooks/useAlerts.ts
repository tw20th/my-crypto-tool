import { useCallback, useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import { useUser } from '@/lib/auth'
import { Coin } from '@/types/coin'
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore'
import { Alert } from '@/types/alert'

export const useAlerts = (coins: Coin[]) => {
  const { user } = useUser()
  const [matchedAlerts, setMatchedAlerts] = useState<Alert[]>([])

  const sendAlertEmail = async (email: string, message: string) => {
    await fetch('/api/send-alert', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: email,
        subject: '🔔 アラート通知',
        text: message,
      }),
    })
  }

  const checkAlerts = useCallback(async () => {
    if (!user) return

    const snapshot = await getDocs(collection(db, 'users', user.uid, 'alerts'))
    const alerts: Alert[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Alert, 'id'>),
    }))

    const matched: Alert[] = []

    // ✅ 条件チェックと更新を分けて実行！
    for (const alert of alerts) {
      const coin = coins.find((c) => c.id === alert.coinId)
      if (!coin) continue

      const isMatch =
        (alert.condition === 'over' && coin.current_price > alert.price) ||
        (alert.condition === 'under' && coin.current_price < alert.price)

      if (isMatch && user.email && !alert.notified) {
        const message = `${alert.coinId} が ${
          alert.condition === 'over' ? '上回った' : '下回った'
        } ${alert.price} USD`

        await sendAlertEmail(user.email, message)

        // ✅ Firestoreを更新して「通知済み」に
        await updateDoc(doc(db, 'users', user.uid, 'alerts', alert.id), {
          notified: true,
        })

        matched.push(alert)
      } else if (isMatch) {
        matched.push(alert) // 通知済みでもアラート表示には追加
      }
    }

    setMatchedAlerts(matched)
  }, [user, coins])

  useEffect(() => {
    checkAlerts()
    const interval = setInterval(checkAlerts, 30000)
    return () => clearInterval(interval)
  }, [checkAlerts])

  return { matchedAlerts }
}
