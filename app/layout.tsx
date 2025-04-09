// ❌ remove this if present
// 'use client'

// layout.tsx
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import ThemeWrapper from '@/components/ThemeWrapper'
import { Toaster } from 'react-hot-toast'
import Script from 'next/script'
import TooltipProvider from '@/components/TooltipProvider' // 追加

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
  title: 'My Crypto Tool | 仮想通貨のポートフォリオ管理＆アラート',
  description:
    '仮想通貨の価格をチェックしながら資産を管理できるアプリです。Googleログインで簡単に使えます。',
  openGraph: {
    title: 'My Crypto Tool',
    description:
      'ポートフォリオとアラート通知を1つに。仮想通貨資産をスマートに管理！',
    url: 'https://your-domain.com',
    images: [
      {
        url: 'https://your-domain.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'My Crypto ToolのOGP画像',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My Crypto Tool',
    description: '仮想通貨をスマートに管理しよう！',
    images: ['https://your-domain.com/og-image.png'],
  },
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
          <TooltipProvider /> {/* 👈 グローバルに一度だけ表示 */}
          {/* Google Analytics を body 内に明示的に挿入 */}
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
        </ThemeWrapper>
      </body>
    </html>
  )
}
