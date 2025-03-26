'use client'

import { useState } from 'react'

type Props = {
  onSubmit: (items: { coinId: string; amount: number }[]) => void
}

export default function PortfolioPasteForm({ onSubmit }: Props) {
  const [text, setText] = useState('')

  const handleSubmit = () => {
    const lines = text
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line !== '')

    const items = lines.map((line) => {
      const [coinId, amountStr] = line.split(',').map((s) => s.trim())
      return { coinId, amount: parseFloat(amountStr) }
    })

    onSubmit(items)
    setText('')
  }

  return (
    <div className="space-y-2 p-4 border rounded-lg">
      <h2 className="font-bold text-lg">一括入力（コピペ対応）</h2>
      <textarea
        className="w-full h-32 border rounded p-2"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="例: bitcoin, 1\nethereum, 105"
      />
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        保有資産を更新
      </button>
    </div>
  )
}
