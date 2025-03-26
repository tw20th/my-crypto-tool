// components/CoinCard.tsx
'use client'

import Image from 'next/image'
import { Coin } from '@/types/coin'

type Props = {
  coin: Coin
  isWatched: boolean
  onToggleWatch: (id: string) => void
}

export default function CoinCard({ coin, isWatched, onToggleWatch }: Props) {
  return (
    <div className="flex items-center justify-between p-4 border rounded-xl bg-white shadow">
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
          <p>価格: ${coin.current_price.toLocaleString()}</p>
          <p className="text-sm text-gray-500">
            時価総額: ${coin.market_cap.toLocaleString()}
          </p>
        </div>
      </div>
      <button
        onClick={() => onToggleWatch(coin.id)}
        className={`text-sm px-3 py-1 rounded ${
          isWatched ? 'bg-yellow-400 text-white' : 'bg-gray-200 text-gray-700'
        }`}
      >
        {isWatched ? 'ウォッチ中' : 'ウォッチ'}
      </button>
    </div>
  )
}
