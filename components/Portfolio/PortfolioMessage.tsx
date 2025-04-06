'use client'
import { useEffect, useState } from 'react'

const messages = [
  '今日は相場が落ち着いています。焦らずいきましょう。',
  '急騰している通貨もあります。情報収集を忘れずに。',
  '投資は長期目線で！焦らず積み立てを。',
  'ちょっと下がっても大丈夫。コツコツが大事です。',
]

function getTodayMessage() {
  const today = new Date().getDate()
  return messages[today % messages.length]
}

export default function PortfolioMessage() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    setMessage(getTodayMessage())
  }, [])

  return (
    <div className="bg-blue-50 text-blue-800 px-4 py-3 rounded-md shadow text-sm">
      📘 {message}
    </div>
  )
}
