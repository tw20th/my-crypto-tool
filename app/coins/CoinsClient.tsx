'use client'

import { useEffect, useState } from 'react'
import { Coin } from '@/types/coin'
import CoinCard from '@/components/CoinCard'
import {
  addToWatchlist,
  removeFromWatchlist,
  getWatchlist,
} from '@/lib/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/lib/firebase'

export default function CoinsClient({ coins }: { coins: Coin[] }) {
  const [userId, setUserId] = useState<string | null>(null)
  const [watchList, setWatchList] = useState<string[]>([])

  // ログインユーザーの監視 & ウォッチリスト取得
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid)
        const list = await getWatchlist(user.uid)
        setWatchList(list)
      } else {
        setUserId(null)
        setWatchList([])
      }
    })

    return () => unsubscribe()
  }, [])

  // ボタン押下でFireStoreへ保存／削除
  const toggleWatch = async (coinId: string) => {
    if (!userId) {
      alert('ログインしてください')
      return
    }

    if (watchList.includes(coinId)) {
      await removeFromWatchlist(userId, coinId)
      setWatchList((prev) => prev.filter((id) => id !== coinId))
    } else {
      await addToWatchlist(userId, coinId)
      setWatchList((prev) => [...prev, coinId])
    }
  }

  const watchedCoins = coins.filter((coin) => watchList.includes(coin.id))
  const otherCoins = coins.filter((coin) => !watchList.includes(coin.id))

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">ウォッチリスト</h1>
      {watchedCoins.map((coin) => (
        <CoinCard
          key={coin.id}
          coin={coin}
          isWatched={true}
          onToggleWatch={toggleWatch}
        />
      ))}

      <h2 className="text-2xl font-bold mt-8">全ての通貨</h2>
      {otherCoins.map((coin) => (
        <CoinCard
          key={coin.id}
          coin={coin}
          isWatched={false}
          onToggleWatch={toggleWatch}
        />
      ))}
    </div>
  )
}
