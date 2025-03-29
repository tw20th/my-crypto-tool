import { useCallback, useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import { useUser } from '@/lib/auth'
import { Coin } from '@/types/coin'
import { collection, getDocs } from 'firebase/firestore'
import { Alert } from '@/types/alert'

export const useAlerts = (coins: Coin[]) => {
  const { user } = useUser()
  const [matchedAlerts, setMatchedAlerts] = useState<Alert[]>([])

  // ✅ ここに書く！
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

    const matched = alerts.filter((alert) => {
      const coin = coins.find((c) => c.id === alert.coinId)
      if (!coin) return false

      const isMatch =
        (alert.condition === 'over' && coin.current_price > alert.price) ||
        (alert.condition === 'under' && coin.current_price < alert.price)

      // ✅ 条件を満たしたらメールを送信
      if (isMatch && user.email) {
        const message = `${alert.coinId} が ${
          alert.condition === 'over' ? '上回った' : '下回った'
        } ${alert.price} USD`
        sendAlertEmail(user.email, message)
      }

      return isMatch
    })

    setMatchedAlerts(matched)
  }, [user, coins])

  useEffect(() => {
    checkAlerts()
    const interval = setInterval(checkAlerts, 30000)
    return () => clearInterval(interval)
  }, [checkAlerts])

  return { matchedAlerts }
}
