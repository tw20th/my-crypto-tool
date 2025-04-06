import { useEffect, useState } from 'react'
import { Coin } from '@/types/coin'
import { PortfolioItem, savePortfolioHistory } from '@/lib/portfolio'
import { useUser } from '@/lib/auth'
import { db } from '@/lib/firebase'
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  deleteDoc,
  Timestamp,
} from 'firebase/firestore'
import { getFilteredPortfolioHistory } from '@/lib/getFilteredPortfolioHistory'
import { FilterType } from '@/components/Portfolio/PortfolioClient'

type PortfolioHistory = {
  id: string
  createdAt: Timestamp
  totalValue: number
}

export const usePortfolio = (coins: Coin[]) => {
  const { user } = useUser()
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([])
  const [filter, setFilter] = useState<FilterType>('all')
  const [historyData, setHistoryData] = useState<PortfolioHistory[]>([])

  // 合計評価額の算出
  const totalValue = portfolio.reduce((acc, item) => {
    const coin = coins.find((c) => c.id === item.coinId)
    return coin ? acc + coin.current_price * item.amount : acc
  }, 0)

  // 保有数変更時の処理
  const handleAmountChange = async (coinId: string, rawValue: string) => {
    if (!user) return

    const ref = doc(db, 'users', user.uid, 'portfolio', coinId)
    const newAmount = parseFloat(rawValue)

    if (isNaN(newAmount) || newAmount <= 0) {
      await deleteDoc(ref)
    } else {
      await setDoc(ref, {
        amount: newAmount,
        createdAt: Timestamp.now(),
      })
    }
  }

  // コピペ一括更新用
  const handlePasteSubmit = async (
    items: { coinId: string; amount: number }[]
  ) => {
    if (!user) return

    const batch = items.map(async ({ coinId, amount }) => {
      const ref = doc(db, 'users', user.uid, 'portfolio', coinId)

      if (isNaN(amount) || amount <= 0) {
        return deleteDoc(ref)
      } else {
        return setDoc(ref, {
          amount,
          createdAt: Timestamp.now(),
        })
      }
    })

    await Promise.all(batch)
  }

  // 履歴データの取得
  useEffect(() => {
    if (!user) return
    getFilteredPortfolioHistory(filter, user.uid).then(setHistoryData)
  }, [filter, user])

  // ポートフォリオのリアルタイム取得 & 履歴保存
  useEffect(() => {
    if (!user) return

    const unsubscribe = onSnapshot(
      collection(db, 'users', user.uid, 'portfolio'),
      async (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          coinId: doc.id,
          amount: doc.data().amount,
        }))

        setPortfolio(data)

        const total = data.reduce((acc, item) => {
          const coin = coins.find((c) => c.id === item.coinId)
          return acc + (coin?.current_price || 0) * item.amount
        }, 0)

        if (data.length > 0) {
          await savePortfolioHistory(user.uid, data, total)
        }
      }
    )

    return () => unsubscribe()
  }, [user, coins])

  return {
    portfolio,
    totalValue,
    filter,
    setFilter,
    historyData,
    handleAmountChange,
    handlePasteSubmit,
  }
}
