// ❌ remove this if present
// 'use client'

// layout.tsx
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import ThemeWrapper from '@/components/ThemeWrapper'
import { Toaster } from 'react-hot-toast'
import Script from 'next/script'

const geistSans = localFont({
  src: '/fonts/GeistVF.woff', // 修正後のパス
  variable: '--font-geist-sans',
  weight: '100 900',
})

const geistMono = localFont({
  src: '/fonts/GeistMonoVF.woff', // 修正後のパス
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
      <head>
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-XN76S896WT"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XN76S896WT');
            `,
          }}
        />
      </head>
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
