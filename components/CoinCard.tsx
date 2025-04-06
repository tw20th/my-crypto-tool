'use client'

import Image from 'next/image'
import { Coin } from '@/types/coin'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect } from 'react'
import Card from '@/components/ui/Card'

type Props = {
  coin: Coin
  isWatched: boolean
  onToggleWatch: (id: string) => void
}

function AnimatedNumber({ value }: { value: number }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) =>
    Math.floor(latest).toLocaleString()
  )

  useEffect(() => {
    const controls = animate(count, value, { duration: 0.6 })
    return controls.stop
  }, [value, count]) // 'count' を依存リストに追加

  return <motion.span>{rounded}</motion.span>
}

export default function CoinCard({ coin, isWatched, onToggleWatch }: Props) {
  return (
    <Card variant="outlined" padding="lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src={coin.image}
            alt={coin.name}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <h2 className="text-lg font-semibold">
              {coin.name} ({coin.symbol.toUpperCase()})
            </h2>
            <p>
              価格: $<AnimatedNumber value={coin.current_price} />
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              時価総額: ${coin.market_cap.toLocaleString()}{' '}
              {/* market_cap の表示 */}
            </p>
          </div>
        </div>

        <button
          onClick={() => onToggleWatch(coin.id)}
          className={`text-sm px-3 py-1 rounded transition ${
            isWatched
              ? 'bg-yellow-400 text-white hover:bg-yellow-500'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          {isWatched ? 'ウォッチ中' : 'ウォッチ'}
        </button>
      </div>
    </Card>
  )
}
