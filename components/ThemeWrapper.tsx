'use client'

import { useEffect, useState } from 'react'

export default function ThemeWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  return (
    <div className="p-4">
      <button
        onClick={() => setIsDark((prev) => !prev)}
        className="mb-4 px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-sm"
      >
        {isDark ? '☀️ ライトモード' : '🌙 ダークモード'}
      </button>
      {children}
    </div>
  )
}
