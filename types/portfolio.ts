// types/portfolio.ts
import { Timestamp } from 'firebase/firestore'

export type PortfolioHistory = {
  id: string
  createdAt: Timestamp
  totalValue: number
}
