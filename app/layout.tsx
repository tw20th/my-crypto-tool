// ❌ remove this if present
// 'use client'

// layout.tsx
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import ThemeWrapper from '@/components/ThemeWrapper'
import { Toaster } from 'react-hot-toast'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'My Crypto Tool',
  description: 'ポートフォリオ管理とアラート通知ができるアプリ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900 dark:bg-gray-100`}
      >
        <ThemeWrapper>
          <Toaster position="top-right" />
          {children}
        </ThemeWrapper>
      </body>
    </html>
  )
}
