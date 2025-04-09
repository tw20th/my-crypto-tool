'use client'

import { useState } from 'react'

type GlossaryEntry = {
  term: string
  description: string
}

export default function GlossaryEditorPage() {
  const [entries, setEntries] = useState<GlossaryEntry[]>([
    {
      term: 'ビットコイン',
      description:
        '最も有名な仮想通貨で、ブロックチェーン技術を使って取引されます。',
    },
    {
      term: 'ブロックチェーン',
      description:
        '取引データを分散管理する技術で、改ざんが難しいのが特徴です。',
    },
  ])

  const handleChange = (
    index: number,
    field: keyof GlossaryEntry,
    value: string
  ) => {
    const updated = [...entries]
    updated[index][field] = value
    setEntries(updated)
  }

  const addEntry = () => {
    setEntries([...entries, { term: '', description: '' }])
  }

  const removeEntry = (index: number) => {
    const updated = entries.filter((_, i) => i !== index)
    setEntries(updated)
  }

  const saveEntries = () => {
    const json = JSON.stringify(entries, null, 2)
    console.log('保存されるJSON:', json)
    alert('まだローカルでの保存のみです。将来はAPI接続できます！')
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">📘 用語辞典 編集</h1>

      {entries.map((entry, index) => (
        <div
          key={index}
          className="border rounded p-4 mb-4 space-y-2 bg-white shadow"
        >
          <div>
            <label className="block font-semibold text-sm">用語</label>
            <input
              type="text"
              value={entry.term}
              onChange={(e) => handleChange(index, 'term', e.target.value)}
              className="w-full border rounded px-3 py-1"
              placeholder="例: ビットコイン"
            />
          </div>

          <div>
            <label className="block font-semibold text-sm">説明</label>
            <textarea
              value={entry.description}
              onChange={(e) =>
                handleChange(index, 'description', e.target.value)
              }
              className="w-full border rounded px-3 py-1"
              rows={3}
              placeholder="例: 最も有名な仮想通貨で、ブロックチェーン技術を使って取引されます。"
            />
          </div>

          <button
            onClick={() => removeEntry(index)}
            className="text-sm text-red-500 hover:underline"
          >
            削除
          </button>
        </div>
      ))}

      <div className="flex gap-4">
        <button
          onClick={addEntry}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          ➕ 項目を追加
        </button>

        <button
          onClick={saveEntries}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          💾 保存（ダミー）
        </button>
      </div>
    </div>
  )
}
