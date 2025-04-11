'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useUser } from '@/lib/UserContext'

export default function Navbar() {
  const [isDark, setIsDark] = useState(false)
  const { user, loading } = useUser()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  // ✅ ログイン状態が不明なうちは何も表示しない
  if (loading) return null

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 shadow">
      <div className="flex gap-6">
        <Link href="/">ホーム</Link>
        <Link href="/news">ニュース</Link>
        <Link href="/blog">ブログ</Link>
        <Link href="/coins">コイン情報</Link>
      </div>

      <div className="flex items-center gap-3">
        {user && user.email ? (
          <span className="text-sm text-gray-700 dark:text-gray-300">
            👤 {user.displayName ?? 'ログイン中'}
          </span>
        ) : (
          <Link
            href="/login"
            className="text-sm text-blue-600 dark:text-blue-300 underline"
          >
            ログイン
          </Link>
        )}

        <button
          onClick={() => setIsDark((prev) => !prev)}
          className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-600 text-sm"
        >
          {isDark ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  )
}
