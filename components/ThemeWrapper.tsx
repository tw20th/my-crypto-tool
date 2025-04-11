'use client'

import { useEffect, useState } from 'react'

export default function ThemeWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // <body> に直接 class を付ける（App Router 対応）
    document.body.classList.toggle('dark', isDark)
  }, [isDark])

  return (
    <>
      <button
        onClick={() => setIsDark((prev) => !prev)}
        className="fixed top-4 left-4 px-4 py-2 z-50 rounded bg-gray-200 dark:bg-gray-700 text-sm"
      >
        {isDark ? '☀️ ライトモード' : '🌙 ダークモード'}
      </button>
      {children}
    </>
  )
}
