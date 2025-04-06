// app/admin/blog/page.tsx
'use client'

import { useState } from 'react'

export default function AdminBlogPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [log, setLog] = useState<string | null>(null)

  const handleGenerate = async () => {
    setIsLoading(true)
    setLog(null)
    try {
      const res = await fetch('/api/generate-blog', { method: 'POST' })
      const data = await res.json()
      setLog(data.message ?? '記事が作成されました')
    } catch (error) {
      setLog('❌ 生成に失敗しました')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">📝 ブログ自動生成（管理者）</h1>

      <button
        onClick={handleGenerate}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        disabled={isLoading}
      >
        {isLoading ? '生成中...' : '今週のポートフォリオからブログを生成'}
      </button>

      {log && <p className="text-sm text-gray-600">{log}</p>}
    </main>
  )
}
