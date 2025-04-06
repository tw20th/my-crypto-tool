// lib/api/news.ts

import { adminDb } from '@/lib/firebaseAdmin'

export type NewsArticle = {
  title: string
  url: string
  publishedAt: string
  source: string
  summary?: string
}

type CryptoPanicItem = {
  title: string
  url: string
  published_at: string
  source: { title: string }
}

export async function getSavedNews(): Promise<NewsArticle[]> {
  const snapshot = await adminDb
    .collection('news')
    .orderBy('publishedAt', 'desc')
    .limit(30)
    .get()

  return snapshot.docs.map((doc) => doc.data() as NewsArticle)
}

export async function fetchCryptoNews(): Promise<NewsArticle[]> {
  const res = await fetch(
    `https://cryptopanic.com/api/v1/posts/?auth_token=${process.env.CRYPTO_PANIC_API_KEY}&public=true&per_page=10`
  )

  if (!res.ok) {
    throw new Error('ニュースの取得に失敗しました')
  }

  const data = await res.json()

  return data.results.map(
    (item: CryptoPanicItem): NewsArticle => ({
      title: item.title,
      url: item.url,
      publishedAt: item.published_at,
      source: item.source.title,
    })
  )
}
