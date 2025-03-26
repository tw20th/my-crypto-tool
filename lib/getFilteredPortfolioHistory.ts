// lib/getFilteredPortfolioHistory.ts

import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  Timestamp,
} from 'firebase/firestore'
import { db } from './firebase'
import { endOfToday, subDays } from 'date-fns'

type FilterType = 'all' | '30days' | '7days'

export const getFilteredPortfolioHistory = async (
  filter: FilterType,
  uid: string
) => {
  const ref = collection(db, 'users', uid, 'portfolioHistory')
  let q = query(ref, orderBy('createdAt', 'asc'))

  if (filter !== 'all') {
    const days = filter === '30days' ? 30 : 7
    const fromDate = subDays(endOfToday(), days)
    q = query(ref, where('createdAt', '>=', Timestamp.fromDate(fromDate)))
  }

  const snapshot = await getDocs(q)

  return snapshot.docs.map((doc) => {
    const data = doc.data()
    return {
      id: doc.id,
      createdAt: data.createdAt,
      totalValue: data.totalValue,
    }
  })
}
