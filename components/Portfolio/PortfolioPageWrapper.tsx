'use client'

import { useUser } from '@/lib/UserContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import PortfolioClient from './PortfolioClient'
import { Coin } from '@/types/coin'

type Props = {
  coins: Coin[]
}

export default function PortfolioPageWrapper({ coins }: Props) {
  const { user, loading } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login') // ログインしてないならリダイレクト
    }
  }, [user, loading, router])

  if (loading || !user) return null

  return <PortfolioClient coins={coins} />
}
