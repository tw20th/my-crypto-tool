// lib/portfolio.ts
import { db } from './firebase'
import {
  doc,
  collection,
  setDoc,
  getDocs,
  query,
  orderBy,
  Timestamp,
} from 'firebase/firestore'

export type PortfolioItem = {
  coinId: string
  amount: number
  createdAt?: Date // ← ここを optional にすることでエラー回避
}

// ユーザーのポートフォリオ一覧を取得
export const getPortfolio = async (uid: string): Promise<PortfolioItem[]> => {
  const colRef = collection(db, 'users', uid, 'portfolio')
  const q = query(colRef, orderBy('createdAt', 'desc'))
  const snapshot = await getDocs(q)

  return snapshot.docs.map((doc) => ({
    coinId: doc.id,
    ...doc.data(),
  })) as PortfolioItem[]
}

// 通貨を追加 or 上書き
export const savePortfolioItem = async (
  uid: string,
  coinId: string,
  amount: number
) => {
  const ref = doc(db, 'users', uid, 'portfolio', coinId)
  await setDoc(ref, {
    amount,
    createdAt: Timestamp.now(),
  })
}

export const savePortfolioHistory = async (
  uid: string,
  portfolio: PortfolioItem[],
  totalValue: number
) => {
  const date = new Date().toISOString().split('T')[0] // "2025-03-27"
  const ref = doc(db, 'users', uid, 'portfolioHistory', date)

  await setDoc(ref, {
    date,
    createdAt: Timestamp.now(), // ✅ ← これを追加！
    totalValue,
    breakdown: portfolio.map((item) => ({
      coinId: item.coinId,
      amount: item.amount,
    })),
  })
}
